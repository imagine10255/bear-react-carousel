/// <reference types="vite-plugin-pwa/client" />

import {ReactNode} from 'react';
import CSS from 'csstype';
import {ESiteCode, ESiteEnv} from '@/config/types';

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        ActiveXObject: string;
        dataLayer: any[];
        siteCode: ESiteCode;
        siteEnv: ESiteEnv;
        launcher: Launcher;
        pushMessage: (action: string, data: { [key: string]: any }) => void;
    }


    interface FCProps {
        id?: string,
        style?: CSS.Properties,
        className?: string,
    }

    interface FCChildrenProps extends FCProps{
        children?: ReactNode,
    }

    /**
     * 快速顯示 defix 資訊
     * @param title 標題
     * @param data 資料
     */
    function dd(title: string|number, ...data?: any): void;
}


// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {}
