import {combineReducers} from 'redux';

import TelegramTypes from 'casualchat/action_types/telegram';

//TODO: define a reducer to set up state

function telegram(state = {}, action) {
    console.log("Entered reducer");
    console.log(action.type);
    switch (action.type) {
        case TelegramTypes.SYNC_CONTACT_LISTS: {
            console.log("Current State = ",state);
            const nextState = {...state};
            nextState.externalList = action.data.externalList;
            return nextState;
        }
        default:
            return state;
    }
}

export default telegram;