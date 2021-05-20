// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {connect} from 'react-redux';
import {bindActionCreators, ActionCreatorsMapObject, Dispatch} from 'redux';
import {
    getProfiles,
    getProfilesInTeam,
    getStatusesByIds,
    getTotalUsersStats,
    searchProfiles,
} from 'mattermost-redux/actions/users';
// import {searchGroupChannels} from 'mattermost-redux/actions/channels';
import {
    getCurrentUserId,
    getProfiles as selectProfiles,
    getProfilesInCurrentChannel,
    getProfilesInCurrentTeam, searchProfiles as searchProfilesSelector,
    searchProfilesInCurrentTeam,
    getTotalUsersStats as getTotalUsersStatsSelector,
} from 'mattermost-redux/selectors/entities/users';
// import {getChannelsWithUserProfiles, getAllChannels} from 'mattermost-redux/selectors/entities/channels';
// import {getConfig} from 'mattermost-redux/selectors/entities/general';
import {getCurrentTeam} from 'mattermost-redux/selectors/entities/teams';
import {ActionFunc} from 'mattermost-redux/types/actions';
// import {Channel} from 'mattermost-redux/types/channels';
import {UserProfile} from 'mattermost-redux/types/users';
import {sortByUsername, filterProfilesMatchingTerm} from 'mattermost-redux/utils/user_utils';
// import {memoizeResult} from 'mattermost-redux/utils/helpers';

// import {openDirectChannelToUserId, openGroupChannelToUserIds} from 'actions/channel_actions';
import {loadStatusesForProfilesList} from 'actions/status_actions.jsx';
// import {loadProfilesForGroupChannels} from 'actions/user_actions.jsx';
import {setModalSearchTerm} from 'actions/views/search';

import {GlobalState} from 'types/store';

// import {isLinked, getContacts} from 'casualchat/extchat/telegram/telegram_selector';
// import extchat from 'casualchat/extchat/extchat_adapter';

import FriendAddModal from './friend_add_modal';

type OwnProps = {
    isExistingChannel: boolean;
}

function mapStateToProps(state: GlobalState, ownProps: OwnProps) {
    const currentUserId = getCurrentUserId(state);
    let currentChannelMembers: UserProfile[] = [];
    if (ownProps.isExistingChannel) {
        currentChannelMembers = getProfilesInCurrentChannel(state);
    }

    //const config = getConfig(state);
    //const restrictDirectMessage = config.RestrictDirectMessage;

    const searchTerm = state.views.search.modalSearch;

    let users;
    //const telegramContacts = Object.values((getContacts(state)));
    if (searchTerm) {
       // if (restrictDirectMessage === 'any') {
            users = searchProfilesSelector(state, searchTerm, false);
        //} else {
            users = searchProfilesInCurrentTeam(state, searchTerm, false);
        //}
    } else {//if (restrictDirectMessage === 'any') {
        users = selectProfiles(state, {});
}//} else {
    //    users = getProfilesInCurrentTeam(state);
    //}

    //const filteredGroupChannels = filterGroupChannels(getChannelsWithUserProfiles(state), searchTerm);
    //const myDirectChannels = filterDirectChannels(getAllChannels(state), currentUserId);

    const team = getCurrentTeam(state);
    const stats = getTotalUsersStatsSelector(state) || {total_users_count: 0};

    return {
        currentTeamId: team.id,
        currentTeamName: team.name,
        searchTerm,
        users: users.sort(sortByUsername),
        statuses: state.entities.users.statuses,
        currentChannelMembers,
        currentUserId,
        totalCount: stats.total_users_count,
    };
}
type Actions = {
    getProfiles: (page?: number | undefined, perPage?: number | undefined, options?: any) => Promise<any>;
    getStatusesByIds: (userIds: string[]) => ActionFunc;
    getTotalUsersStats: () => ActionFunc;
    loadStatusesForProfilesList: (users: any) => {
        data: boolean;
    };
    searchProfiles: (term: string, options?: any) => Promise<any>;
    setModalSearchTerm: (term: any) => Promise<{
        data: boolean;
    }>;
    sendFriendRequest:(userId: string)=>Promise<any>;
}

function mapDispatchToProps(dispatch: Dispatch) {
    const sendFriendRequest = async(userId:string):Promise<any>=>{
        console.log("Send to "+userId);
    }
    return {
        actions: {...bindActionCreators<ActionCreatorsMapObject<ActionFunc>, Actions>({
            getProfiles,
            getStatusesByIds,
            getTotalUsersStats,
            loadStatusesForProfilesList,
            searchProfiles,
            setModalSearchTerm,
            //sendFriendRequest,
        }, dispatch), sendFriendRequest}
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendAddModal);