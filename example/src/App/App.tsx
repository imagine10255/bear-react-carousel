import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {AutoScrollTop} from 'library/react-router';
import {GridThemeProvider} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme from 'config/theme';

import HomeRoot from '../views/HomeRoot';
import {HashRouter} from 'react-router-dom';
import {SidebarProvider} from 'provider/SidebarProvider';
import React from 'react';
import { LanguageProvider, translationMessages } from 'library/intl'

const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <LanguageProvider messages={translationMessages}>

                    <HashRouter>
                        <SidebarProvider>
                            <HomeRoot/>

                            <AutoScrollTop/>
                        </SidebarProvider>
                    </HashRouter>
                </LanguageProvider>
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
