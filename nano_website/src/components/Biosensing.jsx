import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';

const Biosensing = () => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });


    // Microfluidics (3d printing, plasma cleaning), metrology (confocal microscopy, SEM imaging), functionalization, electro
    return (
        <animated.div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" style={fadeIn}>
            <main className="px-3">
                <h1>Biosensing Innovations</h1>
                <p className="lead">
                    Explore the cutting-edge biosensing technologies developed in our nanotechnology lab.
                </p>

                <Row>
                <div style={{ display: "flex",  width: "40%", height: "40%", backgroundColor: "green", borderRadius: "50%"  }}>
                
                </div>                
                </Row>
            </main>
        </animated.div>
    );
};

export default Biosensing;
