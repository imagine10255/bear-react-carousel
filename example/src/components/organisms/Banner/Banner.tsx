import styled from 'styled-components';
import {useRef} from 'react';
import domtoimage from 'dom-to-image';
import Github from './github.svg?react';
import {media} from '@acrool/react-grid';


interface IProps {
    className?: string
    repositoryUrl: string
    name: string

}



const Banner = ({
    className,
    name,
    repositoryUrl,
}: IProps) => {
    const ref = useRef<HTMLDivElement>(null);


    const downloadBanner = () => {
        const node = ref.current;
        if(!node){
            return;
        }

        domtoimage.toPng(node, {quality: 0.95})
            .then(function (dataUrl) {
                const link = document.createElement('a');
                link.download = 'og.png';
                link.href = dataUrl;
                link.click();
            });
    };


    return <BannerRoot className={className}>

        <InfoWrapper>
            <A href={repositoryUrl} target="_blank" rel="noopener noreferrer">
                <Github width={40} height={40}/>
            </A>
            <DownloadButton type="button" onClick={downloadBanner}>Download Banner</DownloadButton>
        </InfoWrapper>

        <DownloadWrapper ref={ref}>
            <img src="/logo.svg" alt={name}/>
            <h1>{name}</h1>
        </DownloadWrapper>

    </BannerRoot>;
};

export default Banner;



const DownloadWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 200px;
  width: 920px;
  gap: 12px;
  background-color: #000;

  > img{
    height: 100px;
  }

  > h1{
    word-wrap:break-word;

    font-size: 20px;
    color: #fff;
    font-weight: 700;
    line-height: 0;
  }

  ${media.sm`
    > h1{
        font-size: 40px;
        color: #fff;
        font-weight: 700;
        line-height: 0;
      }

  `}
`;


const A = styled.a`
  display: flex;
  color: #fff;
  font-size: 12px;
  align-items: center;
  gap: 10px;
`;

const InfoWrapper = styled.div`
  background-color: #000;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
`;

const DownloadButton = styled.button`
  color: #fff;
`;


const BannerRoot = styled.div`
  position: relative;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
