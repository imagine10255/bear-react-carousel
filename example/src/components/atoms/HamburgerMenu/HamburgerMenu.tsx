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

interface IProps {
  toggleExpend?: () => void;
  isExpend?: boolean
}


/**
 * HamburgerMenu
 */
const HamburgerMenu = ({
    toggleExpend= () => {},
    isExpend = false,
}: IProps) => {


    return (
        <HamburgerMenuRoot type="button" onClick={toggleExpend}>
            <motion.nav
                initial={false}
                animate={isExpend ? 'open' : 'closed'}
            >
                <svg width="23" height="23" viewBox="0 0 23 23">
                    <Path
                        variants={{
                            closed: {d: 'M 2 2.5 L 20 2.5'},
                            open: {d: 'M 3 16.5 L 17 2.5'}
                        }}
                    />
                    <Path
                        d="M 2 9.423 L 20 9.423"
                        variants={{
                            closed: {opacity: 1},
                            open: {opacity: 0}
                        }}
                        transition={{duration: 0.1}}
                    />
                    <Path
                        variants={{
                            closed: {d: 'M 2 16.346 L 20 16.346'},
                            open: {d: 'M 3 2.5 L 17 16.346'}
                        }}
                    />
                </svg>
            </motion.nav>
        </HamburgerMenuRoot>
    );
};

export default HamburgerMenu;

const HamburgerMenuRoot = styled.button`
   background: transparent;
   border: none;
   cursor: pointer;
   padding: 0;
`;
