import * as React from 'react';
import elClassName from '../../el-class-name';


interface IProps {
    className?: string,
    testId?: string,
    onClick?: () => void
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
        <div className={elClassName.navIcon}/>
    </button>;
};


interface IPropsButton {
    onClick?: () => void
}

export const NavNextButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={[elClassName.navButton, elClassName.navNextButton].join(' ')} testId="bear-carousel-navNextButton"/>;
};

export const NavPrevButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={[elClassName.navButton, elClassName.navPrevButton].join(' ')} testId="bear-carousel-navPrevButton"/>;
};



export default NavButton;
