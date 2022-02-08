import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {Container, GridThemeProvider} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme from 'config/theme';
import {HashRouter, Route, Switch} from 'react-router-dom';

import React from 'react';
import PropsTry from '../views/PropsTry';
import VipLevelList from '../views/Example/VipLevelList';
import TextAnimations from '../views/Example/TextAnimations';
import BaseUsed from '../views/BaseUsed';
import AutoPlayProgress from 'views/Example/AutoPlayProgress';


const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <Container>
                    <HashRouter>
                        <Switch>
                            <Route path="/base-used" children={<BaseUsed/>} exact/>
                            <Route path="/vip-level-list" children={<VipLevelList/>} exact/>
                            <Route path="/auto-play-progress" children={<AutoPlayProgress/>} exact/>
                            <Route path="/text-animations" children={<TextAnimations/>} exact/>
                            <Route path="/" children={<PropsTry/>} exact/>
                        </Switch>
                    </HashRouter>

                </Container>



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
