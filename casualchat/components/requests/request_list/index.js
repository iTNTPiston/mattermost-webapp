// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

//import {getCustomEmojiIdsSortedByName} from 'mattermost-redux/selectors/entities/emojis';

// import {getCustomEmojis, searchCustomEmojis} from 'mattermost-redux/actions/emojis';

import {getCurrentUserId} from 'mattermost-redux/selectors/entities/users';

// import {getPrivateEmojis, searchPrivateEmojis} from 'casualchat/actions/emojis';

import RequestList from 'casualchat/components/requests/request_list/request_list.jsx';

function mapStateToProps(state) {
    return {

        //emojiIds: getCustomEmojiIdsSortedByName(state) || [],
        userId: getCurrentUserId(state),
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({

            // getRequests,
            // searchRequests,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
