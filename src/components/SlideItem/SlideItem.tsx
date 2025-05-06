import {forwardRef} from 'react';

import {CloneIcon} from '../../Icon';
import styles from '../../styles.module.scss';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    element: React.ReactNode
    index: number
    virtualIndex: number
    matchIndex: number
    sourceIndex: number
    inPage: number
    isActive?: boolean
    isClone?: boolean
    isDebug?: boolean
}

const SlideItem = forwardRef<HTMLInputElement, IProps>(({
    element,
    index,
    virtualIndex,
    matchIndex,
    sourceIndex,
    inPage,
    isActive = false,
    isClone = false,
    isDebug = false,
}, ref) => {

    return <div
        className={styles.slideItem}
        ref={ref}
        data-testid="acrool-carousel-slideItem"
        data-virtual={virtualIndex}
        data-match={booleanToDataAttr(isClone, matchIndex)}
        data-page={inPage}
        data-source={sourceIndex}
        data-active={booleanToDataAttr(isActive)}
        data-is-clone={booleanToDataAttr(isClone)}
    >
        {element}

        {isDebug && (
            <div className={styles.testNumber}>
                {sourceIndex}
                {isClone && (
                    <div className={styles.cloneIconGroup}>
                        <div className={styles.cloneIcon}>
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
