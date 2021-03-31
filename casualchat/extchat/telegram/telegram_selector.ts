// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {TelegramState, TelegramContact, TelegramMessage} from "./telegram_reducer";
import {GlobalState} from 'types/store';


const getTelegramState = (state: GlobalState): TelegramState => {
    return state.telegram;
}

export const getContacts = (state: GlobalState): Record<string, TelegramContact> => {
    return getTelegramState(state).contacts;
};

export const isLinked = (state: GlobalState): boolean => {
    return getTelegramState(state).isLinked;
};

export const getContact = (state: GlobalState, id: string): TelegramContact => {
    return getContacts(state)[id];
}
