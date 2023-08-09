import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {Authentication} from "../shared/AuthenticationContext"
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

class ProfileCardContextWrapper extends Component {
    static contextType = Authentication;

    render() {
        return (<div><ProfileCard {...this.props} username={this.context.state.username}/></div>);
    }
}

export default withTranslation()(withRouter(ProfileCardContextWrapper));