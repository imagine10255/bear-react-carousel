import {forwardRef, useCallback} from 'react';
import elClassName from '../../el-class-name';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    page: number,
    isActive?: boolean
    onSlideToPage: (page: number) => void
    pageContent?: JSX.Element
}

const Page = forwardRef<HTMLDivElement, IProps>(({
    isActive= false,
    onSlideToPage,
    page,
    pageContent
}, ref) => {

    const handleSlideToPage = useCallback(() => {
        onSlideToPage(page);
    }, [page]);

    return <div
        className={elClassName.paginationButton}
        ref={ref}
        role='button'
        onClick={handleSlideToPage}
        data-testid="bear-carousel-page-button"
        data-active={booleanToDataAttr(isActive)}
        data-page={page}
    >
        {pageContent && (
            <div className={elClassName.paginationContent}>
                {pageContent}
            </div>
        )}
    </div>;
});


export default Page;
