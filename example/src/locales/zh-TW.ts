/* eslint-disable no-template-curly-in-string */

export default {
    /** -----------------------------------------
     |                系統錯誤訊息                  |
     /** ---------------------------------------*/
    'errorHttp.400': '請求的參數錯誤',
    'errorHttp.401': '請先登錄,然後繼續',
    'errorHttp.404': '找不到請求/路由',
    'errorHttp.413': '發送的請求/文件超出服務器限制大小',
    'errorHttp.500': '內部服務器錯誤',
    'errorHttp.503': '系統維護中',
    'errorHttp.504': '請檢查您的網絡,然後重試',
    'errorHttp.511': '地區無法提供服務',
    'errorHttp.CLIENT_ERROR': '任何非特定的400系列錯誤',
    'errorHttp.SERVER_ERROR': '任何500系列錯誤',
    'errorHttp.TIMEOUT_ERROR': '服務器的響應時間超過{sec}秒。請確認您的網絡連接狀態或聯繫客戶服務',
    'errorHttp.CONNECTION_ERROR': '服務器不可用,錯誤的dns',
    'errorHttp.NETWORK_ERROR': '您的移動網絡連接不穩定。請檢查您的網絡連接狀態,然後重試。 ',
    'errorHttp.CANCEL_ERROR': '請求已被取消。只有在配置中提供`cancelToken`時才有可能,請參見axios`Cancellation`',




    /** -----------------------------------------
     |                表單錯誤訊息                  |
     /** ---------------------------------------*/
    'errorForm.require': '{name}不在必填項之間',
    'errorForm.tooShortString': '不小於{length}',
    'errorForm.tooLongString': '不大於{length}',
    'errorForm.tooShortNumber': '不小於{length}',
    'errorForm.tooLongNumber': '不大於{length}',
    'errorForm.tooRange': '{name}必須在{min}-{max}之間',
    'errorForm.invalid': '請匹配{name}的正確格式',




    /** -----------------------------------------
     |                共用名詞                    |
     /** ---------------------------------------*/
    'common.status.enable': '啟用',
    'common.status.disable': '停用',
    'common.select.pleaseSelect': '請選擇',
    'common.form.add': '新增',
    'common.form.delete': '刪除',
    'common.table.search': '搜尋',
    'common.table.reset': '重設',


    /** -----------------------------------------
     |                    元件                    |
     /** ---------------------------------------*/
    // Calendar
    'com.atom.calendar.month.1': '1月',
    'com.atom.calendar.month.2': '2月',
    'com.atom.calendar.month.3': '3月',
    'com.atom.calendar.month.4': '4月',
    'com.atom.calendar.month.5': '5月',
    'com.atom.calendar.month.6': '6月',
    'com.atom.calendar.month.7': '7月',
    'com.atom.calendar.month.8': '8月',
    'com.atom.calendar.month.9': '9月',
    'com.atom.calendar.month.10': '10月',
    'com.atom.calendar.month.11': '11月',
    'com.atom.calendar.month.12': '12月',
    'com.atom.calendar.weekDay.1': '一',
    'com.atom.calendar.weekDay.2': '二',
    'com.atom.calendar.weekDay.3': '三',
    'com.atom.calendar.weekDay.4': '四',
    'com.atom.calendar.weekDay.5': '五',
    'com.atom.calendar.weekDay.6': '六',
    'com.atom.calendar.weekDay.7': '日',
    'com.atom.calendar.unit.year': '年',
    'com.atom.calendar.pleaseInputYear': '請輸入西元年',
    'com.atom.calendar.setToday': '設定為今天',


    // uiBlock
    'com.atom.uiBlock.loading': '正在加載...',

    // uiDialog
    'com.atom.uiDialog.success': '成功',
    'com.atom.uiDialog.failed': '失敗',
    'com.atom.uiDialog.confirm': '確認',
    'com.atom.uiDialog.ok': '確定',
    'com.atom.uiDialog.cancel': '取消',

    // TimePicker
    'com.atom.timePicker.now': '此刻',
    'com.atom.timePicker.ok': '確認',


    // Table
    'com.atom.table.field.action': '操作',
    'com.atom.table.showPage': '顯示 {start} - {end} 筆, 總共 {totalItem} 筆 / {totalPage} 頁',
    'com.atom.table.page': '{item}筆/頁',
    'com.atom.table.next': '下一頁',
    'com.atom.table.prev': '上一頁',
    'com.atom.table.notFound.title': '沒有符合的資料',
    'com.atom.table.notFound.desc': '選擇不同的過濾條件以查看測試結果',

    // PageHeader
    'com.org.pageHeader.list': '列表',
    'com.org.pageHeader.add': '新增',
    'com.org.pageHeader.edit': '編輯',
    'com.org.pageHeader.view': '檢視',

    // PageSlider
    'com.org.pageSlider.feature': '功能選單',
    'com.org.pageSlider.admin': '管理員選單',

    // FormButton
    'com.form.button.create': '建立',
    'com.form.button.save': '儲存',
    'com.form.button.back': '返回',


    /** -----------------------------------------
     |                    目錄                   |
     /** ---------------------------------------*/
    // Menu
    'menu.dashboard': '儀表板',
    'menu.setting': '網站設定',
    'menu.setting.site': '參數設定',
    'menu.admin.user': '使用者管理',
    'menu.admin.role': '角色管理',
    'menu.admin.role.roleManage': '角色管理',
    'menu.admin.loginHistory': '登入紀錄',
    'menu.admin.profile': '個人',
    'menu.admin.profile.profileManage': '個人管理',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/
    // Page About
    'page.about.title': '關於',
    'page.about.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，<br/>
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得使用很複雜 或是 產生其他奇怪問題`,
    'page.about.achieve.title': '我想達成的目標',
    'page.about.achieve.desc1': '',



};
