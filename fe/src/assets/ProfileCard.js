import React from 'react';
import {withRouter} from 'react-router-dom';

const ProfileCard = (props) => {
    const pathUsername = props.match.params.username;
    const loggedInUsername = props.username;
    let message = "";
    if (pathUsername === loggedInUsername) {
        message = "We can edit.";
    } else {
        message = "We cannot edit.";
    }
    return <div>{message}</div>
}

export default withRouter(ProfileCard);