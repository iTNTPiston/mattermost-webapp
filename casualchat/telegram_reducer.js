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
        case TelegramTypes.RECEIVE_MESSAGE: {
            console.log("Current State = ",state);
            const nextState = {...state};
            nextState.externalMessage = action.data.externalMessage;
            nextState.sender = action.data.sender;
            return nextState;
        }
        case TelegramTypes.SEND_MESSAGE: {
            console.log("Current State = ",state);
            const nextState = {...state};
            nextState.chatID = action.data.chatID;
            nextState.messageContent = action.data.messageContent;
            return nextState;
        }
        default:
            return state;
    }
}

export default telegram;