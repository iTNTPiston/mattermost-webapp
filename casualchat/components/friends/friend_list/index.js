// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//import {getCustomEmojiIdsSortedByName} from 'mattermost-redux/selectors/entities/emojis';

// import {getCustomEmojis, searchCustomEmojis} from 'mattermost-redux/actions/emojis';

import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';

// import {getPrivateEmojis, searchPrivateEmojis} from 'casualchat/actions/emojis';

import FriendList from 'casualchat/components/friends/friend_list/friend_list.jsx';

function mapStateToProps(state) {
    return {

        //emojiIds: getCustomEmojiIdsSortedByName(state) || [],
        userId: getCurrentUserId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({

            // getFriends,
            // searchFriends,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);
