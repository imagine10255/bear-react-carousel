import {IGridSetting} from 'bear-react-grid';


const gridTheme: IGridSetting = {
    spacer: '1rem',
    gutter: '.625rem',
    gridColumns: 24,
    gridBreakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200,
        xxl: 1540,
    },
    containerMaxWidths: {
        sm: 540,
        md: 720,
        lg: 960,
        xl: 1140,
        xxl: 1141,
    },
};

export default gridTheme;
