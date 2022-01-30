import React from 'react';
import styled from 'styled-components/macro';
import {Col, Container, Row} from 'imagine-react-styled-grid';
import Icon from '../Icon';

export default {
    title: 'Atoms|Icon',
};

export const Basic = () => (
    <Container className="pt-3">
        <h2 className="story-title">Basic (Font Class)</h2>
        <Row>
            <Col col={12} md={8} lg={8} xl={6} xxl={3} className="py-2">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col col className="text-right">
                        <Icon code="user-circle" size={40} color="#9ea2b0"/>
                    </Col>
                    <Col col>
                        <Text>user</Text>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Container>
);

export const Svg = () => (
    <Container className="py-3">
        <h2 className="story-title">SVG (Symbol)</h2>
        <Row>
                    <Col col={12} md={8} lg={8} xl={6} xxl={3} className="py-2">
                        <Row className="d-flex justify-content-center align-items-center">
                            <Col col className="text-right">
                                <Icon code="user-circle" type="svg" size={40} color="#9ea2b0"/>
                            </Col>
                            <Col col>
                                <Text>user</Text>
                            </Col>
                        </Row>
                    </Col>
        </Row>
    </Container>
);

export const Rotate = () => (
    <Container className="py-3">
        <h2 className="story-title">Rotate</h2>
        <Row>

            <Col col={12} md={8} lg={8} xl={6} xxl={3} className="py-2">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col col className="text-right">
                        <Icon code="arrow-right" size={40} color="#9ea2b0" isRotateAnimation/>
                    </Col>
                    <Col col>
                        <Text>isRotateAnimation</Text>
                    </Col>

                </Row>
            </Col>

            <Col col={12} md={8} lg={8} xl={6} xxl={3} className="py-2">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col col className="text-right">
                        <Icon code="arrow-right" size={40} color="#9ea2b0" rotate={180}/>
                    </Col>
                    <Col col>
                        <Text>rotate=180</Text>
                    </Col>
                </Row>
            </Col>

            <Col col={12} md={8} lg={8} xl={6} xxl={3} className="py-2">
                <Row className="d-flex justify-content-center align-items-center">
                    <Col col className="text-right">
                        <Icon code="arrow-right" size={40} color="#9ea2b0" rotate={90}/>
                    </Col>
                    <Col col>
                        <Text>rotate=90</Text>
                    </Col>
                </Row>
            </Col>

        </Row>
    </Container>
);

const Text = styled.span`
    font-size: 12px;
    color: #fff;
    text-align: center;
`;
