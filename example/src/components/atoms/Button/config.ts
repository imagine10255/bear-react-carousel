import {media} from '@acrool/react-grid';
import {css} from 'styled-components';

import {TLabelSize, TThemeColor} from './types';


export const getSize = (size?: TLabelSize) => {
    switch (size) {
    case 'xs':
        return css`
                --button-font-size: 14px;
                --button-font-weight: 400;
                --button-height: 30px;
                --button-padding: 0 16px;

                ${media.md`
                    --button-font-size: 12px;
                    --button-font-weight: 500;
                    --button-height: 25px;
                    --button-padding: 0 8px;
                `}
            `;
    case 'sm':
        return css`
                --button-font-size: 0.875rem;
                --button-font-weight: 400;
                //--button-height: 21px;
                --button-height: var(--form-comp-height);
                --button-padding: 0.25rem 0.5rem;
            `;
    case 'md':
        return css`
                --button-font-size: 0.875rem;
                --button-font-weight: 400;
                --button-padding: 0.48rem 0.5rem;
            `;
    case 'lg':
        return css`
                --button-font-size: 1rem;
                --button-font-weight: 500;
                --button-height: 48px;
                --button-padding: 0.5rem 1rem;
            `;
    }


};


export const getThemeColor = (themeColor?: TThemeColor) => {
    switch (themeColor) {
    case 'primary':
        return css`
          --button-bg-color: var(--primary-color, #0d5ad3);
          --button-bg-hover-color: #005bea;
          --button-bg-image: radial-gradient(50% 62.62% at 50% 0%, var(--button-bg-color) 0%, #005bea 100%);
          --button-bg-hover-image: radial-gradient(50% 62.62% at 50% 0%, #297cff 0%, rgba(0, 91, 234, 0.8) 100%);

          --button-border-color: var(--button-bg-color);
          --button-text-color: #fff;
        `;

    case 'success':
        return css`
            --button-bg-color: rgb(35, 134, 54);
            --button-bg-hover-color: rgb(57, 159, 79);
            --button-bg-image: linear-gradient(to top, var(--button-bg-color) 0%, rgb(75, 192, 97) 100%);
            --button-bg-hover-image: radial-gradient(50% 62.62% at 50% 0%, rgb(62, 156, 80) 0%, #3e9c50 100%);
            --button-border-color: var(--button-bg-color);
            --button-text-color: #fff;
        `;

    case 'warning':
        return css`
          --button-bg-color: var(--warning-color, rgba(218, 199, 82, 0.8));
          --button-bg-hover-color: var(--warning-color, rgba(197, 183, 70, 0.8));
          --button-bg-image: linear-gradient(to top, var(--warning-color) 0%, rgba(246, 229, 106, 0.8) 100%);
          --button-bg-hover-image: radial-gradient(50% 62.62% at 50% 0%, rgba(246, 229, 106, 0.8) 0%, rgb(187, 172, 67) 100%);
          --button-border-color: var(--button-bg-color);
          --button-text-color: #fff;
        `;
    case 'danger':
        return css`
            --button-bg-color: rgb(248, 81, 73);
            --button-bg-hover-color: rgb(196, 45, 37);
            --button-bg-image: linear-gradient(to top, #f43b47 0%, rgb(248, 81, 73) 100%);;
            --button-border-color: var(--button-bg-color);
            --button-text-color: #fff;
        `;

    case 'grayDanger':
        return css`
            --button-bg-color: #343A40FF;
            --button-bg-hover-color: #343A40FF;
            --button-bg-image: linear-gradient(to top, #343A40FF 0%, #4e5557 100%);;
            --button-border-color: var(--button-bg-color);
            --button-text-color: rgb(248, 81, 73);
        `;

    case 'info':
        return css`
            --button-bg-color: #2185d0;
            --button-bg-hover-color: #5099d0;
            --button-bg-image: linear-gradient(to top, var(--button-bg-color) 0%, #1f78bb 100%);
            --button-border-color: var(--button-bg-color);
            --button-text-color: #fff;
        `;

    case 'gray':
        return css`
            --button-bg-color: rgba(96, 103, 110, 0.36);
            --button-bg-hover-color: #343A40FF;
            --button-bg-image: linear-gradient(to top, var(--button-bg-color) 0%, #686a6c 100%);
            --button-bg-hover-image: radial-gradient(50% 62.62% at 50% 0%, #898b8d 0%, #686a6c 100%);
            --button-border-color: #343A40FF;
            --button-text-color: #d2cfcf;
        `;

    case 'dark':
        return css`
            --button-bg-color: rgb(80, 80, 80);
            --button-bg-image: radial-gradient(50% 62.62% at 50% 0%, var(--button-bg-color) 0%, rgb(51, 51, 51) 100%);
            --button-bg-hover-image: radial-gradient(50% 62.62% at 50% 0%, var(--button-bg-color) 0%, rgba(51, 51, 51, 0.8) 100%);
            --button-border-color: transparent;
            --button-text-color: #cccccc;
        `;
    }

    return css`
        --button-bg-color: transparent;
        --button-bg-hover-color: transparent;
        --button-bg-image: transparent;
        --button-border-color: none;
        --button-text-color: inherit;

    `;
};
