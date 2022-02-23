import React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {GridThemeProvider} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme from 'config/theme';
import {HashRouter, Route, Switch} from 'react-router-dom';

import HomeRoot from '../views/HomeRoot';
import {SidebarProvider} from 'provider/SidebarProvider';
import {ToasterPortal} from 'bear-react-toaster';

const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <SidebarProvider>
                        <HomeRoot/>
                    </SidebarProvider>
                    <ToasterPortal/>
                </HashRouter>
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
