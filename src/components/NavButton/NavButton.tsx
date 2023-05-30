import {forwardRef, useCallback} from 'react';
import elClassName from '../../el-class-name';
import {ArrowIcon} from '../../Icon';
import * as React from 'react';


interface IProps {
    className?: string,
    testId?: string,
    onClick: () => void
}

const NavButton = ({
    className,
    testId,
    onClick,
}: IProps) => {

    return <button
        data-testid={testId}
        type="button"
        className={className}
        onClick={onClick}
    >
        <div className={elClassName.navIcon}>
            <ArrowIcon/>
        </div>
    </button>;
};


interface IPropsButton {
    onClick: () => void
}

export const NavNextButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={elClassName.navNextButton} testId="bear-carousel-navNextButton"/>;
};

export const NavPrevButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={elClassName.navPrevButton} testId="bear-carousel-navPrevButton"/>;
};



export default NavButton;
