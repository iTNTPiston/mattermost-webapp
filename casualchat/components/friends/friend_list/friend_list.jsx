// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';

// import {Friend} from 'mattermost-redux/constants';

import LoadingScreen from 'components/loading_screen';
import SaveButton from 'components/save_button';
import FriendListItem from 'casualchat/components/friends/friend_list_item';
import NextIcon from 'components/widgets/icons/fa_next_icon';
import PreviousIcon from 'components/widgets/icons/fa_previous_icon';
import SearchIcon from 'components/widgets/icons/fa_search_icon';
import LocalizedInput from 'components/localized_input/localized_input';

import {t} from 'utils/i18n.jsx';

const FRIEND_PER_PAGE = 50;
const FRIEND_SEARCH_DELAY_MILLISECONDS = 200;

export default class FriendList extends React.PureComponent {
    static propTypes = {

        /**
         * Custom friends on the system.
         */
        //friendIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        userId: PropTypes.string.isRequired,

        /**
         * Function to scroll list to top.
         */
        scrollToTop: PropTypes.func.isRequired,

        actions: PropTypes.shape({

            /**
             * Get pages of friends.
             */
            getFriends: PropTypes.func.isRequired,

            /**
             * Search friends.
             */
            searchFriends: PropTypes.func.isRequired,
        }).isRequired,
    }

    constructor(props) {
        super(props);

        this.searchTimeout = null;

        this.state = {
            loading: true,
            page: 0,
            nextLoading: false,
            searchFriends: null,
            missingPages: true,
            friendIds: [],
        };
    }

    componentDidMount() {
        // Emoji.SORT_BY_NAME:
        // export default {
        //     SORT_BY_NAME: 'name',
        // };
        // this.props.actions.getFriends(0, FRIEND_PER_PAGE + 1, Friend.SORT_BY_NAME, true).then(({data}) => {
        //     this.setState({loading: false});
        //     if (data && data.length < FRIEND_PER_PAGE) {
        //         this.setState({
        //             missingPages: false,
        //             friendIds: data.map(({id}) => id),
        //         });
        //     }
        // });
    }

    nextPage = (e) => {
        if (e) {
            e.preventDefault();
        }

        // const next = this.state.page + 1;
        this.setState({nextLoading: true});

        // this.props.actions.getFriends(next, FRIEND_PER_PAGE, Friend.SORT_BY_NAME, true).then(({data}) => {
        //     this.setState({page: next, nextLoading: false});
        //     if (data && data.length < FRIEND_PER_PAGE) {
        //         this.setState({
        //             missingPages: false,
        //             friendIds: data.map(({id}) => id),
        //         });
        //     }

        //     this.props.scrollToTop();
        // });
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
                this.setState({searchFriends: null, page: 0});
                return;
            }

            this.setState({loading: true});

            const response = await this.props.actions.searchFriends(term, {}, true);

            const {data} = response;
            if (data) {
                this.setState({searchFriends: data.map((em) => em.id), loading: false});
            } else {
                this.setState({searchFriends: [], loading: false});
            }
        }, FRIEND_SEARCH_DELAY_MILLISECONDS);
    }

    onDeleteFriend = (friendId) => {
        this.deleteFromSearch(friendId);
        this.deleteFromIds(friendId);
    }

    deleteFromSearch = (friendId) => {
        if (!this.state.searchFriends) {
            return;
        }

        this.setState({searchFriends: this.state.searchFriends.filter((id) => id !== friendId)});
    }

    deleteFromIds =(friendId) => {
        if (!this.state.friendIds) {
            return;
        }

        this.setState({friendIds: this.state.friendIds.filter((id) => id !== friendId)});
    }

    render() {
        const searchFriends = this.state.searchFriends;
        const friends = [];
        let nextButton;
        let previousButton;

        if (this.state.loading) {
            friends.push(
                <tr
                    key='loading'
                    className='backstage-list__item backstage-list__empty'
                >
                    <td colSpan='4'>
                        <LoadingScreen key='loading'/>
                    </td>
                </tr>,
            );
        } else if (this.state.friendIds.length === 0 || (searchFriends && searchFriends.length === 0)) {
            friends.push(
                <tr
                    key='empty'
                    className='backstage-list__item backstage-list__empty'
                >
                    <td colSpan='4'>
                        <FormattedMessage
                            id='friend_list.empty'
                            defaultMessage='No friends found'
                        />
                    </td>
                </tr>,
            );
        } else if (searchFriends) {
            searchFriends.forEach((friendId) => {
                friends.push(
                    <FriendListItem
                        key={'friend_search_item' + friendId}
                        friendId={friendId}
                        onDelete={this.onDeleteFriend}
                    />,
                );
            });
        } else {
            const pageStart = this.state.page * FRIEND_PER_PAGE;
            const pageEnd = pageStart + FRIEND_PER_PAGE;
            const friendsToDisplay = this.state.friendIds.slice(pageStart, pageEnd);

            friendsToDisplay.forEach((friendId) => {
                friends.push(
                    <FriendListItem
                        key={'friend_list_item' + friendId}
                        friendId={friendId}
                        onDelete={this.onDeleteFriend}
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
                            placeholder={{id: t('friend_list.search'), defaultMessage: 'Search Friend'}}
                            onChange={this.onSearchChange}
                            style={style.search}
                        />
                    </div>
                </div>
                {/* <span className='backstage-list__help'>
                    <p>
                        <FormattedMessage
                            id='friend_list.help'
                            defaultMessage="Friends List are available to everyone on your server. Type ':' followed by two characters in a message box to bring up the friend selection menu."
                        />
                    </p>
                    <p>
                        <FormattedMessage
                            id='friend_list.help2'
                            defaultMessage="Tip: If you add #, ##, or ### as the first character on a new line containing friend, you can use larger sized friend. To try it out, send a message such as: '# :smile:'."
                        />
                    </p>
                </span> */}
                <div className='backstage-list'>
                    <table className='friend-list__table'>
                        <thead>
                            <tr className='backstage-list__item friend-list__table-header'>
                                <th className='friend-list__name'>
                                    <FormattedMessage
                                        id='friend_list.name'
                                        defaultMessage='Name'
                                    />
                                </th>
                                <th className='friend-list__image'>
                                    <FormattedMessage
                                        id='friend_list.image'
                                        defaultMessage='Image'
                                    />
                                </th>
                                {/* <th className='friend-list__creator'>
                                    <FormattedMessage
                                        id='friend_list.creator'
                                        defaultMessage='Creator'
                                    />
                                </th> */}
                                <th className='friend-list_actions'>
                                    <FormattedMessage
                                        id='friend_list.actions'
                                        defaultMessage='Actions'
                                    />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {friends}
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
