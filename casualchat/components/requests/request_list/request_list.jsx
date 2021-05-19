// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

import Request from 'casualchat/constants/request';

import LoadingScreen from 'components/loading_screen';
import SaveButton from 'components/save_button';
import RequestListItem from 'casualchat/components/requests/request_list_item';
import NextIcon from 'components/widgets/icons/fa_next_icon';
import PreviousIcon from 'components/widgets/icons/fa_previous_icon';
import SearchIcon from 'components/widgets/icons/fa_search_icon';
import LocalizedInput from 'components/localized_input/localized_input';

import {t} from 'utils/i18n.jsx';

const REQUEST_PER_PAGE = 50;
const REQUEST_SEARCH_DELAY_MILLISECONDS = 200;

export default class RequestList extends React.PureComponent {
    static propTypes = {

        /**
         * Custom requests on the system.
         */
        //requestIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        requestId: PropTypes.string.isRequired,

        /**
         * Function to scroll list to top.
         */
        scrollToTop: PropTypes.func.isRequired,

        actions: PropTypes.shape({

            /**
             * Get pages of requests.
             */
            getRequests: PropTypes.func.isRequired,

            /**
             * Search requests.
             */
            searchRequests: PropTypes.func.isRequired,
        }).isRequired,

        // isPending
        // isReceived
    }

    constructor(props) {
        super(props);

        this.searchTimeout = null;

        this.state = {
            loading: true,
            page: 0,
            nextLoading: false,
            searchRequests: null,
            missingPages: true,
            requestIds: [],
        };
    }

    componentDidMount() {
        this.props.actions.getRequests(0, REQUEST_PER_PAGE + 1, Request.SORT_BY_NAME, true).then(({data}) => {
            this.setState({loading: false});
            if (data && data.length < REQUEST_PER_PAGE) {
                this.setState({
                    missingPages: false,
                    requestIds: data.map(({id}) => id),
                });
            }
        });
    }

    nextPage = (e) => {
        if (e) {
            e.preventDefault();
        }

        const next = this.state.page + 1;
        this.setState({nextLoading: true});

        this.props.actions.getRequests(next, REQUEST_PER_PAGE, Request.SORT_BY_NAME, true).then(({data}) => {
            this.setState({page: next, nextLoading: false});
            if (data && data.length < REQUEST_PER_PAGE) {
                this.setState({
                    missingPages: false,
                    requestIds: data.map(({id}) => id),
                });
            }

            this.props.scrollToTop();
        });
    }

    previousPage = (e) => {
        if (e) {
            e.preventDefault();
        }

        this.setState({page: this.state.page - 1, nextLoading: false});
        this.props.scrollToTop();
    }

    onSearchChange = (e) => {
        if (!e || !e.target) {
            return;
        }

        const term = e.target.value || '';

        clearTimeout(this.searchTimeout);

        this.searchTimeout = setTimeout(async () => {
            if (term.trim() === '') {
                this.setState({searchRequests: null, page: 0});
                return;
            }

            this.setState({loading: true});

            const response = await this.props.actions.searchRequests(term, {}, true);

            const {data} = response;
            if (data) {
                this.setState({searchRequests: data.map((em) => em.id), loading: false});
            } else {
                this.setState({searchRequests: [], loading: false});
            }
        }, REQUEST_SEARCH_DELAY_MILLISECONDS);
    }

    onDeleteRequest = (requestId) => {
        this.deleteFromSearch(requestId);
        this.deleteFromIds(requestId);
    }

    deleteFromSearch = (requestId) => {
        if (!this.state.searchReuqests) {
            return;
        }

        this.setState({searchRquests: this.state.searchRequests.filter((id) => id !== requestId)});
    }

    deleteFromIds =(requestId) => {
        if (!this.state.requestIds) {
            return;
        }

        this.setState({requestIds: this.state.requestIds.filter((id) => id !== requestId)});
    }

