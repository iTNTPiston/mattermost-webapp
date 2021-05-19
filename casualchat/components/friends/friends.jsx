// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import * as Utils from 'utils/utils.jsx';

import FriendList from 'casualchat/components/friends/friend_list';

export default class FriendPage extends React.PureComponent {
    static propTypes = {
        teamId: PropTypes.string.isRequired,
        teamName: PropTypes.string.isRequired,
        teamDisplayName: PropTypes.string.isRequired,
        siteName: PropTypes.string,
        scrollToTop: PropTypes.func.isRequired,
    }

    static defaultProps = {
        teamName: '',
        teamDisplayName: '',
        siteName: '',
    }

    componentDidMount() {
        this.updateTitle();
    }

    updateTitle = () => {
        document.title = Utils.localizeMessage('friends_list.header-private', 'Friends List') + ' - ' + this.props.teamDisplayName + ' ' + this.props.siteName;
    }

    componentDidUpdate(prevProps) {
        if (this.props.siteName !== prevProps.siteName) {
            this.updateTitle();
        }
    }

    render() {
        return (
            <div className='backstage-content emoji-list'>
                <div className='backstage-header'>
                    <h1>
                        <FormattedMessage
                            id='friends_list.header-private'
                            defaultMessage='Friends List'
                        />
                    </h1>

                    <Link
                        className='add-link'
                        to={'/' + this.props.teamName + '/'}
                    >
                        <button
                            type='button'
                            className='btn btn-primary'
                        >
                            <FormattedMessage
                                id='frient_list.add'
                                defaultMessage='Add Friend'
                            />
                        </button>
                    </Link>

                </div>
                <FriendList
                    scrollToTop={this.props.scrollToTop}
                />
            </div>
        );
    }
}
