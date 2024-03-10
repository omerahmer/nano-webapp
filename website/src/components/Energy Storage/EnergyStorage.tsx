import React from 'react';
import { Container, Col } from 'react-bootstrap';
import { useSpring, animated } from 'react-spring';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReusableCard from '../Reusable Card/ReusableCard';
import '../../index.css'

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
}

const EnergyStorage: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const cardsData: CardData[] = [
    {
      title: 'Overview',
      description:
        'Explore our cutting-edge energy storage solutions designed to revolutionize the way we store and harness energy. From advanced battery technologies to innovative capacitors, our goal is to provide efficient and sustainable energy storage options for a brighter future.',
      imageSrc: 'https://via.placeholder.com/150',
    },
    {
      title: 'Battery Technologies',
      description:
        'Dive into the world of advanced battery technologies. Our research and development focus on enhancing energy density, cycle life, and safety in batteries to meet the growing demands of various applications.',
      imageSrc: 'https://via.placeholder.com/150',
    },
    {
      title: 'Capacitor Innovations',
      description:
        'Discover our innovative capacitor solutions designed for rapid energy storage and discharge. Our capacitors are engineered for high performance, efficiency, and reliability across various applications.',
      imageSrc: 'https://via.placeholder.com/150',
    },
    {
      title: 'Renewable Integration',
      description:
        'Explore our solutions for integrating energy storage with renewable sources. We aim to optimize energy storage systems to work seamlessly with solar, wind, and other renewable technologies, contributing to a sustainable energy future.',
      imageSrc: 'https://via.placeholder.com/150',
    },
    {
      title: 'Research and Development',
      description:
        'Learn about our commitment to continuous research and development in the field of energy storage. We are dedicated to pushing the boundaries of innovation to create solutions that address the world\'s energy challenges.',
      imageSrc: 'https://via.placeholder.com/150',
    },
    {
      title: 'Page Under Construction',
      description:
        'Please note that this page is currently under construction. We are actively working on updating it with more detailed information and progress updates. Thank you for your patience!',
      imageSrc: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <animated.div style={fadeIn}>
      <Container className="mt-5 font-link">
        <h1 className="mb-4">Energy Storage Solutions</h1>
        {cardsData.map((card, index) => (
          <Col key={index} className="mb-4">
            <ReusableCard {...card} />
          </Col>
        ))}
      </Container>
    </animated.div>
  );
};

export default EnergyStorage;
