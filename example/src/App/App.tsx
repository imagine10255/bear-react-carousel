import {createGlobalStyle, ThemeProvider} from 'styled-components/macro';
import {Container, GridThemeProvider} from 'bear-styled-grid';
import gridConfig from 'config/grid';
import theme from 'config/theme';

import React from 'react';
import PropsTry from '../views/PropsTry';
import VipLevelList from '../views/Example/VipLevelList';
import TextAnimations from '../views/Example/TextAnimations';
import BaseUsed from '../views/BaseUsed';

const switchControl: string = 'propsType';

const App = () => {
    return (
        <GridThemeProvider gridTheme={gridConfig}>
            <ThemeProvider theme={theme}>
                <Container>
                    {switchControl === 'baseUsed' && <BaseUsed/>}
                    {switchControl === 'propsType' && <PropsTry/>}
                    {switchControl === 'vipLevelList' && <VipLevelList/>}
                    {switchControl === 'textAnimations' && <TextAnimations/>}
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
