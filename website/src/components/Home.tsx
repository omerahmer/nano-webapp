import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import './styles.css';
import '../index.css'


interface CardWithHoverProps {
    backgroundImage: string;
    title: string;
    content: string;
    buttonText: string;
    additionalClassName?: string;
}

const CardWithHover: React.FC<CardWithHoverProps> = ({ backgroundImage = '', title = '', content = '', buttonText = '', additionalClassName = '' }) => {
    const [isHovered, setIsHovered] = useState(false);

    const cardSpring = useSpring({
        scale: isHovered ? 1.04 : 1,
    });

    return (
        <animated.div
            className={`card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg font-link ${additionalClassName}`}
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
            <div className={`d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1 ${additionalClassName} font-link`}>
                <h2 className={`pt-5 mt-5 mb-4 display-6 lh-1 fw-bold ${additionalClassName} font-link`}>{title}</h2>
                {content && <p className={additionalClassName}>{content}</p>}
                {buttonText && (
                    <div className={`d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3 ${additionalClassName}`}>
                        <button type="button" className={`btn btn-success btn-lg px-4 me-md-2 fw-bold ${additionalClassName}`}>{buttonText}</button>
                    </div>
                )}
            </div>
        </animated.div>
    );
};


const Home: React.FC = () => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 }, // Adjust the duration as needed
    });

    const linkStyle = {
        textDecoration: 'none'
    };

    return (
        <animated.div className="home font-link" style={fadeIn}>
            <div className="container my-5">
                <div className="row p-4 pb-0 pe-lg-0 pt-lg-5 align-items-center rounded-3 border shadow-lg">
                    <div className="col-lg-7 p-3 p-lg-5 pt-lg-3">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis">Welcome to the Nanotechnology Laboratory at UC Berkeley!</h1>
                        <p className="lead">Welcome to our lab, where innovation converges to redefine biosensing, energy storage,
                            chip lithography, and much more. Our carbon nanotube sensors, developed in collaboration with
                            institutions including NASA Ames, Stanford, UCSF, LBNL, and UC Davis Medical
                            Center, revolutionize biosensing with unparalleled sensitivity, enabling in-situ detection
                            of multiple biomarkers. <br></br><br></br>Beyond biosensing, these nanotubes achieve remarkable energy density in the form of a supercapacitor, setting a
                            new standard for energy storage capabilities. Join us in exploring the transformative potential of
                            nanotechnology in reshaping the future of biosensing and sustainable energy solutions.</p>
                        <br></br>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start mb-4 mb-lg-3">
                            <a href="/Biosensor">
                                <button type="button" className="btn btn-success btn-lg px-4 me-md-2 fw-bold">Biosensor Calculations</button>
                            </a>
                        </div>
                    </div>
                    <div className="col-md-4 offset-lg-1 p-0 overflow-hidden shadow-lg">
                        <img className="rounded-lg-3" src="labpic.png" alt="" width="430"></img>
                    </div>
                </div>
            </div>

            <div className="container px-4 py-5 row" id="projects">
                <h2 className="pb-2 border-bottom">Projects</h2>
                <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
                    <div className="col">
                        <a href="/Biosensing" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="/biosensing%20pics/biosensing_pic-min-min.JPG"
                                title="Biosensing"
                                content="Biometric tracking, microfluidics, and more."
                                buttonText=''
                            />
                        </a>
                    </div>

                    <div className="col">
                        <a href="/EnergyStorage" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="/ebeam%20pics/cubething-min.png"
                                title="Energy Storage"
                                content="Batteries that can charge phones for a week within seconds."
                                buttonText=''
                            />
                        </a>
                    </div>

                    <div className="col">
                        <a href="/EBeam" style={linkStyle}>
                            <CardWithHover
                                backgroundImage="ebeam%20pics/lithography-min.jpg"
                                title="E-beam Lithography"
                                content="Extreme precision lithography with small feature sizes enabled by CNT's."
                                buttonText=''
                            />
                        </a>
                    </div>
                </div>
            </div>
        </animated.div>
    )
}

export default Home;