import React from 'react';
import { addMessageActionCreator} from "../../../redux/dialogs-reducer"
import Dialogs from "../Dialogs";
import {connect} from "react-redux";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {AppStateType} from "../../../redux/redux-store";

let mapStateToProps = (state: AppStateType) => {
    return {
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages
    };
};
let mapDispatchToProps = (dispatch: any) => {
    return {
        sendMessage: (newMessageBody: string) => {
            dispatch(addMessageActionCreator(newMessageBody));
        }
    };
};

let AuthRedirectComponent = withAuthRedirect(Dialogs);

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;

//export default compose(connect(mapStateToProps, mapDispatchToProps),withAuthRedirect)(DialogsContainer)