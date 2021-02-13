
import TelegramTypes from 'casualchat/action_types/telegram';

// export function test_reducer() {
//     return (dispatch) => {
//         dispatch({
//             type: "SYNC_CONTACT_LISTS",
//             data: {},
//         });
//         return {data: true};
//     };
// }

// TODO: Dispatch defined reducer state
export function addTelegramUserToCasualChat(externalList) {
    return (dispatch) => {
        dispatch({
            type: TelegramTypes.SYNC_CONTACT_LISTS,
            data: {externalList: externalList},
        });
        return {data:true};
    };
}