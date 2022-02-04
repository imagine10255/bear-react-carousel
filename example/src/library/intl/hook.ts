import {useIntl} from 'react-intl';
import {useContext} from 'react';
import {LocaleContext} from './LocaleProvider/context';


export const useLocale = () => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();
    return {
        i18n: (id: string, options?: {defaultMessage?: string, params?: any}) => {
            return formatMessage({id, defaultMessage: options?.defaultMessage}, options?.params);
        },
        locale,
        setLocale,
    };
};
