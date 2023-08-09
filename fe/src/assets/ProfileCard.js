import React from 'react';
import {withRouter} from 'react-router-dom';
import {withTranslation} from "react-i18next";

const ProfileCard = (props) => {

    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message;
    if (pathUsername === loggedInUsername) {
        message = props.t('we can edit');
    } else {
        message = props.t('we cannot edit');
    }
    return <div>{message}</div>
}

export default withTranslation()(withRouter(ProfileCard));