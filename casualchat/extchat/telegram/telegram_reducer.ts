// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import TelegramTypes from 'casualchat/action_types/telegram';

export type TelegramState = {
    isLinked: boolean,
    contacts: Record<string, TelegramContact>,
};

export type TelegramContact = {
    id: string,
    name: string,
    messages: TelegramMessage[]
};

export type TelegramMessage = {
    sender: string,
    content: string,
}

//TODO: define a reducer to set up state

function telegram(state: TelegramState = {isLinked: false, contacts: {}}, action: {type: string, data: unknown}) {
    switch (action.type) {
    case TelegramTypes.SYNC_CONTACT_LISTS: {
        const nextState = {...state};
        const payload = action.data as {contacts: Record<string, TelegramContact>};
        nextState.contacts = payload.contacts;
        return nextState;
    }
    case TelegramTypes.IS_LINKED_TO_TELEGRAM: {
        const nextState = {...state};
        const payload = action.data as {isLinked: boolean};
        nextState.isLinked = payload.isLinked;
        return nextState;
    }
    case TelegramTypes.RECEIVE_MESSAGE: {
        const nextState = {...state};
        const payload = action.data as {contact: string, message: TelegramMessage}
        const copy = nextState.contacts[payload.contact].messages.map(({sender,content})=>({sender,content}));
        copy.push(payload.message);
        nextState.contacts[payload.contact].messages = copy;
        return nextState;
    }

    default:
        return state;
    }
}

export default telegram;
