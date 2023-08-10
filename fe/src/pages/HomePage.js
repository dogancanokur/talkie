import React from 'react';
import {withTranslation} from "react-i18next";

function HomePage(props) {
    const {t} = props;
    return (
        <div>{t('HomePage')}</div>
    );
}

export default withTranslation()(HomePage);