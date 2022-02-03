import styled, {css} from 'styled-components/macro';
import React from 'react';
import {media} from 'bear-styled-grid';

import {uuid} from 'bear-jsutils/key';
import CSS from 'csstype';
import {isEmpty} from 'bear-jsutils/equal';
import {formatCurrency} from 'bear-jsutils/number';
import cx from 'classnames';


export interface IRules {
    title: string,
    value: any,
}


interface IProps extends FCProps{
    style?: CSS.Properties,
    className?: string,
    isVipLevel?: boolean,
    level: number,
    depositAmount: number,
    rules?: IRules[],
}

/**
 * VipLevelCard
 */
const VipLevelCard = ({
    style,
    className,
    isVipLevel = false,
    level,
    depositAmount,
    rules = [],
}: IProps) => {

    return (
        <VipLevelCardRoot
            style={style}
            className={cx('vip-level-card-root', {className: className})}
            isVipLevel={isVipLevel}
        >
            <VipLevelContent className="vip-level-content">

                <VipLevel className="vip-level">
                    {level}
                </VipLevel>

                {
                    rules.map(row => {
                        const value = row.value;

                        return (
                            <VipLevelItem key={`level_${uuid()}`} className={'vip-level-item d-flex'}>
                                <ItemInner>
                                    <ItemTitle className="item-title">{row.title}</ItemTitle>

                                    <ItemValue className="item-value">

                                        {/* 判定value type是否為Function */}
                                        {typeof value === 'function' ? value() : value}

                                    </ItemValue>
                                </ItemInner>
                            </VipLevelItem>
                        );
                    })
                }

            </VipLevelContent>

            <VipLevelFooter className="vip-level-footer">
                <VipLevelItem className="vip-level-item">
                    <ItemInner>
                        <ItemTitle className="item-title">Amount</ItemTitle>
                        <ItemValue className="item-value">{(isEmpty(depositAmount) || depositAmount === 0) ? 'Free' : `$${formatCurrency(depositAmount, false)}`}</ItemValue>
                    </ItemInner>
                </VipLevelItem>
            </VipLevelFooter>


        </VipLevelCardRoot>
    );
};

export default VipLevelCard;


const VipLevelContent = styled.div`
    width: 100%;
    flex: 1 1 auto;
    padding: 10px 12px 0;
    z-index: 2;

    ${media.lg`
        padding: 19px 15px 0;
    `}
`;

const VipLevel = styled.div`
    width: 110px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    border-radius: 20px;
    max-width: 100%;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    background-color: rgba(0, 0, 0, 0.2);
    transition: all .2s ease-in;

    ${media.lg`
        width: 110px;
        font-size: 24px;
        height: 30px;
        line-height: 30px;
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

    

    ${media.lg`
        padding: 15px 0;
        min-height: 60px;

    
    `}

    &:last-child {
        border-bottom: none;
    }
`;

const ItemInner = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const ItemTitle = styled.div`
    font-size: 10px;
    transition: all .2s ease-in;

    span {
        > span {
            color: #004e6b;
            font-weight: 700;
        }
    }

    ${media.lg`
        font-size: 12px;
    `}
`;

const ItemValue = styled.div`
    font-size: 12px;
    font-weight: 700;
    transition: all .2s ease-in;
    color: #00a3e0;
    display: flex;
    align-items: center;

    ${media.lg`
        font-size: 12px;
    `}
`;


const VipLevelFooter = styled.div`
    background-color: #36393f;
    width: 100%;
    padding: 0 12px;
    transition: all .2s ease-in;
    border-radius: 0 0 5px 5px;
    z-index: 1;

    ${media.lg`
        padding: 0 15px;
    `}

    ${VipLevelItem} {
        color: #fff;
        min-height: auto;

        ${ItemValue} {
            color: #fff;
        }
    }
`;

const VipLevelCardBg = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 220px;
    overflow: hidden;
    opacity: 0;

    > img {
        position: absolute;
        bottom: 0;
        z-index: 0;
        left: -47px;
        width: 150px;
        height: 150px;
    }

    ${media.lg`
        height: 220px;

        > img {
            left: -47px;
            width: 220px;
            height: 220px;
        }
    `}
`;

const VipLevelCardRoot = styled.div<{
    isVipLevel: boolean,
}>`
    border-radius: 5px;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2);
    background-color: #fff;
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: all .2s ease-in;

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
        transition: all .2s ease-in;
        border-radius: 5px;
    }

    ${media.lg`
        z-index: 1;

        &:hover:before {
            opacity: 1;
        }

        &:hover {
            z-index: 2;
            transform: scale(1.1);

            ${VipLevelItem} {
                border-bottom: solid 1px rgba(232,232,232,.6);
            }

            ${VipLevel} {

                background-color: rgba(255,255,255,.2);
            }
            ${VipLevelContent} {

                ${ItemTitle} {
                    color: #fff;

                    span > span {
                        color: #000;
                    }
                }

                ${ItemValue} {
                    color: #000;

                    span{
                        color: #fff;

                        > span {
                            color: #000;
                        }
                    }
                }

            }
            ${VipLevelFooter} {
                background-color: #fff;

                ${ItemTitle} {
                    color: #004e6b;
                }
                ${ItemValue} {
                    color: #004e6b;
                }
            }

            ${VipLevelCardBg} {
                opacity: .1;
            }
        }

        //  >screen.lg時 指定登入會員等級樣式
        ${(props: any) => props.isVipLevel && css`
            &:before {
                opacity: 1;
            }

            z-index: 2;
            transform: scale(1.1);

            // 白線調淡
            ${VipLevelItem} {
                border-bottom: solid 1px rgba(232,232,232,.6);
            }

            ${VipLevel} {

                background-color: rgba(255,255,255,.2);
            }

            ${VipLevelContent} {

                ${ItemTitle} {
                    color: #fff;

                    span > span {
                        color: #000;
                    }
                }

                ${ItemValue} {
                    color: #000;

                    span{
                        color: #fff;

                        > span {
                             color: #000;
                        }
                    }
                }

            }

            ${VipLevelFooter} {
                background-color: #fff;

                ${ItemTitle} {
                    color: #004e6b;
                }
                ${ItemValue} {
                    color: #004e6b;
                }
            }

            ${VipLevelCardBg} {
                opacity: .1;
            }
        `}
    `}
`;
