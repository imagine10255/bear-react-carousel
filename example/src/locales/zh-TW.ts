/* eslint-disable no-template-curly-in-string */

export default {
    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/
    // Page About
    'page.about.title': '關於',
    'page.about.desc': `Bear Carousel 是一個直接使用React + Flexbox開發的輪播套件 (非js二次開發包成React)，<br/>
     並且只包含你需要的功能，沒有太多很酷的效果，因為那些可能會讓你變得不容易使用並且產生其他奇怪的問題`,
    'page.about.feature.title': '特性',
    'page.about.feature.desc1': '直接由 React+Flexbox, 非JS二次開發在React中註冊',
    'page.about.feature.desc2': '更簡單的使用方式',
    'page.about.feature.desc3': '支援行動裝置與電腦版網頁',
    'page.about.feature.desc4': '依響應式設定參數',
    'page.about.feature.desc5': '導航按鈕 在簡單的使用情境下, 可直接移出輪播區域外, 不受 overflow 影響',
    'page.about.feature.desc6': '使用Flexbox, 而不是在輪播項目中加上 inlineStyle',
    'page.about.feature.desc7': '在輪播項目中透過 key 來避免重新渲染的次數',
    'page.about.feature.desc8': '圖片資料為非同步加載時, 不會因為 Bear Carousel 已經 componentDidMount, 而圖片已加載完成卻不顯示, 需要額外處理',
    'page.about.feature.desc9': '不需要額外設定項目的樣式, Bear Carousel 直接提供給你項目的元件, 只需要設定圖片網址並組成陣列, 放到 data 參數裡即可',
    'page.about.feature.desc10': '輪播的大小, 以外容器高度為主, 項目容器跟隨外容器大小, 可避免非同步載入時 的瞬間有高度而產生的畫面跳動造成不好的視覺體驗',
    'page.about.feature.desc11': '提供項目比例設定或是固定高度的設定',
    // 'page.about.feature.desc12': '懶加載模式會在下一頁之前先載入, 避免讓使用者看到未載入前空白畫面, 造成不好的體驗',

    // Page About
    'page.advices.title': '建議',
    'page.advices.desc': '使用前請先看完建議事項, 這樣能夠幫助你更容易使用 Bear Carousel',
    'page.advices.item.desc1': '如果你想在輪播圖上面加上點擊連結, 建議使用額外的按鈕, 因為滑動功能會觸發開啟, 導致體驗會很糟糕',
    'page.advices.item.desc2': '如果你想使用自動寬度模式, 你需要設定固定高度, Bear Carousel 的 SlideItem 會使用 img 標籤讓圖片寬度自動, 其他情況你可以根據需要自己選擇使用等比例或是固定高度',
    'page.advices.item.desc3': 'Bear Carousel 沒有提供內容高度 自動撐開內容的模式(ex: 文字公告光箱), 因為並不好用, 你只需要固定高度與捲軸, 光箱鎖背景',


};
