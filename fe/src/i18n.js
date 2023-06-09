import i18n from "i18next";
import {initReactI18next} from "react-i18next";

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translations: {
                'signup.username': 'Username',
                'signup.displayName': 'Display Name',
                'signup.submit': 'Sign Up',
                'signup.header': 'Sign Up',
                'signup.password': 'Password',
                'signup.repeatPassword': 'Repeat Password',
                'signup.warning.passwordMismatch': 'Password mismatch',
                'login': 'Login',
            }
        },
        tr: {
            translations: {
                'signup.username': 'Kullancı Adı',
                'signup.displayName': 'Görünen İsim',
                'signup.submit': 'Kayıt Ol',
                'signup.header': 'Kayıt Ol',
                'signup.password': 'Şifre',
                'signup.repeatPassword': 'Şifre Tekrarı',
                'signup.warning.passwordMismatch': 'Şifreler eşleşmedi.',
                'login': 'Giriş Yap'
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