/* eslint-disable */
/*
 *
 * Language global use not component
 * https://github.com/yahoo/react-intl/issues/416
 */

import {PureComponent, Children} from 'react';
import {injectIntl, MessageDescriptor} from 'react-intl';

type TParam = {[key: string]: string|number};
type TFormatMessage = (messageDescriptor: MessageDescriptor, param?: TParam) => any;

export let i18n: TFormatMessage;

class LanguageGlobal extends PureComponent<any> {

    constructor(props: any) {
        super(props);
        i18n = props.intl.formatMessage;
    }
    render() {
        return Children.only(this.props.children);
    }
}

export default injectIntl(LanguageGlobal);
