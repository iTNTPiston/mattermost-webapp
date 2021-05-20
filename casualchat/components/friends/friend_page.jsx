// // Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// // See LICENSE.txt for license information.

// import React from 'react';
// import PropTypes from 'prop-types';
// import {FormattedMessage} from 'react-intl';
// import {Link} from 'react-router-dom';

// import Permissions from 'mattermost-redux/constants/permissions';

// import * as Utils from 'utils/utils.jsx';
// import AnyTeamPermissionGate from 'components/permissions_gates/any_team_permission_gate';

// import FriendList from 'casualchat/components/friends/friend_list';

// export default class FriendPage extends React.PureComponent {
//     static propTypes = {
//         teamId: PropTypes.string.isRequired,
//         teamName: PropTypes.string.isRequired,
//         teamDisplayName: PropTypes.string.isRequired,
//         siteName: PropTypes.string,
//         scrollToTop: PropTypes.func.isRequired,
//         actions: PropTypes.shape({
//             loadRolesIfNeeded: PropTypes.func.isRequired,
//         }).isRequired,
//     }

//     static defaultProps = {
//         teamName: '',
//         teamDisplayName: '',
//         siteName: '',
//     }
//     constructor(props){
//         this.state={
//             showAddFriendModal: false
//         }
//     }

//     componentDidMount() {
//         this.updateTitle();
//         this.props.actions.loadRolesIfNeeded(['system_admin', 'team_admin', 'system_user', 'team_user']);
//     }

//     updateTitle = () => {
//         document.title = Utils.localizeMessage('friends.header', 'My Friends') + ' - ' + this.props.teamDisplayName + ' ' + this.props.siteName;
//     }

//     componentDidUpdate(prevProps) {
//         if (this.props.siteName !== prevProps.siteName) {
//             this.updateTitle();
//         }
//     }

//     render() {

//         let addFriendModal;
//         if (this.state.showAddFriendModal) {
//             addFriendModal = (
//                 <addFriendModal
//                     onModalDismissed={this.hideMoreDirectChannelsModal}
//                 />
//             );
//         }
//         return (
//             <div className='backstage-content emoji-list'>
//                 {addFriendModal}
//                 <div className='backstage-header'>
//                     <h1>
//                         <FormattedMessage
//                             id='friend_list.header'
//                             defaultMessage='My Friends'
//                         />
//                     </h1>
//                 </div>
//                 <FriendList
//                     scrollToTop={this.props.scrollToTop}
//                 />
//             </div>
//         );
//     }
// }
