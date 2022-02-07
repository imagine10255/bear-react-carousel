import packageInfo from '../../package.json';


/**
 * 取得版本號
 */
export function getAppVersion(): string{
    return packageInfo.version;
}



/**
 * 取得前端資源網址
 */
export function asset(path?: string): string{
    if(path){
        // 去除參數第一個斜線
        return `${process.env.PUBLIC_URL}/static/${path.replace(/^\//, '')}`;
    }
    return '';
}


