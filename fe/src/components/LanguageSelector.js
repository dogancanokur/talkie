import React from 'react';
import {axiosChangeLanguage} from "../apiCalls";
import {withTranslation} from "react-i18next";

const LanguageSelector = (props) => {

    const onChangeLanguage = (language) => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        axiosChangeLanguage(language);
    }
    return (<div>
        <ul>
            <li className="list-group-item">
                <img onClick={() => onChangeLanguage('tr')}
                     style={{
                         cursor: 'pointer', filter: props.i18n.language === 'tr' && 'drop-shadow(2px 4px 6px black)'
                     }}
                     src="https://flagsapi.com/TR/shiny/32.png"
                     alt="Flag of Turkiye"/></li>
            <li className="list-group-item">
                <img onClick={() => onChangeLanguage('en')}
                     style={{
                         cursor: 'pointer', filter: props.i18n.language === 'en' && 'drop-shadow(2px 4px 6px black)'
                     }}
                     src="https://flagsapi.com/GB/shiny/32.png"
                     alt="Flag of UK"/></li>
        </ul>
    </div>);
};
export default withTranslation()(LanguageSelector);
