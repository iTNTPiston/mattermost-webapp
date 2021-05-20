// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {Modal} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import {Client4} from 'mattermost-redux/client';
import {Channel} from 'mattermost-redux/types/channels';
import {RelationOneToOne} from 'mattermost-redux/types/utilities';
import {UserProfile} from 'mattermost-redux/types/users';

import Constants from 'utils/constants';
import {displayEntireNameForUser, localizeMessage, isGuest} from 'utils/utils.jsx';
import MultiSelect, {Value} from 'components/multiselect/multiselect';
import ProfilePicture from 'components/profile_picture';
import AddIcon from 'components/widgets/icons/fa_add_icon';
import GuestBadge from 'components/widgets/badges/guest_badge';
import BotBadge from 'components/widgets/badges/bot_badge';


const USERS_PER_PAGE = 50;
const MAX_SELECTABLE_VALUES = Constants.MAX_USERS_IN_GM - 1;

type OptionType = (UserProfile & Value);

type Props = {
    currentUserId: string;
    currentTeamId: string;
    currentTeamName: string;
    searchTerm: string;
    users: UserProfile[];
    //groupChannels: Array<{profiles: UserProfile[]} & Channel>;
    //myDirectChannels: Channel[];
    statuses: RelationOneToOne<UserProfile, string>;
    totalCount?: number;
    onModalDismissed: () => void;
    onHide?: () => void;
    bodyOnly?: boolean;
    actions: {
        getProfiles: (page?: number | undefined, perPage?: number | undefined, options?: any) => Promise<any>;
        // getProfilesInTeam: (teamId: string, page: number, perPage?: number | undefined, sort?: string | undefined, options?: any) => Promise<any>;
        getStatusesByIds: (userIds: string[]) => void;
        getTotalUsersStats: () => void;
        loadStatusesForProfilesList: (users: any) => {
             data: boolean;
         };
        // loadProfilesForGroupChannels: (groupChannels: any) => void;
        // openDirectChannelToUserId: (userId: any) => Promise<any>;
        // openGroupChannelToUserIds: (userIds: any) => Promise<any>;
        searchProfiles: (term: string, options?: any) => Promise<any>;
        // searchGroupChannels: (term: string) => Promise<any>;
        setModalSearchTerm: (term: any) => Promise<{
             data: boolean;
         }>;
         sendFriendRequest:(userId: string)=>Promise<any>;
    };
}

type State = {
    values: OptionType[];
    show: boolean;
    search: boolean;
    saving: boolean;
    loadingUsers: boolean;
}

export default class FriendAddModal extends React.PureComponent<Props, State> {
    searchTimeoutId: any;
    multiselect: React.RefObject<MultiSelect<OptionType>>;

    constructor(props: Props) {
        super(props);

        this.searchTimeoutId = 0;
        this.multiselect = React.createRef();

        const values: (OptionType | UserProfile)[] = [];

        // if (props.currentChannelMembers) {
        //     for (let i = 0; i < props.currentChannelMembers.length; i++) {
        //         const user = Object.assign({}, props.currentChannelMembers[i]);

        //         if (user.id === props.currentUserId) {
        //             continue;
        //         }

        //         values.push(user);
        //     }
        // }

        this.state = {
            values: values as OptionType[],
            show: true,
            search: false,
            saving: false,
            loadingUsers: true,
        };
    }

    componentDidUpdate(prevProps: Props) {
        this.updateFromProps(prevProps);
    }

    componentDidMount() {
    }

    loadModalData = () => {
        this.getUserProfiles();
        this.props.actions.getTotalUsersStats();
        this.loadProfilesMissingStatus(this.props.users, this.props.statuses);
    }

    public loadProfilesMissingStatus = (users: UserProfile[] = [], statuses: RelationOneToOne<UserProfile, string> = {}) => {
        const missingStatusByIds = users.
            filter((user) => !statuses[user.id]).
            map((user) => user.id);

        if (missingStatusByIds.length > 0) {
            this.props.actions.getStatusesByIds(missingStatusByIds);
        }
    }

    getUserProfiles = (page?: number) => {
        const pageNum = page ? page + 1 : 0;
        this.props.actions.getProfiles(pageNum, USERS_PER_PAGE * 2).then(() => {
            this.setUsersLoadingState(false);
        });
    }

    setUsersLoadingState = (loadingState: boolean) => {
        this.setState({
            loadingUsers: loadingState,
        });
    }

