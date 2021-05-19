// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import PropTypes from 'prop-types';
import {FormattedMessage} from 'react-intl';
import {Link} from 'react-router-dom';

import Permissions from 'mattermost-redux/constants/permissions';

import * as Utils from 'utils/utils.jsx';
import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate';

import RequestList from 'casualchat/components/requests/request_list';

export default class RequestPage extends React.PureComponent {
    static propTypes = {
        teamId: PropTypes.string.isRequired,
        teamName: PropTypes.string.isRequired,
        teamDisplayName: PropTypes.string.isRequired,
        siteName: PropTypes.string,
        scrollToTop: PropTypes.func.isRequired,
        actions: PropTypes.shape({
            loadRolesIfNeeded: PropTypes.func.isRequired,
        }).isRequired,
    }

    static defaultProps = {
        teamName: '',
        teamDisplayName: '',
        siteName: '',
    }

    componentDidMount() {
        this.updateTitle();
        this.props.actions.loadRolesIfNeeded(['system_admin', 'team_admin', 'system_user', 'team_user']);
    }

    updateTitle = () => {
        document.title = Utils.localizeMessage('requests.header', 'My Requests') + ' - ' + this.props.teamDisplayName + ' ' + this.props.siteName;
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
                            id='request_list.header'
                            defaultMessage='My Requests'
                        />
                    </h1>
                </div>
                <RequestList
                    scrollToTop={this.props.scrollToTop}
                />
            </div>
        );
    }
}
