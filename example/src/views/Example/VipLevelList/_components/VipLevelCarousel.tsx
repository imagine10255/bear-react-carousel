import {useState} from 'react';
import styled from 'styled-components/macro';
import {ERowAlign, Flex} from 'bear-react-grid';
import BearCarousel, {elClassName, IBearCarouselObj, BearSlideItem, TBearSlideItemDataList} from 'bear-react-carousel';
import {anyToNumber} from 'bear-jsutils/convert';
import {Select} from 'bear-components/forms';

// Components
import VipLevelCard, {IRules} from './VipLevelCard';


interface IVIPData {
    level: number,
    totalAmount: number,
    rule: IRules[],
}

const vipData: IVIPData[] = new Array(12).fill('').map((row, index) => {
    return {
        level: index,
        totalAmount: 100 * index,
        rule: [
            {title: 'Rem', value: 200 * index, total: 300 * index, hasUpTo: true,},
            {title: 'Cache', value: 120 * index, total: 120 * index,hasUpTo: true,}
        ],
    };
});

interface IProps extends FCProps{
    isLoadData: boolean,
}
const activeLevel = 2;


/**
 * VipLevelCardList
 */
const VipLevelCarousel = ({
    isLoadData,
}: IProps) => {
    const [carousel, setCarousel] = useState<IBearCarouselObj>();
    const [isTotal, setSwitchTotal] = useState<boolean>(false);

    const levelOption = vipData.map((row, index) => {
        return {
            text: `LV ${row.level}`,
            value: String(index + 1),
        };
    });



    const carouselData: TBearSlideItemDataList = vipData.map(row => {
        return {
            key: `${row.level}-${isTotal}`,
            children: (<BearSlideItem as="card" className="py-4">
                <VipLevelCard
                    isTotal={isTotal}
                    rules={row.rule}
                    levelName={`LV ${row.level}`}
                    totalAmount={row.totalAmount}
                    isActive={Number(activeLevel) === Number(row.level)}
                />
            </BearSlideItem>)
        };
    });

    const carouselLevel = carousel?.activePage ?? 1;


    const handleSwitchColumn = () => {
        setSwitchTotal(curr => !curr);
    }

    const handleCarouselGoIndex = (index: number) => {
        carousel?.goToPage(index);
    };

    const renderControlArea = () => {
        return <Flex horizontal={ERowAlign.center}>
            <ControlArea>
                <Select
                    title="level"
                    options={levelOption}
                    value={carouselLevel}
                    onChange={(value) => handleCarouselGoIndex(anyToNumber(value))}
                />
            </ControlArea>
        </Flex>;
    };




    return (
        <VipLevelCardListRoot>
            {renderControlArea()}

            <SwitchButton type="button" onClick={handleSwitchColumn}>Switch Column:{String(isTotal)}</SwitchButton>

            <BearCarousel
                isEnableLoop={false}
                isEnableNavButton
                setCarousel={setCarousel}
                slidesPerView={1}
                spaceBetween={20}
                staticHeight="270px"
                data={isLoadData ? carouselData: []}
                breakpoints={{
                    576: {
                        slidesPerView: 'auto'
                    },
                }}
            />
        </VipLevelCardListRoot>
    );
};

export default VipLevelCarousel;

const SwitchButton = styled.button`
    color: #fff;
  background-color: #e83e8c;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 200px;
  z-index: 999999;
`;

const ControlArea = styled.div`
    color: #737b8c;
    padding: 10px 0;
`;

const VipLevelCardListRoot = styled.div`
  .${elClassName.navPrevButton}, .${elClassName.navNextButton}{
    top: -50px;
    bottom: unset;
  }

`;
