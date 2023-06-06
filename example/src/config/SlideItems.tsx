import {BearSlideCard, TBearSlideItemDataList} from 'bear-react-carousel';
import {baseImage as images} from './images';

export const bearSlideItemData1: TBearSlideItemDataList = images.map(row => {
    return {
        key: row.id,
        children: <BearSlideCard>
            <div className="h-100 d-flex"
                style={{fontSize: '40px', backgroundColor: row.color}}
            >
            </div>
        </BearSlideCard>
    };
});
