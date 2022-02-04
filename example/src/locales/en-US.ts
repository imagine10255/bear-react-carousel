/* eslint-disable no-template-curly-in-string */


export default {
    /** -----------------------------------------
    |                系統錯誤訊息                  |
    /** ---------------------------------------*/
    'errorHttp.400': 'The requested parameter is wrong',
    'errorHttp.401': 'Please login before continuing',
    'errorHttp.404': 'Request Not Found/Route',
    'errorHttp.413': 'The request/file sent exceeds the server limit size',
    'errorHttp.500': 'Internal Server Error',
    'errorHttp.503': 'System under maintenance',
    'errorHttp.504': 'Please check your network and try again',
    'errorHttp.511': 'Area not available',
    'errorHttp.CLIENT_ERROR': 'Any non-specific 400 series error',
    'errorHttp.SERVER_ERROR': 'Any 500 series error',
    'errorHttp.TIMEOUT_ERROR': 'The server has not responded for more than {sec} seconds. Please confirm your network connection status or contact customer service',
    'errorHttp.CONNECTION_ERROR': 'Server not available, bad dns',
    'errorHttp.NETWORK_ERROR': 'Your mobile network connection is unstable. Please check your network connection status and try again.',
    'errorHttp.CANCEL_ERROR': 'Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`',




    /** -----------------------------------------
    |                表單錯誤訊息                  |
    /** ---------------------------------------*/
    'errorForm.require': 'The {name} not be between required',
    'errorForm.tooShortString': 'Not less than {length}',
    'errorForm.tooLongString': 'Not greater than {length}',
    'errorForm.tooShortNumber': 'Not less than {length}',
    'errorForm.tooLongNumber': 'Not greater than {length}',
    'errorForm.tooRange': 'The {name} must be between {min}-{max}',
    'errorForm.invalid': 'Please match the correct format of the {name}',



    /** -----------------------------------------
     |                共用名詞                    |
     /** ---------------------------------------*/
    'common.status.enable': 'Enable',
    'common.status.disable': 'Disable',
    'common.select.pleaseSelect': 'Please Select',
    'common.form.add': 'Add',
    'common.form.delete': 'Delete',
    'common.table.search': 'Search',
    'common.table.reset': 'Reset',


    /** -----------------------------------------
    |                    元件                    |
     /** ---------------------------------------*/
    // Calendar
    'com.atom.calendar.month.1': 'January',
    'com.atom.calendar.month.2': 'February',
    'com.atom.calendar.month.3': 'March',
    'com.atom.calendar.month.4': 'April',
    'com.atom.calendar.month.5': 'May',
    'com.atom.calendar.month.6': 'June',
    'com.atom.calendar.month.7': 'July',
    'com.atom.calendar.month.8': 'August',
    'com.atom.calendar.month.9': 'September',
    'com.atom.calendar.month.10': 'October',
    'com.atom.calendar.month.11': 'November',
    'com.atom.calendar.month.12': 'December',
    'com.atom.calendar.weekDay.1': 'Mo',
    'com.atom.calendar.weekDay.2': 'Tu',
    'com.atom.calendar.weekDay.3': 'We',
    'com.atom.calendar.weekDay.4': 'Th',
    'com.atom.calendar.weekDay.5': 'Fr',
    'com.atom.calendar.weekDay.6': 'Sa',
    'com.atom.calendar.weekDay.7': 'Su',
    'com.atom.calendar.unit.year': ' ',
    'com.atom.calendar.pleaseInputYear': 'Please enter the first year',
    'com.atom.calendar.setToday': 'Set to today',

    // uiBlock
    'com.uiBlock.loading': 'loading...',

    // uiDialog
    'com.uiDialog.success': 'SUCCESS',
    'com.uiDialog.failed': 'FAILED',
    'com.uiDialog.confirm': 'CONFIRM',
    'com.uiDialog.ok': 'OK',
    'com.uiDialog.cancel': 'Cancel',

    // TimePicker
    'com.timePicker.now': 'Now',
    'com.timePicker.ok': 'OK',

    // Table
    'com.atom.table.field.action': 'Action',
    'com.atom.table.showPage': 'Show {start} - {end} item, Total {totalItem} item / {totalPage} Page',
    'com.atom.table.page': '{item}/Page',
    'com.atom.table.next': 'Next',
    'com.atom.table.prev': 'Prev',
    'com.atom.table.notFound.title': 'Not Found',
    'com.atom.table.notFound.desc': 'Choose a different filter to view test results to you',

    // PageHeader
    'com.org.pageHeader.list': 'List',
    'com.org.pageHeader.edit': 'Edit',
    'com.org.pageHeader.view': 'View',

    // PageSlider
    'com.org.pageSlider.feature': 'Feature',
    'com.org.pageSlider.admin': 'Admin',

    // FormButton
    'com.form.button.create': 'Create',
    'com.form.button.save': 'Save',
    'com.form.button.back': 'Back',


    /** -----------------------------------------
     |                    目錄                   |
     /** ---------------------------------------*/
    // Menu
    'menu.dashboard': 'Dashboard',
    'menu.setting': 'Site Setting',
    'menu.setting.site': 'Site Params',
    'menu.admin': 'Admin',
    'menu.admin.user': 'Admin User',
    'menu.admin.role': 'Admin Role',
    'menu.admin.role.roleManage': 'Admin Role Manage',
    'menu.admin.loginHistory': 'Admin Login History',
    'menu.admin.profile': 'Profile',
    'menu.admin.profile.profileManage': 'Profile Manage',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/

    // Page About
    'page.about.title': 'About',
    'page.about.desc': `This is a carousel developed directly using React + Flexbox,<br/>
    and only include the features you need, not too many cool effects that might complicate your usage or create other weird issues.`
};