    updateFromProps(prevProps: Props) {
        if (prevProps.searchTerm !== this.props.searchTerm) {
            clearTimeout(this.searchTimeoutId);

            const searchTerm = this.props.searchTerm;
            if (searchTerm === '') {
                this.resetPaging();
            } else {
                const teamId = '';

                this.searchTimeoutId = setTimeout(
                    async () => {
                        this.setUsersLoadingState(true);
                        const {data: profilesData}= await this.props.actions.searchProfiles(searchTerm, {team_id: teamId});
                        if (profilesData) {
                            this.props.actions.loadStatusesForProfilesList(profilesData);
                        }
                        this.resetPaging();
                        this.setUsersLoadingState(false);
                    },
                    Constants.SEARCH_TIMEOUT_MILLISECONDS,
                );
            }
        }

        if (
            prevProps.users.length !== this.props.users.length ||
            Object.keys(prevProps.statuses).length !== Object.keys(this.props.statuses).length
        ) {
            this.loadProfilesMissingStatus(this.props.users, this.props.statuses);
        }
    }

    handleHide = () => {
        this.props.actions.setModalSearchTerm('');
        this.setState({show: false});

        if (this.props.bodyOnly) {
            this.handleExit();
        }
    }

    handleExit = () => {

        if (this.props.onModalDismissed) {
            this.props.onModalDismissed();
        }

        if (this.props.onHide) {
            this.props.onHide();
        }
    }

    handleSubmit = (values = this.state.values) => {
        const {actions} = this.props;
        if (this.state.saving) {
            return;
        }

        const userIds = values.map((v) => v.id);
        if (userIds.length === 0) {
            return;
        }

        this.setState({saving: true});

        const done = (result: any) => {
            const {data, error} = result;

            this.setState({saving: false});

            if (!error) {
                this.handleHide();
            }
        };

        if (userIds.length === 1) {
            actions.sendFriendRequest(userIds[0]).then(done);
        } 
    };

    addValue = (value: OptionType) => {
        if (Array.isArray(value)) {
            this.addUsers(value);
        } else {
            const values = Object.assign([], this.state.values);

            if (values.indexOf(value) === -1) {
                values.push(value);
            }

            this.setState({values});
        }
    };

    addUsers = (users: UserProfile[]) => {
        const values: OptionType[] = Object.assign([], this.state.values);
        const existingUserIds = values.map((user) => user.id);
        for (const user of users) {
            if (existingUserIds.indexOf(user.id) !== -1) {
                continue;
            }
            values.push(user as OptionType);
        }

        this.setState({values});
    };

    handlePageChange = (page: number, prevPage: number) => {
        if (page > prevPage) {
            this.setUsersLoadingState(true);
            this.getUserProfiles(page);
        }
    }

    resetPaging = () => {
        if (this.multiselect.current) {
            this.multiselect.current.resetPaging();
        }
    }

    search = (term: string) => {
        this.props.actions.setModalSearchTerm(term);
    }

    handleDelete = (values: OptionType[]) => {
        this.setState({values});
    }

    renderAriaLabel = (option: OptionType) => {
        if (!option) {
            return '';
        }
        return (option as UserProfile).username;
    }

    renderOption = (option: OptionType, isSelected: boolean, onAdd: (value: OptionType) => void, onMouseMove: (value: OptionType) => void) => {

        const displayName = displayEntireNameForUser(option);
        

        let modalName: string | React.ReactElement = displayName;
        if (option.id === this.props.currentUserId) {
            modalName = (
                <FormattedMessage
                    id='more_direct_channels.directchannel.you'
                    defaultMessage='{displayname} (you)'
                    values={{
                        displayname: displayName,
                    }}
                />
            );
        } else if (option.delete_at) {
            modalName = (
                <FormattedMessage
                    id='more_direct_channels.directchannel.deactivated'
                    defaultMessage='{displayname} - Deactivated'
                    values={{
                        displayname: displayName,
                    }}
                />
            );
        }

        let rowSelected = '';
        if (isSelected) {
            rowSelected = 'more-modal__row--selected';
        }

        const status = option.delete_at || option.is_bot ? null : this.props.statuses[option.id];
        const email = option.is_bot ? null : option.email;

        return (
            <div
                key={option.id}
                ref={isSelected ? 'selected' : option.id}
                className={'more-modal__row clickable ' + rowSelected}
                onClick={() => onAdd(option)}
                onMouseMove={() => onMouseMove(option)}
            >
                <ProfilePicture
                    src={Client4.getProfilePictureUrl(option.id, option.last_picture_update)}
                    status={status as string | undefined}
                    size='md'
                />
                <div
                    className='more-modal__details'
                >
                    <div className='more-modal__name'>
                        {modalName}
                        <BotBadge
                            show={Boolean(option.is_bot)}
                            className='badge-popoverlist'
                        />
                        <GuestBadge
                            show={isGuest(option)}
                            className='badge-popoverlist'
                        />
                    </div>
                    <div className='more-modal__description'>
                        {email}
                    </div>
                </div>
                <div className='more-modal__actions'>
                    <div className='more-modal__actions--round'>
                        <AddIcon/>
                    </div>
                </div>
            </div>
        );
    }

