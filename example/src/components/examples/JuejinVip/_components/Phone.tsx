import React from 'react';
import styled from 'styled-components';
import {FCChildrenProps, media} from '@acrool/react-grid';

interface IProps extends FCChildrenProps {

}


/**
 * Phone
 * https://freefrontend.com/iphones-in-css/
 * https://codepen.io/lukemeyrick/pen/poVyEdZ
 *
 * @param className
 * @param children
 */
const Phone = ({
    className,
    children
}: IProps) => {
    return <PhoneRoot className={className}>

        <Buttons>
            <LeftButton>
                <Button/>
                <Button/>
                <Button/>
            </LeftButton>
            <RightButton>
                <Button/>
            </RightButton>
        </Buttons>

        <Camera/>
        <ScreenContainer>
            <Bg>

                {children}

            </Bg>
            <NotchContainer>
                <Notch>
                    <NotchContent>

                    </NotchContent>
                </Notch>
            </NotchContainer>


        </ScreenContainer>


    </PhoneRoot>;
};

export default Phone;



const Camera = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--notch-height);
  aspect-ratio: 1/1;
  border-radius: 50%;
  pointer-events: none;
  position: absolute;
  z-index: 4;
  top: 2px;
  right: calc(50% - calc(var(--notch-width) * 0.5));
  margin-right: calc(var(--pad) * 0.333);

  &:before{
    content: "";
    height: 33.3%;
    aspect-ratio: 1;
    border-radius: inherit;
    box-shadow: inset 0 0 2.5px #4c4da3;
    background: radial-gradient(#6667ac, transparent 50%) no-repeat 33.3% 10%/75% 50%, radial-gradient(#454680, transparent 50%) no-repeat 60% 85%/50% 50%;
    background-color: #080928;
  }
`;

const Bg = styled.div`
  //padding-top: 30px;
  position: absolute;
  inset: 0;
  //background: black;
  background-color: #1d1d1f;
  //background-color: rgb(9, 22, 44);
  border-radius: calc(var(--border-radius) - var(--pad));
  overflow: hidden;
  transform: translateZ(0);
  z-index: 0;
`;


const Button = styled.div`
  background: hsl(var(--c-h), 20%, 95%);
  height: 60px;
  box-shadow: inset -1.5px 0 1px black, inset 0 0 1px hsl(var(--c-h), 30%, 90%), inset 0 0.2em 0.1em hsl(var(--c-h), 30%, 90%), inset 0 -2px 1px hsl(var(--c-h), 30%, 90%), inset -1px 3.33px 1px rgba(0, 0, 0, 0.5), inset -0.1em -3.33px 1px rgba(0, 0, 0, 0.5);
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;

  &:nth-child(1){
    height: 30px;
    margin-bottom: 5px;
  }
`;



const LeftButton = styled.div`
  position: absolute;
  width: var(--button-width);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 15px;


  right: 100%;
  top: calc(var(--border-radius) * 2);
`;

const RightButton = styled(LeftButton)`
  left: 100%;
  transform: scale3d(-1, 1, 1);
  top: calc(var(--border-radius) * 3);

  position: absolute;
  width: var(--button-width);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 15px;

  ${Button}{
    height: 95px;
  }
`;


const Buttons = styled.div`
  position: absolute;
  inset: calc(var(--border-width) * -1);
  pointer-events: none;
`;


const NotchContent = styled.div`
  --content-padding: 17.5px;
  --duration-height: 5px;
  --content-gap: 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: stretch;
  padding: var(--content-padding);
  gap: var(--content-gap);
  font-size: 125%;
  will-change: padding;
  position: relative;
`;


const Notch = styled.div`
  position: relative;
  border-radius: var(--notch-radius);
  pointer-events: all;
  overflow: hidden;
  color: white;
  display: flex;
  cursor: pointer;
  width: 97px;
  height: 25px;
  will-change: inherit;
  filter: drop-shadow(0 10px 20px hsla(0 0% 0%/var(--shadow-opacity, 0)));
  //transform: scale3d(0.375, 0.4, 1);
  //transform-origin: top;


  &:before{
    content: "";
    position: absolute;
    inset: 0;
    background: black;
    filter: url(data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1'><defs><filter id='round'><feGaussianBlur in='SourceGraphic' stdDeviation='5' result='blur' /><feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9' result='goo'/><feComposite in='SourceGraphic' in2='goo' operator='atop'/></filter></defs></svg>#round);
    border-radius: inherit;
  }
`;

const NotchContainer = styled.div`
  position: absolute;
  z-index: 3;
  top: var(--pad);
  right: var(--pad);
  left: var(--pad);
  display: flex;
  justify-content: center;
  height: 100%;
  max-height: calc(var(--notch-radius) * 2);
  pointer-events: none;
  outline: none;
  will-change: max-width, max-height, filter;
`;

const ScreenContainer = styled.div`
  position: absolute;
  inset: 0;
  border-radius: var(--border-radius);
  border: var(--pad) solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: calc(var(--pad) * 2);

  &:before{
    content: "";
    position: absolute;
    z-index: 2;
    background: white;
    width: 36.6%;
    bottom: calc(var(--pad) * 0.75);
    height: calc(var(--pad) * 0.5);
    border-radius: calc(var(--pad) * 0.25);
    filter: drop-shadow(0 0.1em 0.25em rgba(0, 0, 0, 0.1));
  }
`;





const PhoneRoot = styled.div`
  //--size: max(5px, 1vmin);
  //--height: 40em;
  --pad: 8px;
  --border-radius: 60px;
  --gutter: calc(var(--pad) * 2);
  --scene-pad: 5vmin;
  --bg-blur: 37.333em;
  --button-width: 3px;
  --notch-height: 3.33em;
  --notch-width: 33.3%;
  --notch-radius: calc(var(--border-radius) - calc(var(--pad) * 2));
  --notch-duration: 0.333s;
  --ease: cubic-bezier(.666, 0, .4, 1);
  --ease-spring: cubic-bezier(.666, 0, .4, 1.2);
  --ease-out: cubic-bezier(.15,0,.333,1);
  --border-width: 5px;
  --deep-purple: 284;
  --gold: 22.5;
  --space-black: 215;
  --silver: 254;
  --c-h: var(--deep-purple);
  --c-s: 100%;
  --c-l: 50%;

  transform: scale3d(.8, .8, 1);
    transform-origin: top;


  //background-image: url("https://webdevartur.com/wp-content/uploads/2022/08/ryan-klaus-8QjsdoXDsZs-unsplash-scaled.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
  aspect-ratio: 37/76;
  width: 340px;
  max-width: 100%;
  //height: 896px;
  //height: var(--height);

  border-radius: var(--border-radius);
  box-shadow: 0 0 0.1em 0.25em hsl(var(--c-h), 20%, 25%), 0 0 0 var(--border-width) hsl(var(--c-h), 30%, 85%);
  box-sizing: border-box;
  //opacity: 0;
  margin: auto;

  &:before{
    content: "";
    position: absolute;
    top: var(--border-radius);
    right: calc(var(--border-width) * -1);
    bottom: var(--border-radius);
    left: calc(var(--border-width) * -1);
    border: 4px solid hsl(var(--c-h), 20%, 30%);
    border-left-width: 0;
    border-right-width: 0;
  }

  ${media.md`
    transform: scale3d(1.1, 1.1, 1);
  `}

`;
