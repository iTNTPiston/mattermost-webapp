// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getUser, getCurrentUserId} from 'mattermost-redux/selectors/entities/users';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';

// import {removeEmojiAccess, deleteEmojiWithAccess} from 'casualchat/actions/emojis';

import {getDisplayNameByUser} from 'utils/utils.jsx';

import RequestListItem from 'casualchat/components/requests/request_list_item/request_list_item.jsx';

function mapStateToProps(state, ownProps) {
    const emoji = state.entities.emojis.customEmoji[ownProps.emojiId];
    const creator = getUser(state, emoji.creator_id);

    return {
        emoji,
        creatorDisplayName: getDisplayNameByUser(state, creator),
        creatorUsername: creator ? creator.username : '',
        currentUserId: getCurrentUserId(state),
        currentTeam: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({

            // deleteRequest,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestListItem);
