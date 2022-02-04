import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {AutoScrollTop} from 'library/react-router';
import {GridThemeProvider} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme from 'config/theme';

import HomeRoot from '../views/HomeRoot';
import {HashRouter} from 'react-router-dom';
import {SidebarProvider} from 'provider/SidebarProvider';
import React from 'react';
import { LocaleProvider, translationMessages } from 'library/intl'

const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <LocaleProvider messages={translationMessages}>

                    <HashRouter>
                        <SidebarProvider>
                            <HomeRoot/>

                            <AutoScrollTop/>
                        </SidebarProvider>
                    </HashRouter>
                </LocaleProvider>
                <GlobalStyle/>
            </ThemeProvider>
        </GridThemeProvider>
    );
};

export default App;


const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: ${props => props.theme.primaryColor};
  }
`;
