import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';

import './index.css';
import 'bear-react-grid/dist/index.css';
import 'bear-react-carousel/dist/index.css';
import 'bear-react-toaster/dist/index.css';


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(<App />);
