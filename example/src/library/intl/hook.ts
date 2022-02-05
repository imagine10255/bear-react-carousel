import {useIntl} from 'react-intl';
import {useCallback, useContext} from 'react';
import {LocaleContext} from './LocaleProvider/context';


export const useLocale = () => {
    const {locale, setLocale} = useContext(LocaleContext);
    const {formatMessage} = useIntl();

    const i18n = useCallback((id: string, options?: {defaultMessage?: string, params?: any}) => {
        return formatMessage({id, defaultMessage: options?.defaultMessage}, options?.params);
    }, [locale]);

    return {
        i18n,
        locale,
        setLocale,
    };
};
