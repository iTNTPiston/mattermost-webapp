// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getUser, getCurrentUserId} from 'mattermost-redux/selectors/entities/users';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';

// import {removeEmojiAccess, deleteEmojiWithAccess} from 'casualchat/actions/emojis';
import {acceptRequest,deleteRequest} from 'casualchat/actions/requests';

import {getDisplayNameByUser} from 'utils/utils.jsx';

import RequestListItem from 'casualchat/components/requests/request_list_item/request_list_item.jsx';

function mapStateToProps(state, ownProps) {

    //TODO: get user and request
    // cosnt currRequest = getRequest(state, ownProps.requestId);
    // const anotherUser = getUser(state, ownProps.anotherId);
    // const friend = {
    //     name: getDisplayNameByUser(state, anotherUser),
    //     id: ownProps.anotherId,
    // }
    // const rquest = {
    //     id: ownProps.requestId,
    //     status: currRequest.status,
    //     anotherUser: another
    // }
    return {
        // request,
        // another,
        creatorDisplayName: getDisplayNameByUser(state, creator),
        creatorUsername: creator ? creator.username : '',
        currentUserId: getCurrentUserId(state),
        currentTeam: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            // acceptRequest,
            // deleteRequest,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestListItem);
