import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './examples/DesignCode';
import App from './examples/Heroes';
// import App from './examples/Features';


import './index.css';
import 'bear-react-grid/dist/index.css';
import 'bear-react-carousel/dist/index.css';
import gridTheme from '@/config/gridTheme';
import {GridThemeProvider} from 'bear-react-grid';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    // <React.StrictMode>
    <GridThemeProvider gridTheme={gridTheme}>
        <App />
    </GridThemeProvider>
    // </React.StrictMode>,
);