    render() {
        const searchRequests = this.state.searchRequests;
        const requests = [];
        let nextButton;
        let previousButton;

        if (this.state.loading) {
            requests.push(
                <tr
                    key='loading'
                    className='backstage-list__item backstage-list__empty'
                >
                    <td colSpan='4'>
                        <LoadingScreen key='loading'/>
                    </td>
                </tr>,
            );
        } else if (this.state.requestIds.length === 0 || (searchRequests && searchRequests.length === 0)) {
            requests.push(
                <tr
                    key='empty'
                    className='backstage-list__item backstage-list__empty'
                >
                    <td colSpan='4'>
                        <FormattedMessage
                            id='request_list.empty'
                            defaultMessage='No requests found'
                        />
                    </td>
                </tr>,
            );
        } else if (searchRequests) {
            searchRequests.forEach((requestId) => {
                requests.push(
                    <RequestListItem
                        key={'request_search_item' + requestId}
                        requestId={requestId}
                        onDelete={this.onDeleteRequest}
                    />,
                );
            });
        } else {
            const pageStart = this.state.page * FRIEND_PER_PAGE;
            const pageEnd = pageStart + FRIEND_PER_PAGE;
            const requestsToDisplay = this.state.requestIds.slice(pageStart, pageEnd);

            requestsToDisplay.forEach((requestId) => {
                requests.push(
                    <RequestListItem
                        key={'request_list_item' + requestId}
                        requestId={requestId}
                        onDelete={this.onDeleteRequest}
                    />,
                );
            });

            if (this.state.missingPages) {
                const buttonContents = (
                    <span>
                        <FormattedMessage
                            id='filtered_user_list.next'
                            defaultMessage='Next'
                        />
                        <NextIcon additionalClassName='ml-2'/>
                    </span>
                );

                nextButton = (
                    <SaveButton
                        btnClass='btn-link'
                        extraClasses='pull-right'
                        onClick={this.nextPage}
                        saving={this.state.nextLoading}
                        disabled={this.state.nextLoading}
                        defaultMessage={buttonContents}
                        savingMessage={buttonContents}
                    />
                );
            }

            if (this.state.page > 0) {
                previousButton = (
                    <button
                        className='btn btn-link'
                        onClick={this.previousPage}
                    >
                        <PreviousIcon additionalClassName='mr-2'/>
                        <FormattedMessage
                            id='filtered_user_list.prev'
                            defaultMessage='Previous'
                        />
                    </button>
                );
            }
        }

        return (
            <div>
                <div className='backstage-filters'>
                    <div className='backstage-filter__search'>
                        <SearchIcon/>
                        <LocalizedInput
                            type='search'
                            className='form-control'
                            placeholder={{id: t('request_list.search'), defaultMessage: 'Search Request'}}
                            onChange={this.onSearchChange}
                            style={style.search}
                        />
                    </div>
                </div>
                {/* <span className='backstage-list__help'>
                    <p>
                        <FormattedMessage
                            id='request_list.help'
                            defaultMessage="Requests List are available to everyone on your server. Type ':' followed by two characters in a message box to bring up the request selection menu."
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id='request_list.help2'
                            defaultMessage="Tip: If you add #, ##, or ### as the first character on a new line containing request, you can use larger sized request. To try it out, send a message such as: '# :smile:'."
                        />
                    </p>
                </span> */}
                <div className='backstage-list'>
                    <table className='request-list__table'>
                        <thead>
                            <tr className='backstage-list__item request-list__table-header'>
                                <th className='request-list__name'>
                                    <FormattedMessage
                                        id='request_list.name'
                                        defaultMessage='Name'
                                    />
                                </th>
                                <th className='request-list__image'>
                                    <FormattedMessage
                                        id='request_list.image'
                                        defaultMessage='Image'
                                    />
                                </th>
                                {/* <th className='request-list__creator'>
                                    <FormattedMessage
                                        id='request_list.creator'
                                        defaultMessage='Creator'
                                    />
                                </th> */}
                                <th className='request-list_actions'>
                                    <FormattedMessage
                                        id='request_list.actions'
                                        defaultMessage='Actions'
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests}
                        </tbody>
                    </table>
                </div>
                <div className='filter-controls pt-3'>
                    {previousButton}
                    {nextButton}
                </div>
            </div>
        );
    }
}

const style = {
    search: {flexGrow: 0, flexShrink: 0},
};
