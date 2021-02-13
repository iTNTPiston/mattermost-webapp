// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import plugins from './plugins';
import views from './views';
import storage from './storage';
import telegram from 'casualchat/telegram_reducer';

export default {
    views,
    plugins,
    storage,
    telegram,
};
