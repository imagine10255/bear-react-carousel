import {useIntl} from 'react-intl';


export const useI18n = () => {
    const {formatMessage, locale} = useIntl();
    return {
        i18n: (id: string, defaultMessage?: string, params?: any) => {
            return formatMessage({id, defaultMessage}, params);
        },
        locale,
    };
};
