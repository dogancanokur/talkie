import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'username': 'Username',
                'displayName': 'Display Name',
                'signup': 'Sign Up',
                'signup.header': 'Sign Up',
                'signup.password': 'Password',
                'signup.repeatPassword': 'Repeat Password',
                'signup.warning.passwordMismatch': 'Password mismatch',
                'login': 'Login',
                'home-page': 'Home Page',
                'logout': 'Logout',
                'we can edit': 'We can edit',
                'we cannot edit': 'We cannot edit'
            }
        },
        tr: {
            translations: {
                'username': 'Kullancı Adı',
                'displayName': 'Görünen İsim',
                'signup': 'Kayıt Ol',
                'signup.header': 'Kayıt Ol',
                'signup.password': 'Şifre',
                'signup.repeatPassword': 'Şifre Tekrarı',
                'signup.warning.passwordMismatch': 'Şifreler eşleşmedi.',
                'login': 'Giriş Yap',
                'home-page': 'Ana Sayfa',
                'logout': 'Çıkış',
                'we can edit': 'Düzenleyebiliriz',
                'we cannot edit': 'Düzenleyemeyiz'
            }
        }
    },
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: "en",
    defaultNS: 'translations',
    ns: ['translations'],
    keySeparator: false,
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        formatSeparator: ','
    }
});

export default i18n;