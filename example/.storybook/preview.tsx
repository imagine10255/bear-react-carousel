import './reset.css';
import '@acrool/react-grid/dist/index.css';
import '@acrool/react-carousel/dist/index.css';
import '@acrool/react-img/dist/index.css';
import '@acrool/react-iconsvg/dist/index.css';

import {GridThemeProvider} from '@acrool/react-grid';
import type {Preview} from '@storybook/react';
import {themes} from '@storybook/theming';
import {SvgSymbol} from "../src/library/acrool-react-icon";


const preview: Preview = {
    parameters: {
        darkMode: {
            dark: {...themes.dark, appPreviewBg: '#000'},
            light: {...themes.dark, appPreviewBg: '#fff'}
        },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) => (
            <GridThemeProvider>
                <Story />
                {SvgSymbol}
            </GridThemeProvider>
        ),
    ],
};

export default preview;
