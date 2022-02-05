export interface AppTheme {
    primaryColor: string,
    dangerColor: string,
    layout: {
        navbarZIndex: number,
        footerZIndex: number,

        sidebarWidth: number,
        sidebarZIndex: number,
    }
}

const theme: AppTheme = {

    primaryColor: '#09d3ac',
    dangerColor: '#EF4444',
    layout: {
        navbarZIndex: 14,
        footerZIndex: 14,

        sidebarWidth: 300,
        sidebarZIndex: 12,
    }
};

export default theme;
