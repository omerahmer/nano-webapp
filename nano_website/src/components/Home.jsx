import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';

const CardWithHover = ({ backgroundImage, title, content, buttonText }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardSpring = useSpring({
        scale: isHovered ? 1.04 : 1,
    });

    return (
        <animated.div
            className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: cardSpring.scale.interpolate(scale => `scale(${scale})`),
                border: "3px solid black",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">{title}</h2>
                {content && <p>{content}</p>}
                {buttonText && (
                    <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                        <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold">{buttonText}</button>
                    </div>
                )}
            </div>
        </animated.div>
    );
};

const Home = () => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }, // Adjust the duration as needed
    });

    const linkStyle = {
        textDecoration: 'none'
    };

    return (
        <animated.div className="home" style={fadeIn}>
            <div class="container my-5">
                <div class="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div class="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 class="display-4 fw-bold lh-1">Welcome to the Nanotechnology Laboratory at UC Berkeley!</h1>
                        <p class="lead">Welcome to our lab, where innovation converges to redefine biosensing, energy storage,
                            chip lithography, and much more. Our carbon nanotube sensors, developed in collaboration with leading
                            institutions including NASA Ames, Stanford, UCSF, Lawrence Berkeley National Labs, and UC Davis Medical
                            Center, revolutionize biosensing with unparalleled sensitivity, enabling simultaneous in-situ detection
                            of multiple biomarkers. Beyond biosensing, these nanotubes achieve remarkable power density, setting a
                            new standard for energy storage efficiency. Join us in exploring the transformative potential of
                            nanotechnology in reshaping the future of biosensing and sustainable energy solutions.</p>
                        <div class="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <a href="/Biosensor">
                                <button type="button" class="btn btn-success btn-lg px-4 me-md-2 fw-bold">Biosensor Calculations</button>
                            </a>
                        </div>
                    </div>
                    <div class="col-lg-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img class="rounded-lg-3" src="https://www.labnetinternational.com/sites/www.labnetinternational.com/files/blogsies/header-images/iStock-949946968.jpg" alt="" width="720"></img>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-5 row" id="projects">
                <h2 className="pb-2 border-bottom">Projects</h2>
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    <div className="col">
                        <a href="/Biosensing" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="biosensing_pic.png"
                                title="Biosensing"
                                content="Biometric tracking, microfluidics, and more."
                            />
                        </a>

                    </div>

                    <div className="col">
                        <a href="/EnergyStorage" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="cnts.jpg"
                                title="Energy Storage"
                                content="Batteries that can charge phones for a week within seconds."
                            />
                        </a>
                    </div>

                    <div className="col">
                        <a href="/EBeam" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="lithography.jpeg"
                                title="Electron-beam Lithography"
                                content="Extreme precision lithography with small feature sizes enabled by CNT's."

                            />
                        </a>

                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default Home;