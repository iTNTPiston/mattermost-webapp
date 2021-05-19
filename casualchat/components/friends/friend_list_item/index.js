// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getUser, getCurrentUserId} from 'mattermost-redux/selectors/entities/users';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';

// import {removeEmojiAccess, deleteEmojiWithAccess} from 'casualchat/actions/emojis';

import {getDisplayNameByUser} from 'utils/utils.jsx';

import FriendListItem from 'casualchat/components/friends/friend_list_item/friend_list_item.jsx';

function mapStateToProps(state, ownProps) {
  
    const friendUser = getUser(state, ownProps.friendId);
    const friend = {
        name: getDisplayNameByUser(state, friendUser),
        id: ownProps.friendId,
    }
    //const emoji = state.entities.emojis.customEmoji[ownProps.friendId];
   // const creator = getUser(state, emoji.creator_id);

    return {
        friend,
        //creatorDisplayName: getDisplayNameByUser(state, creator),
        //creatorUsername: creator ? creator.username : '',
        currentUserId: getCurrentUserId(state),
        currentTeam: getCurrentTeam(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({

            // deleteFriend,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendListItem);
