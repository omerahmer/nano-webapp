// EBeam.tsx

import React from "react";
import { Container } from "react-bootstrap";
import { useSpring, animated } from "react-spring";
import "bootstrap/dist/css/bootstrap.min.css";
import ReusableCard from "../Reusable Card/ReusableCard";
import "../../index.css";

interface CardData {
  title: string;
  description: string;
  imageSrc: string;
}

const EBeam: React.FC = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const cardsData: CardData[] = [
    {
      title: "Overview",
      description:
        "Our state-of-the-art electron-beam lithography tool empowers researchers and engineers to achieve unprecedented precision in nanoscale fabrication on silicon wafers. By directing electrons through carbon nanotubes, precisely focusing the beam, and exposing a silicon wafer coated with a specialized photoresist, our tool enables the creation of highly customizable patterns and intricate electrical circuits on a nanoscale.",
      imageSrc: "/ebeam pics/happymatty-min.jpg",
    },
    {
      title: "Electronics",
      description:
        "In the realm of electronics, our focus is on refining and advancing the current sensing system that meticulously tracks the flow of electrons through the intricate pathways of our cutting-edge electron-beam lithography tool.",
      imageSrc: "/ebeam pics/cubething-min.png",
    },
    {
      title: "Software (Back End)",
      description:
        "Our team is dedicated to the development of sophisticated software that seamlessly translates nanoscale patterns into a precise sequence of silicon wafer and electron-beam actuations. We are actively working on integrating this software with the picomotor for enhanced wafer movement control.",
      imageSrc: "/biosensing pics/impedancespectroscopy1-min.png",
    },
    {
      title: "Software (Front End)",
      description:
        "Our mission is to create an intuitive and user-friendly graphical user interface (GUI) where users can effortlessly design intricate patterns. This front-end software will be seamlessly connected to the back-end system for a harmonious user experience.",
      imageSrc: "/ebeam pics/frontend2-min.png",
    },
    {
      title: "Theoretical Simulation (COMSOL + Theory)",
      description:
        "Dive into the world of theoretical simulation as we employ COMSOL to predict the focal length and spot size of the electron beam. Our simulations are meticulously compared with theoretical predictions to ensure the utmost accuracy and reliability.",
      imageSrc: "https://via.placeholder.com/150",
    },
    {
      title: "Theoretical Simulation (Custom Software)",
      description:
        "Embark on a journey of innovation as we develop our own custom software to simulate the end-to-end behavior of our cutting-edge electron-beam lithography system. This software promises to provide insights and understanding like never before.",
      imageSrc: "/ebeam pics/software-min.png",
    },
  ];

  return (
    <animated.div style={fadeIn}>
      <Container className="mt-5">
        <h1 className="mb-4">Electron-Beam Lithography Tool</h1>
        {cardsData.map((card, index) => (
          <ReusableCard key={index} {...card} />
        ))}
      </Container>
    </animated.div>
  );
};

export default EBeam;
