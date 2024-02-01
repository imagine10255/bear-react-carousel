import {forwardRef, useCallback, ReactNode} from 'react';
import clsx from 'clsx';
import elClassName from '../../el-class-name';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    page: number,
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
            [elClassName.paginationButton]: !isPageContent,
            [elClassName.paginationContent]: isPageContent
        })}
        ref={ref}
        role='button'
        onClick={handleSlideToPage}
        data-testid="bear-carousel-page-button"
        data-active={booleanToDataAttr(isActive)}
        data-page={page}
    >
        {pageContent}
    </div>;
});


export default Page;
