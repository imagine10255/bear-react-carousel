import IconSvg, {IIconSvgProps} from '@acrool/react-iconsvg';
import styled from 'styled-components';

import {EIconCode} from './SvgSymbol';


const idPrefix = 'icon_';


interface IProps extends IIconSvgProps {
    code: EIconCode
}

/**
 * Iconfont
 * https://github.com/acrool/acrool-react-iconsvg
 */
const Icon = (props: IProps) => {
    return <ThemeIconSvg
        {...props}
        idPrefix={idPrefix}
        symbolsPath=""
    />;
};

export default Icon;



const ThemeIconSvg = styled(IconSvg)`
`;
