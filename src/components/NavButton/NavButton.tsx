import * as React from 'react';

import styles from '../../styles.module.scss';


interface IProps {
    className?: string
    testId?: string
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
        <div className={styles.navIcon}/>
    </button>;
};


interface IPropsButton {
    onClick?: () => void
}

export const NavNextButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={[styles.navButton, styles.navNextButton].join(' ')} testId="acrool-carousel-navNextButton"/>;
};

export const NavPrevButton = ({
    onClick,
}: IPropsButton) => {
    return <NavButton onClick={onClick} className={[styles.navButton, styles.navPrevButton].join(' ')} testId="acrool-carousel-navPrevButton"/>;
};



export default NavButton;
