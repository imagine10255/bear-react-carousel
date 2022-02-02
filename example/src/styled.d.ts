import 'styled-components/marco';
import {AppTheme} from './config/theme';

declare module 'styled-components/macro' {

  export interface DefaultTheme extends AppTheme{}
}
