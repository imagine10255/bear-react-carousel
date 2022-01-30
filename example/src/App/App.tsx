import styled from 'styled-components/macro';
import {AutoScrollTop} from 'library/react-router';
import {GridThemeProvider, media} from 'imagine-react-styled-grid';
import gridConfig from 'config/grid';

import HomeRoot from '../views/HomeRoot'
import { BrowserRouter, HashRouter } from 'react-router-dom'

const App = () => {
    return (
      <GridThemeProvider gridTheme={gridConfig}>
        <HashRouter>
              <HomeRoot/>

              <AutoScrollTop/>

        </HashRouter>
      </GridThemeProvider>
    );
};

export default App;




const Console = styled.textarea`
  position: fixed;
  bottom: 0;
  z-index: 99;
  display: flex;
  font-size: 10px;
  border: none;
  background: #1f1f1f;
  color: #ccb444;
  border-radius: 0;
  width: 100%;
  height: 60px;

  ${media.lg`
      display: none;
  `}
`;
