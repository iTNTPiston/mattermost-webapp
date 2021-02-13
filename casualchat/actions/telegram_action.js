
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import TelegramTypes from 'casualchat/action_types/telegram';

export function addTelegramUserToCasualChat(externalList) {
    return {
        type: TelegramTypes.SYNC_CONTACT_LISTS,
        data: {externalList},
    };
}

export function receiveMessageFromCasualChat(externalMessage, sender) {
    return {
        type: TelegramTypes.RECEIVE_MESSAGE,
        data: {
            externalMessage,
            sender,
        },
    };
}

export function sendMessageToCasualChat(chatID, messageContent) {
    return {
        type: TelegramTypes.SEND_MESSAGE,
        data: {
            chatID,
            messageContent,
        },
    };
}
