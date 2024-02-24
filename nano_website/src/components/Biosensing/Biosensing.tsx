import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ReusableCard from '../Reusable Card/ReusableCard';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Reusable Card/ReusableCard.css'

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
}

const Biosensing = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const cardsData: CardData[] = [
    {
      title: 'Functionalization',
      description:
        'Functionalizing Carbon Nanotubes with secondary amine groups, then quantifying and analyzing functionalized CNTs through fluorescence spectroscopy.',
      imageSrc: '/biosensing pics/Functionalization.png',
    },
    {
      title: 'Spectroscopy Testing',
      description:
        'Conducting Electrochemical impedance spectroscopy tests for determining concentrations of tacrolimus and creatinine to detect kidney failure in patients.',
      imageSrc: '/biosensing pics/Electrical Impedance Spectroscopy2.JPG',
    },
    {
      title: 'Fabrication',
      description:
        'Designing and fabricating microfluidic devices through CAD and microfabrication (photolithography, soft-lithography).',
      imageSrc: '/biosensing pics/Fabrication of biosensing chips.JPG',
    },
    {
      title: 'Analysis',
      description:
        'Using COMSOL to conduct stress analysis of CNTs to examine the durability and strength, and reliability of our CNT-based biosensing structures.',
      imageSrc: '/biosensing pics/comsol_test_bio.png',
    },
  ];

  return (
    <animated.div style={fadeIn}>
      <Container className="mt-5">
        <h1 className="mb-4">Biosensing Solutions</h1>
        <p className="overview">The biosensing team develops cutting-edge technologies for medical diagnostics with our comprehensive understanding of nanomaterials. We investigate the potential of Carbon Nanotubes in biosensing applications through various techniques like functionalization, Electrochemical Impedance Spectroscopy, CAD, Microfabriation, and COMSOL. Here are the specific projects that allow our team to explore and maximize the capabilities of nanotechnology in medical diagnostics and materials science:</p>
        {cardsData.map((card, index) => (
          <Col key={index} className="mb-4">
            <ReusableCard {...card} />
          </Col>
        ))}
      </Container>
    </animated.div>
  );
};

export default Biosensing;
