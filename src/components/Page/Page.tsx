import {forwardRef, useCallback} from 'react';
import elClassName from '../../el-class-name';
import {booleanToDataAttr} from '../../utils';


interface IProps {
    page: number,
    isActive?: boolean
    onSlideToPage: (page: number) => void
}

const Page = forwardRef<HTMLDivElement, IProps>(({
    isActive= false,
    onSlideToPage,
    page,
}, ref) => {

    const handleSlideToPage = useCallback(() => {
        onSlideToPage(page);
    }, [page]);

    return <div
        className={elClassName.paginationButton}
        ref={ref}
        role='button'
        onClick={handleSlideToPage}
        data-testid="bear-carousel-button"
        data-active={booleanToDataAttr(isActive)}
        data-page={page}
    >
        {/*<div className={elClassName.paginationContent}>*/}
        {/*    {data[i]?.paginationContent}*/}
        {/*</div>*/}
    </div>;
});


export default Page;
