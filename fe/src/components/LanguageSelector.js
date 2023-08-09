import React from 'react';
import {axiosChangeLanguage} from "../apiCalls";
import {withTranslation} from "react-i18next";
import {Link} from "react-router-dom";

const LanguageSelector = (props) => {

    const onChangeLanguage = (language) => {
        const {i18n} = props;
        i18n.changeLanguage(language);
        axiosChangeLanguage(language);
    }
    return (<ul className="nav nav-pills">
        <li><Link className="dropdown-item" to={'#'}>
            <img onClick={() => onChangeLanguage('tr')}
                 style={{
                     cursor: 'pointer', filter: (props.i18n.language === 'tr' && 'drop-shadow(2px 4px 6px black)')
                 }}
                 src="https://flagsapi.com/TR/shiny/32.png"
                 alt="Flag of Turkiye"/></Link>
        </li>
        <li><Link className="dropdown-item" to={'#'}>
            <img onClick={() => onChangeLanguage('en')}
                 style={{
                     cursor: 'pointer', filter: props.i18n.language === 'en' && 'drop-shadow(2px 4px 6px black)'
                 }}
                 src="https://flagsapi.com/GB/shiny/32.png"
                 alt="Flag of UK"/>
        </Link></li>
    </ul>);
};
export default withTranslation()(LanguageSelector);
