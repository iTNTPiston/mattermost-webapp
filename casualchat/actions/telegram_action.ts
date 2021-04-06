
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import TelegramTypes from 'casualchat/action_types/telegram';
import {TelegramContact} from "casualchat/extchat/telegram/telegram_reducer";

type Action = {
    type: string,
    data: unknown
}

export function setContacts(contacts: Record<string, TelegramContact>): Action{
    return {
        type: TelegramTypes.SYNC_CONTACT_LISTS,
        data: {contacts},
    };
}

export function setIsLinked(isLinked: boolean):Action {
    return {
        type: TelegramTypes.IS_LINKED_TO_TELEGRAM,
        data: {isLinked},
    };
}

// export function receiveMessageFromCasualChat(externalMessage, sender) {
//     return {
//         type: TelegramTypes.RECEIVE_MESSAGE,
//         data: {
//             externalMessage,
//             sender,
//         },
//     };
// }

// export function sendMessageToCasualChat(chatID, messageContent) {
//     return {
//         type: TelegramTypes.SEND_MESSAGE,
//         data: {
//             chatID,
//             messageContent,
//         },
//     };
//}

