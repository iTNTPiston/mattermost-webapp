// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// TODO: used as getters to get state.**
// export const  getContactList= (state) => {
//     console.log("In selector: ",state);

//     return state;
// };

export const getContactList = (state) => {
    return state.telegram.externalList;
};

export const getExternalMessage = (state) => {
    return state.telegram;
};

export const isLinked = (state) => {
    return state.telegram.isLinked;
}