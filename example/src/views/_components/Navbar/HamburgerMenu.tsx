import {motion} from 'framer-motion';
import styled from 'styled-components/macro';


// @ts-ignore
const Path = (props: any) => (
    <motion.path
        fill="transparent"
        strokeWidth="3"
        stroke="hsl(0, 100%, 100%)"
        strokeLinecap="round"
        {...props}
    />
);

interface IProps extends FCProps{
  toggleExpend?: () => void;
  isExpend?: boolean,
}


/**
 * HamburgerMenu
 */
const HamburgerMenu = ({
    className,
    style,
    toggleExpend= () => {},
    isExpend = false,
}: IProps) => {


    return (
        <HamburgerMenuRoot
            className={className}
            style={style}
            onClick={toggleExpend}
            initial={false}
            animate={isExpend ? 'open' : 'closed'}
        >
            <svg width="30" height="25" viewBox="0 0 25 25">
                <Path
                    variants={{
                        closed: {d: 'M 4 5.5 L 22 5.5'},
                        open: {d: 'M 5 19.5 L 19 5.5'}
                    }}
                />
                <Path
                    d="M 4 12.423 L 22 12.423"
                    variants={{
                        closed: {opacity: 1},
                        open: {opacity: 0}
                    }}
                    transition={{duration: 0.1}}
                />
                <Path
                    variants={{
                        closed: {d: 'M 4 19.346 L 22 19.346'},
                        open: {d: 'M 5 5.5 L 19 19.346'}
                    }}
                />
            </svg>
        </HamburgerMenuRoot>
    );
};

export default HamburgerMenu;

const HamburgerMenuRoot = styled(motion.button)`
   background: transparent;
   border: none;
   cursor: pointer;
   padding: 0;
   line-height: 0;
  
`;
