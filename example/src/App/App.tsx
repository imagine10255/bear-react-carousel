import React from 'react';
import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {HashRouter} from 'react-router-dom';
import {GridThemeProvider} from 'bear-react-grid';
import {ToasterPortal} from 'bear-react-toaster';
import gridConfig from 'config/grid';
import theme from 'config/theme';

import {SidebarProvider} from 'provider/SidebarProvider';
import MainRouter from "./MainRouter";


const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <SidebarProvider>
                        <MainRouter/>

                        <ToasterPortal timeout={3000000}/>
                    </SidebarProvider>
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
