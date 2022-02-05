import {ReactNode} from 'react';
import CSS from 'csstype';

declare global {
    /*~ Here, declare things that go in the global namespace, or augment
     *~ existing declarations in the global namespace
     */
    interface Window {
        ActiveXObject: string
        i18n: TFormatMessage,
    }
    interface FCProps {
        style?: CSS.Properties,
        className?: string,
    }

    interface FCChildrenProps extends FCProps{
        children?: ReactNode,
    }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export {};
