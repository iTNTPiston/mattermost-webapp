// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import telegram from 'casualchat/telegram_reducer';

import plugins from './plugins';
import views from './views';
import storage from './storage';

export default {
    views,
    plugins,
    storage,
    telegram,
};
