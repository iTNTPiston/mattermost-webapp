// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';

// import {If, Then, Else} from 'react-if';

import DeleteModalTrigger from 'components/delete_modal_trigger';
import WarningIcon from 'components/widgets/icons/fa_warning_icon';

export default class DeleteFriend extends DeleteModalTrigger {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,

        // isPrivate: PropTypes.bool.isRequired,
        // isOwner: PropTypes.bool,
    }

    get triggerTitle() {
        return (
            <FormattedMessage
                id='friend_list.delete'
                defaultMessage='Delete'
            />
        );
    }

    get modalTitle() {
        return (
            <FormattedMessage
                id='friend_list.delete.confirm.title'
                defaultMessage='Delete Friend'
            />
        );
    }

    get modalMessage() {
        return (
            <div className='alert alert-warning'>
                <WarningIcon additionalClassName='mr-1'/>
                {/* <If condition={this.props.isPrivate && !this.props.isOwner}>
                    <Then>
                        <FormattedMessage
                            id='emoji_list.remove_access.confirm.msg'
                            defaultMessage='This action removes this friend of yours. Are you sure you want to remove them?'
                        />
                    </Then>
                    <Else> */}
                <FormattedMessage
                    id='friend_list.delete.confirm.msg'
                    defaultMessage='This action permanently removes this friend. Are you sure?'
                />
                {/* </Else>
                </If> */}
            </div>
        );
    }

    get modalConfirmButton() {
        return (

            // <If condition={this.props.isPrivate && !this.props.isOwner}>
            //     <Then>
            //         <FormattedMessage
            //             id='emoji_list.remove_access.confirm.button'
            //             defaultMessage=''
            //         />
            //     </Then>
            //     <Else>
            <FormattedMessage
                id='friend_list.delete.confirm.button'
                defaultMessage='Delete'
            />

        //     </Else>
        // </If>

        );
    }
}
