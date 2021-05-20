// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import {forceLogoutIfNecessary} from 'mattermost-redux/actions/helpers';

import {EmojiTypes} from 'mattermost-redux/action_types';
import {GetStateFunc, DispatchFunc, ActionFunc} from 'mattermost-redux/types/actions';
import {General, Emoji} from 'mattermost-redux/constants';
import {logError} from 'mattermost-redux/actions/errors';

import CasualChatClient from 'casualchat/CasualChatClient';

// export function createRequest(emoji: any, image: any): ActionFunc {
//     return bindClientFunc({
//         clientFunc: CasualChatClient.createPrivateEmoji,
//         onSuccess: EmojiTypes.RECEIVED_CUSTOM_EMOJI,
//         params: [
//             emoji,
//             image,
//         ],
//     });
// }

export function getRequests(
    page = 0,
    perPage: number = General.PAGE_SIZE_DEFAULT,
    sort: string = Emoji.SORT_BY_NAME,
    userID: string,
): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        let data;
        try {
            data = await CasualChatClient.getPrivateEmojis(userID, page, perPage, sort);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);

            dispatch(logError(error));
            return {error};
        }

        dispatch({
            type: EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
            data,
        });

        return {data};
    };
}

export function searchRequests(term: string, options: any = {}, userID: string): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        let data;
        try {
            data = await CasualChatClient.searchPrivateEmoji(userID, term, options);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);

            dispatch(logError(error));
            return {error};
        }

        dispatch({
            type: EmojiTypes.RECEIVED_CUSTOM_EMOJIS,
            data,
        });

        return {data};
    };
}

export function acceptRequest(requestId: string): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        try {
            await CasualChatClient.acceptRequest(requestId);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);

            dispatch(logError(error));
            return {error};
        }

        // dispatch({
        //     type: RequestTypes.REQUEST,
        //     data: {id: requestId},
        // });

        return {data: true};
    };
}



export function deleteRequest(requestId: string): ActionFunc {
    return async (dispatch: DispatchFunc, getState: GetStateFunc) => {
        try {
            await CasualChatClient.deleteRequest(requestId);
        } catch (error) {
            forceLogoutIfNecessary(error, dispatch, getState);

            dispatch(logError(error));
            return {error};
        }

        // dispatch({
        //     type: RequestTypes.REQUEST,
        //     data: {id: requestId},
        // });

        return {data: true};
    };
}

