import elClassName from '../el-class-name';
import {CloneIcon} from '../Icon';
import * as React from 'react';
import {forwardRef} from 'react';
import {booleanToDataAttr} from '../utils';


interface IProps {
    element: React.ReactNode,
    index: number,
    actualIndex: number
    matchIndex: number
    sourceIndex: number
    inPage: number
    isActive: boolean
    isClone: boolean
    isDebug: boolean
}

const SlideItem = forwardRef<HTMLInputElement, IProps>(({
    element,
    index,
    actualIndex,
    matchIndex,
    sourceIndex,
    inPage,
    isActive,
    isClone,
    isDebug,
}, ref) => {

    return <div
        className={elClassName.slideItem}
        ref={ref}
        data-active={booleanToDataAttr(isActive)}
        data-actual={actualIndex}
        data-match={booleanToDataAttr(isClone, matchIndex)}
        data-page={inPage}
        data-source={sourceIndex}
        data-is-clone={booleanToDataAttr(isClone)}
    >
        {element}

        <div className={elClassName.testNumber}>
            {isDebug && sourceIndex}
            {isDebug && isClone && (
                <div className={elClassName.cloneIconGroup}>
                    <div className={elClassName.cloneIcon}>
                        <CloneIcon/>
                    </div>
                    {index}
                </div>
            )}
        </div>
    </div>;
});


export default SlideItem;
