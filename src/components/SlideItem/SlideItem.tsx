import {forwardRef} from 'react';
import elClassName from '../../el-class-name';
import {CloneIcon} from '../../Icon';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    element: React.ReactNode,
    index: number,
    actualIndex: number
    matchIndex: number
    maxIndex: number
    sourceIndex: number
    inPage: number
    isActive?: boolean
    isClone?: boolean
    isDebug?: boolean
}

const SlideItem = forwardRef<HTMLInputElement, IProps>(({
    element,
    index,
    actualIndex,
    matchIndex,
    sourceIndex,
    maxIndex,
    inPage,
    isActive = false,
    isClone = false,
    isDebug = false,
}, ref) => {

    return <div
        className={elClassName.slideItem}
        ref={ref}
        data-testid="bear-carousel-slideItem"
        data-actual={actualIndex}
        // data-match={booleanToDataAttr(isClone, matchIndex)}
        data-page={inPage}
        // data-source={sourceIndex}
        aria-label={`${actualIndex} / ${maxIndex}`}
        data-active={booleanToDataAttr(isActive)}
        // data-is-clone={booleanToDataAttr(isClone)}
    >
        {element}

        {isDebug && (
            <div className={elClassName.testNumber}>
                {sourceIndex}
                {isClone && (
                    <div className={elClassName.cloneIconGroup}>
                        <div className={elClassName.cloneIcon}>
                            <CloneIcon/>
                        </div>
                        {index}
                    </div>
                )}
            </div>
        )}
    </div>;
});


export default SlideItem;
