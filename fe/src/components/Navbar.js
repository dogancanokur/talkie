import React from 'react';
import LanguageSelector from "./LanguageSelector";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";

function Navbar(props) {

    const {t} = props;
    return (<nav className={'container'}>
        <header className={'d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom'}>
            <Link to={'/'}
                  className={'d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'}>
                <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" width={70}/>
            </Link>

            <ul className={'nav nav-pills'}>
                <li className="nav-item">
                    <Link to={'/'} className="nav-link active" aria-current="page">{t('home-page')}</Link></li>
                <li className="nav-item">
                    <Link to={'/signup'} className="nav-link">{t('signup')}</Link>
                </li>
                <li className="nav-item">
                    <Link to={'/login'} className="nav-link">{t('login')}</Link>
                </li>
            </ul>

            <div className="dropdown text-end">
                <Link to={'/#'} className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                      data-bs-toggle="dropdown" aria-expanded="false">
                    <img
                        src={process.env.PUBLIC_URL + '/no-image.png'}
                        alt="mdo" width="32" height="32"
                        className="rounded-circle"/>
                </Link>
                <ul className="dropdown-menu text-small">
                    <li>
                        <Link className="dropdown-item" to={'/#'}>{t('nothing')}</Link>
                        <Link className="dropdown-item" to={'/#'}>{t('nothing')}</Link>
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li>
                        <LanguageSelector/>
                    </li>
                    <li>
                        <hr className="dropdown-divider"/>
                    </li>
                    <li><Link className="dropdown-item" to={'/sign-out'}>Sign out</Link></li>
                </ul>
            </div>
        </header>
    </nav>);
}

export default withTranslation()(Navbar);