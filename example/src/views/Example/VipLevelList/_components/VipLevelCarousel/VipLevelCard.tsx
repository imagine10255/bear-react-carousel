import React, {memo} from 'react';
import styled from 'styled-components/macro';
import {media} from 'bear-styled-grid';

import CSS from 'csstype';
import {isEmpty} from 'bear-jsutils/equal';
import {formatCurrency} from 'bear-jsutils/number';


export interface IRules {
    title: string,
    value: any,
}


interface IProps extends FCProps{
    style?: CSS.Properties,
    className?: string,
    isActive?: boolean,
    levelName: string,
    depositAmount: number,
    rules?: IRules[],
}

/**
 * VipLevelCard
 */
const VipLevelCard = ({
    isActive = false,
    levelName,
    depositAmount,
    rules = [],
}: IProps) => {

    return (
        <VipLevelCardRoot data-active={isActive}>
            <VipLevelContent>
                <VipLevelName>{levelName}</VipLevelName>
                {rules.map(row => {
                    const value = row.value;

                    return (
                        <VipLevelItem key={`level_${levelName}`}>
                            <ItemInner>
                                <ItemTitle>{row.title}</ItemTitle>

                                <ItemValue>
                                    {/* 判定value type是否為Function */}
                                    {typeof value === 'function' ? value() : value}
                                </ItemValue>
                            </ItemInner>
                        </VipLevelItem>
                    );
                })}

            </VipLevelContent>

            <VipLevelFooter>
                <VipLevelItem>
                    <ItemInner>
                        <ItemTitle>Amount</ItemTitle>
                        <ItemValue>{(isEmpty(depositAmount) || depositAmount === 0) ? 'Free' : `$${formatCurrency(depositAmount, false)}`}</ItemValue>
                    </ItemInner>
                </VipLevelItem>
            </VipLevelFooter>


        </VipLevelCardRoot>
    );
};

export default memo(VipLevelCard);


const VipLevelContent = styled.div`
    flex: 1 1 auto;
    padding: 10px 12px 0;
    z-index: 2;

    ${media.lg`
        padding: 19px 15px 0;
    `}
`;

const VipLevelName = styled.div`
    width: 100%;
    font-size: 14px;
    height: 30px;
    border-radius: 20px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    transition: background-color .2s ease-in;

    ${media.sm`
        width: 110px;
    `}
    ${media.lg`
        font-size: 18px;
    `}
`;

const VipLevelItem = styled.div`
    padding: 10px 0;
    display: flex;
    align-items: center;
    color: #4a4a4a;
    border-bottom: solid 1px #e8e8e8;
    position: relative;
    min-height: 44px;

    &:last-child {
        border-bottom: none;
    }
    
    ${media.lg`
        padding: 15px 0;
        min-height: 60px;
    `}
    
`;

const ItemInner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemTitle = styled.div`
    font-size: 10px;
    transition: color .2s ease-in;

    ${media.lg`
        font-size: 12px;
    `}
`;

const ItemValue = styled.div`
    font-size: 12px;
    font-weight: 700;
    transition: color .2s ease-in;
    color: #00a3e0;

    ${media.lg`
        font-size: 12px;
    `}
`;


const VipLevelFooter = styled.div`
    background-color: #36393f;
    width: 100%;
    padding: 0 12px;
    transition: background-color .2s ease-in;
    z-index: 1;
    border-radius: 0 0 5px 5px;

    ${VipLevelItem} {
        color: #fff;
        min-height: auto;

        ${ItemValue} {
            color: #fff;
        }
    }
    
    ${media.lg`
        padding: 0 15px;
    `}
`;



const VipLevelCardRoot = styled.div<{
    'data-active': boolean,
}>`
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    display: flex;
    flex-direction: column;
    transition: transform .2s ease-in;

    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        opacity: 0;
        z-index: -1;
        background-image: linear-gradient(to bottom, #00e0ff, #6ab8ff);
        transition: opacity .2s ease-in;
        border-radius: 5px;
    }
    
    
    ${media.lg`
        z-index: 1;

        :hover, &[data-active="true"] {
            z-index: 2;
            transform: scale(1.1);
            
            :before {
                opacity: 1;
            }

            ${VipLevelItem} {
                border-bottom-color: rgba(232,232,232,.6);
            }

            ${VipLevelName} {
                background-color: rgba(255,255,255,.2);
            }
            
          
            ${VipLevelContent} {
               ${ItemTitle} {color: #fff;}
               ${ItemValue} {color: #000;}
            }
            
            ${VipLevelFooter} {
                background-color: #fff;
                ${ItemTitle} {color: #004e6b;}
                ${ItemValue} {color: #004e6b;}
            }

         
        }
    `}
    
`;
