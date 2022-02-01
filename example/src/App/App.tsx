import styled, {createGlobalStyle, DefaultTheme, ThemeProvider} from 'styled-components/macro';
import {AutoScrollTop} from 'library/react-router';
import {GridThemeProvider, media} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme, {AppTheme} from 'config/theme';

import HomeRoot from '../views/HomeRoot';
import {BrowserRouter, HashRouter} from 'react-router-dom';

const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <HashRouter>
                    <HomeRoot/>

                    <AutoScrollTop/>

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
