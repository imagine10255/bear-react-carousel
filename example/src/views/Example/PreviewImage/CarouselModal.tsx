import React, {useCallback, useEffect, useState} from 'react';
import {preViewImage as images} from 'config/images';
import {enableBodyScroll, disableBodyScroll} from 'bear-jsutils/bodyScroll';

// Components
import styled, {css} from 'styled-components/macro';
import {useHotkeys} from 'react-hotkeys-hook';
import BearCarousel, {TBearSlideItemDataList, BearSlideItem, IBearCarouselObj} from 'bear-react-carousel';

interface IProps {
    defaultPage?: number,
    onClose: () => void,
}

const CarouselModal = ({
  defaultPage = 1,
  onClose,
}: IProps) => {

    const [carousel, setCarousel] = useState<IBearCarouselObj>();

    useHotkeys<HTMLDivElement>('esc', (e) => {
        onClose();
    }, []);

    useHotkeys<HTMLDivElement>('left', (e) => {
        if(carousel){
            carousel.toPrev();
        }
    }, [carousel]);

    useHotkeys<HTMLDivElement>('right', (e) => {
        if(carousel){
            carousel.toNext();
        }
    }, [carousel]);

    useEffect(() => {
        disableBodyScroll();

        return () => {
            enableBodyScroll()
        }
    }, [])



    const getActivePage = () => {
        if(carousel){
            return carousel.activePage;
        }
        return 0;
    }

    const bearSlideItemData: TBearSlideItemDataList  = images.map(row => {
        return {
            key: row.id,
            children: <BearSlideItem as="image" imageUrl={row.imageUrl}/>
        };
    });


    const current = images[getActivePage() - 1];

    return (
        <PreviewImageRoot>
            <CloseButton onClick={onClose}>
                X
            </CloseButton>

            <Content>
                <BearCarousel
                    data={bearSlideItemData}
                    staticHeight="100%"
                    setCarousel={setCarousel}
                    defaultActivePage={defaultPage}
                />

                {current &&
                    <Footer>
                        <PhotoName>{current.name}</PhotoName>
                        <CreatedAt>已增加 {current.createdAt} - {current.size}</CreatedAt>
                        <Action>
                            <div className="mr-2" onClick={() => window.open(current.imageUrl)}>在新標籤頁開啟</div>
                            <div className="mr-2">移除封面</div>
                            <div className="mr-2">刪除</div>
                        </Action>

                        <PreButton type="button">
                            {getActivePage() > 1 && '<'}
                        </PreButton>
                        <NextButton type="button">
                            {getActivePage() < images.length && '>'}
                        </NextButton>
                    </Footer>
                }
            </Content>


            {/*<BlockImage src={imageUrl}/>*/}
        </PreviewImageRoot>
    );
};

export default CarouselModal;

const NavButton = styled.button`
    position: absolute;
    color: #fff;
  font-size: 20px;
  top: 0;
  bottom: 0;
`;

const PreButton = styled(NavButton)`
    left: 10px;
`;
const NextButton = styled(NavButton)`
    right: 10px;
`;


const Action = styled.div`
    display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 12px;
  text-decoration: underline;
`;

const CreatedAt = styled.div`
    font-size: 14px;
  margin-bottom: 5px;
`;

const PhotoName = styled.div`
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: bold;
`;


const Footer = styled.div`
    height: 100px;
  background-color: #000000b3;
  text-align: center;
  padding-top: 10px;
  position: absolute;
  
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
`;


const Content = styled.div`
  width: 100%;
  height: 100%;
`;


const CloseButton = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  background: #727272;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 99;
  font-size: 18px;
`;

const BlockImage = styled.img`
    width: auto;
    height: auto;
    max-width: 80vw;
`;


const PreviewImageRoot = styled.div`
    z-index: 997;
    color: #fff;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow: auto;

    opacity: 1;
    pointer-events: auto;


  .bear-react-carousel__slide-item{
    overflow-y: auto;
  }
  
  .bear-react-carousel__slide-item__img{
    display: flex;
    justify-content: center;
    align-items: center;
    margin: auto;
    height: auto;
    margin-top: 40px;
    margin-bottom: 100px;
  }
  
  
`;

