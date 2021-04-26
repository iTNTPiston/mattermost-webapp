// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import telegram from './telegram/telegram_adapter';

export interface ExtChatAdapter {
    logOut: () => Promise<any>;
    pullContacts: () => Promise<any>;
    sendMessage: (externalId: string, message: string) => Promise<any>;
    logIn: (username: string) => Promise<any>;
    sendCode: (code: string) => Promise<any>;
    isReadyToLogin: () => boolean;
    isReadyToSendCode: () => boolean;
}
export type ExtChat = {
    telegram: ExtChatAdapter;
}

export default {
    telegram
};
