// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';

// import Permissions from 'mattermost-redux/constants/permissions';
// import {Client4} from 'mattermost-redux/client';

// import DeleteEmoji from 'casualchat/components/friends/delete_friend_modal.jsx';
// import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate';
import DeleteFriend from 'casualchat/components/friends/delete_friend_modal';

export default class FriendListItem extends React.PureComponent {
    static propTypes = {
        friend: PropTypes.shape({
            name: PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        }),
        currentUserId: PropTypes.string.isRequired,
        creatorDisplayName: PropTypes.string.isRequired,
        creatorUsername: PropTypes.string,
        currentTeam: PropTypes.object,
        onDelete: PropTypes.func,
        actions: PropTypes.shape({
            deleteFriend: PropTypes.func.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        friend: {},
        currentUserId: '',
        currentTeam: {},
        creatorDisplayName: '',
    }

    handleDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.friend.id);
        }
        this.props.actions.deleteFriend(this.props.friend.id);
    }

    render() {
        const friend = this.props.friend;

        // const creatorUsername = this.props.creatorUsername;
        // let creatorDisplayName = this.props.creatorDisplayName;

        // if (creatorUsername && creatorUsername !== creatorDisplayName) {
        //     creatorDisplayName += ' (@' + creatorUsername + ')';
        // }


        return (
            <tr className='backstage-list__item'>
                <td className='emoji-list__name'>
                    {friend.name}
                </td>
                <td className='emoji-list__image'>
                    {/* <span
                        className='emoticon'
                        style={{backgroundImage: 'url(' + Client4.getCustomEmojiImageUrl(emoji.id) + ')'}}
                    /> */}
                </td>
                <td className='emoji-list-item_actions'>
                <DeleteFriend
                onDelete={this.handleDelete}
            />
                </td>
            </tr>
        );
    }
}
