import styled, {css} from 'styled-components';

interface IProps extends FCChildrenProps {
   className?: string,
    isOutline?: boolean,
    isActive?: boolean,
   href?: string
}

const CourseButton = ({
    className,
    children,
    isOutline,
    href,
}: IProps) => {
    return <CourseButtonRoot
        className={className}
        data-outline={isOutline ? '': undefined}
        href={href}
    >
        {children}
    </CourseButtonRoot>;
};

export default CourseButton;





const CourseButtonRoot = styled.a`
    padding: 10px 20px;
    transition: all 0.3s ease-in-out 0s;
    display: flex;
    font-size: 15px;
    justify-content: center;
    align-items: center;
    gap: 5px;
    width: auto;
    border-radius: 30px;

    img{
        width: 24px;
        height: 24px;
    }

    &[data-outline], :hover {
        background-image: linear-gradient(rgba(24, 32, 79, 0.4) 0%, rgba(24, 32, 79, 0.4) 100%);
        box-shadow: rgba(31, 47, 71, 0.25) 0 20px 40px, rgba(0, 0, 0, 0.1) 0 1px 5px, rgba(255, 255, 255, 0.4) 0 0 0 0.5px inset;
    }

    :hover{
        background: rgba(255, 255, 255, 0.2);
    }
`;
