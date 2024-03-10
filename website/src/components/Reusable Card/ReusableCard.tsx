// ReusableCard.tsx

import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { animated, useSpring } from 'react-spring';

interface ReusableCardProps {
    title: string;
    description: string;
    imageSrc: string;
}

const ReusableCard: React.FC<ReusableCardProps> = ({ title, description, imageSrc }) => {
    const [hovered, setHovered] = React.useState(false);

    const popOut = useSpring({
        transform: `scale(${hovered ? 1.025 : 1})`,
        boxShadow: `0px 0px ${hovered ? 10 : 5}px rgba(0, 0, 0, ${hovered ? 0.2 : 0.1})`,
    });

    return (
        <Col>
            <animated.div
                style={popOut}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <Card className="mb-4">
                    <Card.Body>
                        <Card.Title className="card-title">{title}</Card.Title>
                        <Row>
                            <Col md={8}>
                                <Card.Text className="description">{description}</Card.Text>
                            </Col>
                            <Col md={4}>
                                <Card.Img src={imageSrc} alt={`${title} Image`} />
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </animated.div>
        </Col>
    );
};

export default ReusableCard;