    renderValue(props: {data: OptionType}) {

        return props.data.username;
    }

    handleSubmitImmediatelyOn = (value: OptionType) => {
        return true
    }

    render() {
        // let note;
        // if (this.props.currentChannelMembers) {
        //     if (this.state.values && this.state.values.length >= MAX_SELECTABLE_VALUES) {
        //         note = (
        //             <FormattedMessage
        //                 id='more_direct_channels.new_convo_note.full'
        //                 defaultMessage={'You\'ve reached the maximum number of people for this conversation. Consider creating a private channel instead.'}
        //             />
        //         );
        //     } else if (this.props.isExistingChannel) {
        //         note = (
        //             <FormattedMessage
        //                 id='more_direct_channels.new_convo_note'
        //                 defaultMessage={'This will start a new conversation. If you\'re adding a lot of people, consider creating a private channel instead.'}
        //             />
        //         );
        //     }
        // }

        const buttonSubmitText = localizeMessage('multiselect.go', 'Go');
        const buttonSubmitLoadingText = localizeMessage('multiselect.loading', 'Loading..');

        // const numRemainingText = (
        //     <FormattedMessage
        //         id='multiselect.numPeopleRemaining'
        //         defaultMessage='Use ↑↓ to browse, ↵ to select. You can add {num, number} more {num, plural, one {person} other {people}}. '
        //         values={{
        //             num: MAX_SELECTABLE_VALUES - this.state.values.length,
        //         }}
        //     />
        // );

        let users = this.props.users || [];

        if (this.state.values.length) {
            users = users.filter((user) => user.delete_at === 0 && user.id !== this.props.currentUserId);
        } else {
            const active: UserProfile[] = [];
            const inactive: UserProfile[] = [];
            for (const user of users) {
                (user.delete_at ? inactive : active).push(user);
            }
            users = active.concat(inactive);
        }

        users = users.filter((user) => {
            return user.delete_at===0;
        });

        const usersValues = users.map((user) => {
            return {label: user.username, value: user.id, ...user};
        });

    

        const options: OptionType[] = usersValues;
        const body = (
            <MultiSelect<OptionType>
                key='moreDirectChannelsList'
                ref={this.multiselect}
                options={options}
                optionRenderer={this.renderOption}
                values={this.state.values}
                valueRenderer={this.renderValue}
                ariaLabelRenderer={this.renderAriaLabel}
                perPage={USERS_PER_PAGE}
                handlePageChange={this.handlePageChange}
                handleInput={this.search}
                handleDelete={this.handleDelete}
                handleAdd={this.addValue}
                handleSubmit={this.handleSubmit}
                maxValues={MAX_SELECTABLE_VALUES}
                buttonSubmitText={buttonSubmitText}
                buttonSubmitLoadingText={buttonSubmitLoadingText}
                submitImmediatelyOn={this.handleSubmitImmediatelyOn}
                saving={this.state.saving}
                loading={this.state.loadingUsers}
                users={this.props.users}
                totalCount={this.props.totalCount}
                placeholderText={localizeMessage('multiselect.placeholder', 'Search and add members')}
            />
        );

        if (this.props.bodyOnly) {
            return body;
        }

        return (
            <Modal
                dialogClassName='a11y__modal more-modal more-direct-channels'
                show={this.state.show}
                onHide={this.handleHide}
                onExited={this.handleExit}
                onEntered={this.loadModalData}
                role='dialog'
                aria-labelledby='moreDmModalLabel'
                id='moreDmModal'
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title
                        componentClass='h1'
                        id='moreDmModalLabel'
                    >
                        <FormattedMessage
                            id='more_direct_channels.title'
                            defaultMessage='Direct Messages'
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body
                    role='application'
                >
                    {body}
                </Modal.Body>
                <Modal.Footer className='modal-footer--invisible'>
                    <button
                        id='closeModalButton'
                        type='button'
                        className='btn btn-link'
                    >
                        <FormattedMessage
                            id='general_button.close'
                            defaultMessage='Close'
                        />
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
