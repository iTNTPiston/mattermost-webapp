
import TelegramTypes from 'casualchat/action_types/telegram';

export function addTelegramUserToCasualChat(externalList) {
    return {
            type: TelegramTypes.SYNC_CONTACT_LISTS,
            data: {externalList: externalList},
        };
    
}

export function receiveMessageFromCasualChat(externalMessage,sender) {
    return {
            type: TelegramTypes.RECEIVE_MESSAGE,
            data: {
                externalMessage: externalMessage,
                sender: sender
            },
        };
    
}

export function sendMessageToCasualChat(chatID,messageContent) {
    return {
            type: TelegramTypes.SEND_MESSAGE,
            data: {
                chatID: chatID,
                messageContent: messageContent
            },
        };
    
}