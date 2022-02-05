/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import {PureComponent, Children} from 'react';
import {injectIntl, IntlShape} from 'react-intl';



interface IProps {
    children: JSX.Element,
    intl: IntlShape,
}

class RegisterGlobal extends PureComponent<IProps> {
    constructor(props: IProps) {
        super(props);
        window.i18n = this.i18n;
    }

    i18n = (id: string, options?: {defaultMessage?: string, params?: any}) => {
        const {formatMessage} = this.props.intl;
        return formatMessage({id, defaultMessage: options?.defaultMessage}, options?.params);
    };

    render() {
        return Children.only(this.props.children);
    }
}

export default injectIntl(RegisterGlobal);
