/* eslint-disable no-template-curly-in-string */


export default {
    /** -----------------------------------------
     |                    共用                   |
     /** ---------------------------------------*/
    'common.loadData': 'データのロード',
    'common.howToUse': '使用方法',

    'menu.feature': '機能',
    'menu.example': '例',

    /** -----------------------------------------
     |                    頁面                    |
     /** ---------------------------------------*/

    // Page About
    'page.about.title': '約',
    'page.about.desc': `これは,React + Flexbox（Reactへの非jsセカンダリ開発パッケージ）を使用して直接開発されたカルーセルです。<br/>
    必要な機能のみを含め,使用法を複雑にしたり,その他の奇妙な問題を引き起こしたりする可能性のあるクールな効果は多すぎないようにします。`,
    'page.about.feature.title': '機能',
    'page.about.feature.desc1': 'Reactへの二次開発ではjavascriptではなく,React + Flexboxを直接使用します',
    'page.about.feature.desc2': '使いやすい',
    'page.about.feature.desc3': 'Web,モバイルの両方をサポート',
    'page.about.feature.desc4': 'レスポンシブ設定パラメーター',
    'page.about.feature.desc5': 'ナビゲーションボタンは,単純な使用状況でオーバーフローの影響を受けることなく,カルーセル領域から直接移動できます',
    'page.about.feature.desc6': 'カルーセルアイテムにinlineStyleを追加する代わりにFlexboxを使用する',
    'page.about.feature.desc7': 'カルーセルアイテムのキーによる再レンダリングを回避する回数',
    'page.about.feature.desc8': '画像データが非同期で読み込まれる場合,BearCarouselにcomponentDidMountがあり,画像は読み込まれているが表示されていないため,表示されません。追加の処理が必要です。 ',
    'page.about.feature.desc9': 'プロジェクトのスタイルを設定する必要はありません。BearCarouselはプロジェクトのコンポーネントを直接提供します。画像のURLを設定して配列を作成し,それを配置するだけです。データパラメータ。 ',
    'page.about.feature.desc10': 'カルーセルのサイズ,外部コンテナーの高さは基準であり,アイテムコンテナーは外部コンテナーのサイズに従います',
    'page.about.feature.desc11': 'プロジェクトスケール設定または固定高さ設定を提供します',
    //'page.about.feature.desc12 ':'遅延読み込みモードは次のページの前に読み込まれるため,読み込み前にユーザーに空白の画面が表示されないため,エクスペリエンスが低下します ',

    // Page advices
    'page.advices.title': 'アドバイス',
    'page.advices.desc': '使用する前に推奨事項をお読みください。ベアカルーセルをより簡単に使用できるようになります',
    'page.advices.item.desc1': 'カルーセルにクリックリンクを追加する場合は,スライド機能によって開くことがトリガーされ,エクスペリエンスが低下するため,追加のボタンを使用することをお勧めします',
    'page.advices.item.desc2': '自動幅モードを使用する場合は,固定の高さを設定する必要があります。 Bear CarouselのSlideItemは,imgタグを使用して画像の幅を自動化します。その他の場合は,必要に応じて同じ比率または固定の高さを使用することを選択できます。',
    'page.advices.item.desc3': 'ベアカルーセルはコンテンツの高さモード（例:テキストアナウンスライトボックス）を提供しません。使い勝手が悪いため,高さを修正してスクロールするだけで,ライトボックスロックが必要になります。バックグラウンド',

    // Page Installation
    'page.installation.title': 'インストール',
    'page.installation.desc': 'BearCarouselをプロジェクトに含める/インポートする方法にはいくつかのオプションがあります:',
    'page.installation.inYourIndex': '必要なスタイルファイルをプロジェクトのエントリポイントに追加します',
    'page.installation.fastUse': '高速使用',

    // Page lifeCycle
    'page.lifeCycle.title': '生命週期',

    // Page cssClassName
    'page.cssClassName.title': 'CSS Class Name',

    // Page Props Try
    'page.propsTry.title': '小道具の試用',
    'page.propsTry.desc': '使用可能なすべての受信パラメーターを使用すると,結果をテストおよびプレビューできます',//ページの小道具

    // Page Feature / Static Height
    'page.feature.staticHeight.title': '静的高さ',
    'page.feature.staticHeight.desc': '固定高さモードを使用してカルーセルブロックの高さを固定すると,子レイヤーは親レイヤーと同じ高さになります',

    // Page Feature / Aspect Ratio Height
    'page.feature.aspectRatioHeight.title': 'アスペクト比の高さ',
    'page.feature.aspectRatioHeight.desc': '比例高さモードを使用して,カルーセルコンテンツがクリップされないようにします。幅が変更されると,高さが調整され,子レイヤーは親レイヤーと同じ高さになります。',

    // Page Feature / Centered
    'page.feature.centered.title': '中央揃え',
    'page.feature.centered.desc': '中央位置に関する移動アイテム',
    'page.feature.centered.importantNote': 'slidesPerGroupの数は単数でなければならないことに注意してください。表示効果が気になる場合は,slideItemDataを計算してスライスし, ',

    // Page Feature / Auto Width
    'page.feature.autoWidth.title': '自動幅',
    'page.feature.autoWidth.desc': '画像自体の幅に応じて表示',
    'page.feature.autoWidth.importantNote': '自動幅は固定の高さで使用する必要があります',

    // Page Feature / Responsive
    'page.feature.responsive.title': 'レスポンシブ',
    'page.feature.responsive.desc': 'レスポンシブサイズに応じて設定を表示',
    'page.feature.responsive.importantNote': 'ブレークポイントにない設定はデフォルト設定であり,ブレークポイントはオーバーライド設定ですが,ブレークポイントの大きいサイズの設定には小さいサイズの設定は含まれません',

    // Page Example / Vip level list
    'page.example.vipLevelList.title': 'Vipレベルカードリスト',
    'page.example.vipLevelList.desc': 'マルチカードとコントロールページ',

    // Page Example / Auto Play Progress
    'page.example.autoPlayProgress.title': 'Autoplay Progress',
    'page.example.autoPlayProgress.desc': '中央位置に関して移動されたアイテム',

    // Page Example / Text Animation
    'page.example.textAnimations.title': 'テキストアニメーション',
    'page.example.textAnimations.desc': 'スワイプ終了時のテキスト表示効果',
};
