import React, { ComponentType } from 'react';
import { actions } from "../../redux/dialogs-reducer"
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {AppStateType} from "../../redux/redux-store";
import { compose } from 'redux';

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};

export default compose<ComponentType>(connect(mapStateToProps, {sendMessage: actions.sendMessage}),withAuthRedirect)(Dialogs)