import styled, {createGlobalStyle} from 'styled-components';
import {Col, Container, Grid, Row, auto, Flex} from 'bear-react-grid';
import Base from '@/components/organize/Base';
import AutoPlay from '@/components/organize/AutoPlay';
import AutoImage from '@/components/organize/AutoImage';
import Loop from '@/components/organize/Loop';
import AutoCard from '@/components/organize/AutoCard';
import JuejinVip from '@/components/organize/JuejinVip';
import W99Vip from '@/components/organize/W99Vip';
import LazyImage from '@/components/organize/LazyImage';
import Paginate from '@/components/organize/Paginate';
import Modal from '@/components/organize/Modal';
import Card from "@/components/atoms/Card";
import Breakpoints from "@/components/organize/Breakpoints";
import UpdateSlideItem from "@/components/organize/UpdateSlideItem";
import SlidePerGroup from "@/components/organize/SlidePerGroup";
import ServiceCarousel from "@/components/organize/ServiceCarousel/ServiceCarousel";
import Center from "@/components/organize/Center";

interface IProps extends FCProps {

}

const Heroes = ({
    className,
}: IProps) => {

    const data = [
        // {id: 1, name: 'Base', desc: 'Base carousel', example: Base},
        // {id: 2, name: 'Auto Play', desc: 'Auto play after 1.5s', example: Base},
        // {id: 3, name: 'Paginate', desc: 'Paginate group', example: Paginate},
        // {id: 4, name: 'Auto image size', desc: 'Auto image size', example: AutoImage},
        // {id: 5, name: 'Auto card size', desc: 'Auto card size', example: AutoCard},
        // {id: 6, name: 'Loop', desc: 'Loop slide card', example: Loop},
        // {id: 7, name: 'Sync Control 1', desc: 'Mock 掘金 Vip member', example: JuejinVip},
        {id: 8, name: 'Sync Control 2', desc: 'Mock W99 Vip member', example: W99Vip},
        // {id: 9, name: 'Lazy Image', desc: 'Lazy slide image ', example: LazyImage},
        // {id: 10, name: 'Modal scroll', desc: 'css fixed card scroll', example: Modal},
        // {id: 11, name: 'Breakpoints', desc: 'RWD Setting', example: Breakpoints},
        // {id: 12, name: 'Update SlideItem', desc: 'Update state', example: UpdateSlideItem},
        // {id: 13, name: 'Slide PerGroup', desc: 'Slide PerGroup', example: SlidePerGroup},
        // {id: 14, name: 'ServiceCarousel', desc: 'Slide PerGroup', example: ServiceCarousel},
        // {id: 15, name: 'Center', desc: 'Center Slide', example: Center},
    ];







    return <HeroesRoot className={className}>

        {data.map(row => {
            const ExampleEl = row.example;

            return <Card key={row.id} name={row.name} desc={row.desc}>
                <ExampleEl/>
            </Card>;
        })}

        <GlobalCSS/>
    </HeroesRoot>;
};

export default Heroes;





const HeroesRoot = styled.div`

`;



const GlobalCSS = createGlobalStyle`

    :root{
        --bs-btn-color: #fff;
        --bs-btn-bg: #0d6efd;
        --bs-btn-border-color: #0d6efd;
        --bs-btn-hover-color: #fff;
        --bs-btn-hover-bg: #0b5ed7;
        --bs-btn-hover-border-color: #0a58ca;
        --bs-btn-focus-shadow-rgb: 49,132,253;
        --bs-btn-active-color: #fff;
        --bs-btn-active-bg: #0a58ca;
        --bs-btn-active-border-color: #0a53be;
        --bs-btn-active-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
        --bs-btn-disabled-color: #fff;
        --bs-btn-disabled-bg: #0d6efd;
        --bs-btn-disabled-border-color: #0d6efd;
    }

    body{
        background: #212529;
        color: #fff;
    }
`;
