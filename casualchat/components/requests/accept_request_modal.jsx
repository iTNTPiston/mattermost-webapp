// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
import PropTypes from 'prop-types';
import React from 'react';
import {FormattedMessage} from 'react-intl';
import DeleteModalTrigger from 'components/delete_modal_trigger';
import WarningIcon from 'components/widgets/icons/fa_warning_icon';

export default class AcceptRequest extends DeleteModalTrigger {
    static propTypes = {
        onAccept: PropTypes.func.isRequired,
        isPending: PropTypes.bool.isRequired,
    }

    get triggerTitle() {
        return (
            <If condition={this.props.isPending}>
                <Then>
                    <FormattedMessage
                        id='request_list.delete'
                        defaultMessage='Delete'
                    />
                </Then>
            <Else>
                <FormattedMessage
                    id='request_list.decline'
                    defaultMessage='Decline'
                />
            </Else>
        </If>

        );
    }

    get modalTitle() {
        return (
            <If condition={this.props.isPending}>
            <Then>
                <FormattedMessage
                    id='request_list.delete.confirm.title'
                    defaultMessage='Delete Request'
                />
            </Then>
        <Else>
            <FormattedMessage
                id='request_list.decline.confirm.title'
                defaultMessage='Decline Request'
            />
        </Else>
        </If>
        );
    }

    get modalMessage() {
        return (
            <div className='alert alert-warning'>
                <WarningIcon additionalClassName='mr-1'/>
                <If condition={this.props.isPending}>
                    <Then>
                        <FormattedMessage
                            id='request_list.delete.confirm.msg'
                            defaultMessage='This action permanently  deletes this request. Are you sure?'
                        />
                    </Then>
                    <Else>
                <FormattedMessage
                    id='request_list.decline.confirm.msg'
                    defaultMessage='This action permanently declines this request. Are you sure?'
                />
                </Else>
                </If>
            </div>
        );
    }

    get modalConfirmButton() {
        return (

            <If condition={this.props.isPending}>
                <Then>
                    <FormattedMessage
                        id='request_list.delete.confirm.button'
                        defaultMessage='Delete'
                    />
                </Then>
                <Else>
            <FormattedMessage
                id='request_list.delete.confirm.button'
                defaultMessage='Decline'
            />

             </Else>
        </If>

        );
    }
}
