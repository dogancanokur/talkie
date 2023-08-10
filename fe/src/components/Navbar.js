import React from 'react';
import LanguageSelector from "./LanguageSelector";
import {Link} from "react-router-dom";
import {withTranslation} from "react-i18next";
import {connect} from "react-redux";

class Navbar extends React.Component {
    onClickLogout = () => {
        const action = {
            type: 'logout-success'
        }
        this.props.dispatch(action);
    }

    render() {
        const {t, username, isLoggedIn} = this.props;

        let links = (<ul className={'nav nav-pills'}>
            <li className="nav-item">
                <Link to={'/'} className="nav-link" aria-current="page">{t('home-page')}</Link></li>
            <li className="nav-item">
                <Link to={'/signup'} className="nav-link">{t('signup')}</Link>
            </li>
            <li className="nav-item">
                <Link to={'/login'} className="nav-link">{t('login')}</Link>
            </li>
        </ul>);

        if (isLoggedIn) {
            links = (<ul className={'nav nav-pills'}>
                <li className="nav-item">
                    <Link to={`/user/${username}`} className="nav-link">{username}</Link>
                </li>
                <li className="nav-link" style={{cursor: "pointer"}} onClick={this.onClickLogout}>
                    {t('logout')}
                </li>
            </ul>)
        }

        return (<nav className="navbar navbar-expand-lg shadow-sm bg-body-tertiary">
            <div className="container-fluid">
                <Link to={'/'}
                      className={'d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none'}>
                    <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" width={70}/>
                </Link>
                <div className={'collapse justify-content-end navbar-collapse'} id="navbarNavDropdown">
                    {links}
                    <LanguageSelector/>
                </div>
            </div>
        </nav>);


    }
}

const NavbarWithTranslation = withTranslation()(Navbar);
const mapStateToProps = (stateInStore) => {
    return {
        // ...stateInStore
        isLoggedIn: stateInStore.isLoggedIn,
        username: stateInStore.username
    }
}
export default connect(mapStateToProps)(NavbarWithTranslation);