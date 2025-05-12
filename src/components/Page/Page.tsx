import clsx from 'clsx';
import {forwardRef, ReactNode,useCallback} from 'react';

import styles from '../../styles.module.scss';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    page: number
    isActive?: boolean
    onSlideToPage: (page: number) => void
    pageContent?: ReactNode
}

const Page = forwardRef<HTMLDivElement, IProps>(({
    isActive= false,
    onSlideToPage,
    page,
    pageContent
}, ref) => {

    const isPageContent = !!pageContent;

    const handleSlideToPage = useCallback(() => {
        onSlideToPage(page);
    }, [page]);

    return <div
        className={clsx({
            [styles.paginationButton]: !isPageContent,
            [styles.paginationContent]: isPageContent
        })}
        ref={ref}
        role='button'
        onClick={handleSlideToPage}
        data-testid="acrool-carousel-page-button"
        data-active={booleanToDataAttr(isActive)}
        data-page={page}
    >
        {pageContent}
    </div>;
});


export default Page;
