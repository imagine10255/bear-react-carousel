import elClassName from '../el-class-name';
import {CloneIcon} from '../Icon';
import * as React from 'react';
import {forwardRef, useCallback} from 'react';


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
        data-active={isActive ? true : undefined}
        data-page={page}
    >
        {/*<div className={elClassName.paginationContent}>*/}
        {/*    {data[i]?.paginationContent}*/}
        {/*</div>*/}
    </div>;
});


export default Page;
