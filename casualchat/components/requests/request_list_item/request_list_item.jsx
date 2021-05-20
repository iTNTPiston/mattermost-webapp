// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';

// import Permissions from 'mattermost-redux/constants/permissions';
// import {Client4} from 'mattermost-redux/client';

// import DeleteEmoji from 'casualchat/components/requests/delete_request_modal.jsx';
// import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate';
import DeleteRequest from 'casualchat/components/requests/delete_request_modal.jsx';
import AcceptRequest from 'casualchat/components/requests/accept_request_modal.jsx';


export default class RequestListItem extends React.PureComponent {
    static propTypes = {
        request: PropTypes.object.isRequired,
        currentTeam: PropTypes.object,
        onAccept: PropTypes.func,
        onDelete: PropTypes.func,
        actions: PropTypes.shape({
            deleteRequest: PropTypes.func.isRequired,
            acceptRequest: PropTypes.func.isRequired,
        }).isRequired,
        isPending: PropTypes.bool.isRequired
    }

    static defaultProps = {
        request: {},
        currentUserId: '',
        currentTeam: {},
        creatorDisplayName: '',
    }

    handleAccept = () => {
        if (this.props.onAccept) {
            this.props.onAccept(this.props.request.id);
        }
        this.props.actions.acceptRequest(this.props.request.id);
    }

    handleDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.request.id);
        }
        this.props.actions.deleteRequest(this.props.request.id);
    }

    render() {
        const request = this.props.request;
        const acceptButton = (
            <AcceptRequest
                onDelete={this.handleAccept}
                isPending = {this.props.isPending}
            />);
        const deleteButton = (
            <DeleteRequest
                onDelete={this.handleDelete}
                isPending = {this.props.isPending}
            />);


        // TODO: user names instead of req name
        return (
            <tr className='backstage-list__item'>
                <td className='request-list__name'>
                    {request.name} 
                </td>
                <td className='request-list__status'>
                    {/* <span
                        className='emoticon'
                        style={{backgroundImage: 'url(' + Client4.getStatus(request.id) + ')'}}
                    /> */}
                </td>
                <td className='request-list-item_actions'>
                    {acceptButton}
                    {deleteButton}
                </td>
            </tr>
        );
    }
}
