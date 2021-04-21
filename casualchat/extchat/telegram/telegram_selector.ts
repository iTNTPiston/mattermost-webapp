// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {GlobalState} from 'types/store';

import {TelegramState, TelegramContact} from './telegram_reducer';

const getTelegramState = (state: GlobalState): TelegramState => {
    return state.telegram;
};

export const getContacts = (state: GlobalState): Record<string, TelegramContact> => {
    return getTelegramState(state).contacts;
};

export const isLinked = (state: GlobalState): boolean => {
    return getTelegramState(state).isLinked;
};

export const getContact = (state: GlobalState, id: string): TelegramContact => {
    return getContacts(state)[id];
};
