// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';

// import Permissions from 'mattermost-redux/constants/permissions';
// import {Client4} from 'mattermost-redux/client';

// import DeleteEmoji from 'casualchat/components/requests/delete_request_modal.jsx';
// import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate';
import DeleteRequest from 'casualchat/components/requests/delete_request_modal.jsx';

export default class RequestListItem extends React.PureComponent {
    static propTypes = {
        request: PropTypes.object.isRequired,
        currentUserId: PropTypes.string.isRequired,
        creatorDisplayName: PropTypes.string.isRequired,
        creatorUsername: PropTypes.string,
        currentTeam: PropTypes.object,
        onDelete: PropTypes.func,
        actions: PropTypes.shape({
            deleteRequest: PropTypes.func.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        request: {},
        currentUserId: '',
        currentTeam: {},
        creatorDisplayName: '',
    }

    handleDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.request.id);
        }
        this.props.actions.deleteRequest(this.props.request.id);
    }

    render() {
        const request = this.props.request;

        // const creatorUsername = this.props.creatorUsername;
        // let creatorDisplayName = this.props.creatorDisplayName;

        // if (creatorUsername && creatorUsername !== creatorDisplayName) {
        //     creatorDisplayName += ' (@' + creatorUsername + ')';
        // }

        const deleteButton = (
            <DeleteRequest
                onDelete={this.handleDelete}

                // isPrivate={this.props.isPrivate}
                // isOwner={true}
            />);


        // TODO: user names instead of req name
        return (
            <tr className='backstage-list__item'>
                <td className='request-list__name'>
                    {':' + request.name + ':'} 
                </td>
                <td className='request-list__image'>
                    {/* <span
                        className='emoticon'
                        style={{backgroundImage: 'url(' + Client4.getCustomEmojiImageUrl(emoji.id) + ')'}}
                    /> */}
                </td>
                {/* <td className='emoji-list__creator'>
                    {creatorDisplayName}
                </td> */}
                <td className='request-list-item_actions'>
                    {deleteButton}
                </td>
            </tr>
        );
    }
}
