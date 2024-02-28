import React from "react"
import { useSpring, animated } from 'react-spring';
import './People.css'
import '../../index.css'

interface PeopleData {
    name: string;
    image: string;
    teams: string;
    blurb: string;
}

const people: PeopleData[] = [
    {
        "name": "Omer Ahmer",
        "image": "<a href=\"https://ibb.co/NxC9QV0\"><img src=\"https://i.ibb.co/nrm7ZgX/8d6fed87-2e30-4021-bae6-8de8ce4c78a9.jpg\" alt=\"8d6fed87-2e30-4021-bae6-8de8ce4c78a9\" border=\"0\"></a>",
        "teams": "Software, E-Beam Lithography",
        "blurb": "I am working on revamping the website and adding features, as well as fixing the USB communication between the CNT's and the controllers."
    },
    {
        "name": "August Nguyen",
        "image": "<a href=\"https://ibb.co/vddj1wZ\"><img src=\"https://i.ibb.co/jwwrh6g/21-A78-EF2-3-CEC-4678-BD6-D-38-E419-AD4389.jpg\" alt=\"21-A78-EF2-3-CEC-4678-BD6-D-38-E419-AD4389\" border=\"0\"></a>",
        "teams": "Biosensing",
        "blurb": "Run functionalization quantization procedure to determine the concentration through a low-pass filter by measuring the impedence"
    },
    {
        "name": "Achyut S. Chebiyam",
        "image": "",
        "teams": "",
        "blurb": ""
    },
    {
        "name": "Anthony Pentrack",
        "image": "<a href=\"https://ibb.co/VHdzQGj\"><img src=\"https://i.ibb.co/VHdzQGj/Best-one.jpg\" alt=\"Best-one\" border=\"0\"></a>",
        "teams": "Biosensing",
        "blurb": "I am working on many projects within the biosensing team including the quantification of our functionalized CNT's, running electrochemical impedance spectroscopy tests to determine concentrations based on impedance changes, designing and creating microfluidic devices through photolithography and soft lithography, and performing COMSOL analyses on our CNT chips."
    },
    {
        "name": "Su Kyung Lee",
        "image": "<a href=\"https://ibb.co/b7m66Bp\"><img src=\"https://i.ibb.co/GFpdd2g/IMG-2652-2.jpg\" alt=\"IMG-2652-2\" border=\"0\" /></a>",
        "teams": "Biosensing, Energy Storage",
        "blurb": "For the biosensing team, I design and fabricate microfluidic devices, run electrochemical impedance spectroscopy tests, and conduct stress analysis of CNTs on COMSOL. I also work on all stages of microfabrication from mask design, photolithography, SEM imaging, and wafer dicing for BioMEMS applications."
    },
    {
        "name": "Caroline Chen",
        "image": "<a href=\"https://ibb.co/pdbtHSR\"><img src=\"https://i.ibb.co/m4bLn3X/Wechat-IMG189.jpg\" alt=\"Wechat-IMG189\" border=\"0\" /></a>",
        "teams": "Energy Storage",
        "blurb": "I work on characterizing performance parameters of the CNT-based capacitor and investigating E-field-induced dielectric changes in nanolaminates."
    },
    {
        "name": "Ellie Zuo",
        "image": "",
        "teams": "Hardware",
        "blurb": "I work on building and maintaining our team's infrastructure, and help investigate and design solutions such as compute servers and alternative SBC platforms that will faciliate a more flexible approach to research."
    },
    {
        "name": "Sanchay Gadia",
        "image": "<a href=\"https://ibb.co/vQSWXyH\"><img src=\"https://i.ibb.co/z7zg69r/20230329-190810.jpg\" alt=\"20230329-190810\" border=\"0\"></a>",
        "teams": "Energy Storage",
        "blurb": "I work on fabricating the nanocapacitors and the CNT chips. I also perform chip testing to analyze our dielectric and device performance while investigating molecular changes in the nanolaminates which provides us with the superior dielectric constant."
    },
    {
        "name": "Shalen Ardeshna",
        "image": "<a href=\"https://ibb.co/DYJC0JL\"><img src=\"https://i.ibb.co/DYJC0JL/IMG-7458.jpg\" alt=\"IMG-7458\" border=\"0\"></a>",
        "teams": "Design",
        "blurb": "I work on the manifold design for functionalization of our chips as well as help with the design of our microfluidics pump to test the performance of our microfludic devices."
    },
    {
        "name": "Sasha Lamot",
        "image": "<a href=\"https://ibb.co/T84XPLX\"><img src=\"https://i.ibb.co/Ltxw95w/Nano-Tech-picutre.jpg\" alt=\"Nano-Tech-picutre\" border=\"0\"></a>",
        "teams": "E-Beam Lithography",
        "blurb": "Working in the e-beam lithography project. Focusing on building the GUI to simulate e-beam lithography and connecting the software to the hardware."
    },
    {
        "name": "Shankar Subramaniam",
        "image": "<a href=\"https://ibb.co/dB1Vjsg\"><img src=\"https://i.ibb.co/VVrzJ0m/Shankar-pic.jpg\" alt=\"Shankar-pic\" border=\"0\"></a>",
        "teams": "Energy Storage",
        "blurb": "I am working on developing theroritical models to investigate E-field-induced dielectric changes in nanolaminates of capacitorsand model the relationship between the arrangment of the dielectric layers and the accumulation of these dielectric charges. ."
    },
    {
        "name": "Sabrina Fang",
        "image": "",
        "teams": "Biosensing",
        "blurb": ""
    },
    {
        "name": "Humayd Zameer",
        "image": "<a href=\"https://ibb.co/dKtm1Vq\"><img src=\"https://i.ibb.co/dKtm1Vq/DSC02124.jpg\" alt=\"DSC02124\" border=\"0\"></a>",
        "teams": "Biosensing, E-Beam Lithography",
        "blurb": "Helped test biosensing chips last sem, am currently working with the E-beam team and improving my coding skills. I am also working on threading the Wire Bonder"
    },
    {
        "name": "Emma Horne",
        "image": "",
        "teams": "Biosensing",
        "blurb": ""
    },
    {
        "name": "Jasraj Dhillon",
        "image": "",
        "teams": "E-Beam Lithography, Fabrication",
        "blurb": ""
    },
    {
        "name": "Mansoor Mamnoon",
        "image": "<a href=\"https://ibb.co/zf6xxb6\"><img src=\"https://i.ibb.co/bdbmmLb/Mamnoon-Mansoor-Image.jpg\" alt=\"Mamnoon-Mansoor-Image\" border=\"0\" /></a>",
        "teams": "Design",
        "blurb": "I am working on the design team to develop an electrochemical camera using CAD software that can handle data from 256 channels simultaneously. Specifically, I am setting up the electronics to design this camera."
    },
    {
        "name": "Ziheng Tang",
        "image": "",
        "teams": "Design",
        "blurb": ""
    },
    {
        "name": "Vivian Huang",
        "image": "",
        "teams": "Biosensing, comsol",
        "blurb": ""
    },
    {
        "name": "Raymond Lin",
        "image": "",
        "teams": "E-Beam Lithography",
        "blurb": "I am focused upon building the Python GUI that creates a simulation of the e-beam lithography."
    },
    {
        "name": "Seoyun Kim",
        "image": "",
        "teams": "Energy Storage",
        "blurb": "I work on testing and developing theoretical models to investigate the functionality of the chips. I conduct tests to analyze the performance and characterize the dielectric layer of the chips looking at humidity, temperature, and pressure."
    },
    {
        "name": "Brandon Wong",
        "image": "",
        "teams": "Design",
        "blurb": "Prototype, design, and manufactures components for muscle mechanotherapy device, as well as vacuum chamber system components."
    },
    {
        "name": "Euijn Ryu",
        "image": "",
        "teams": "Biosensing",
        "blurb": ""
    },
    {
        "name": "Yunzhi Lin",
        "image": "",
        "teams": "Biosensing",
        "blurb": ""
    },
    {
        "name": "Evan Wong",
        "image": "<a href=\"https://ibb.co/sm9GWYm\"><img src=\"https://i.ibb.co/dW4qmYW/20231004-Headshot-AVL-5045.jpg\" alt=\"20231004-Headshot-AVL-5045\" border=\"0\"></a>",
        "teams": "Design",
        "blurb": "I am currently working on the design team to develop an electrochemical camera with CAD to handle data from 256 channels simultaneously."
    },
    {
        "name": "Vedant Agarwal",
        "image": "",
        "teams": "E-Beam Lithography",
        "blurb": ""
    },
    {
        "name": "Zoe Tenenbaum",
        "image": "<a href=\"https://ibb.co/WzN9k0q\"><img src=\"https://i.ibb.co/WzN9k0q/zoetenenbaum.png\" alt=\"zoetenenbaum\" border=\"0\"></a>",
        "teams": "Fabrication",
        "blurb": ""
    },
    {
        "name": "ChenYou Tang",
        "image": "<a href=\"https://ibb.co/B6XNZ4r\"><img src=\"https://i.ibb.co/B6XNZ4r/IMG-2461.jpg\" alt=\"IMG-2461\" border=\"0\"></a>",
        "teams": "Energy Storage",
        "blurb": ""
    },
    {
        "name": "Kayson Yao",
        "image": "",
        "teams": "Business",
        "blurb": ""
    },
    {
        "name": "Ji Choi",
        "image": "https://ibb.co/DK6r9Vh",
        "teams": "Design",
        "blurb": ""
    },
    {
        "name": "Waqas Khalid",
        "image": "<a href=\"https://ibb.co/KVgWGfL\"><img src=\"https://i.ibb.co/SVgBxMd/waqas.jpg\" alt=\"waqas\" border=\"0\"></a>",
        "teams": "Principal Investigator",
        "blurb": ""
    },
    {
        "name": "Minh Pham",
        "image": "<a href=\"https://ibb.co/y6zhT8B\"><img src=\"https://i.ibb.co/y6zhT8B/Portrait-Placeholder.png\" alt=\"Portrait-Placeholder\" border=\"0\"></a>",
        "teams": "Hardware, Software",
        "blurb": "I am working with high-voltage current sensing boards to test with carbon nanotubes and working on developing an e-beam lithography algorithm.",
    },
    {
        name: "Vania Rachel",
        image: `<a href="https://ibb.co/qDRQmfY"><img src="https://i.ibb.co/2Fj4cQ3/me-photo-headshot.jpg" alt="me-photo-headshot" border="0"></a>`,
        teams: "Bio, Simulations, Design",
        blurb: "I work on simulating microfluidic, electrostatic, and particle interactions for our various functionalized CNT applications. I collaborate with many teams on proof-of-concept models and prototyping",
    },
    {
        name: "Tina Chen",
        image: `<a href="https://ibb.co/522rhMF"><img src="https://i.ibb.co/3kkpmrz/1061662577104-pic.jpg" alt="1061662577104-pic" border="0"></a>`,
        teams: "Software, Simulations",
        blurb: "I am currently working on Machine Learning part in Software Design team",
    },
    {
        name: "Tyler Wang",
        image: `<a href="https://ibb.co/bQwN1wb"><img src="https://i.ibb.co/n6dQrdP/tyler-wang-pfp-Tyler-Wang-BS.jpg" alt="tyler-wang-pfp-Tyler-Wang-BS" border="0"/></a>`,
        teams: "Simulations, Biochem, Materials, Energy, Field Emissions",
        blurb:
            "Tyler is currently focusing on detecting low concentrations of biomolecules with specificity in dirty solutions, developing carbon nanotube devices exhibiting supercapacitance, and designing targeted field emission devices for lithography.",
    },
    {
        name: "Richard Tee",
        image: `<a href="https://ibb.co/rFjQx2T"><img src="https://i.ibb.co/gm2rSZH/Richard-Tee-pfp-Richard-Tee.jpg" alt="Richard-Tee-pfp-Richard-Tee" border="0"/></a>`,
        teams: "Design",
        blurb:
            "I am a mechanical engineer on the design team, and we focus on the design and fabrication of carbon nanotube devices and applications. The team and I are hard at work on making the devices a reality and operable for experimentation. We are currently focused on microfluidic systems and field emission devices, and hope to one day build a device for everyone to use.",
    },
    {
        name: "Patricia J. Aurelina",
        image: `<a href="https://ibb.co/nB97YHk"><img src="https://i.ibb.co/HC6tbWg/Patricia-Aurelina-PFP-Patricia-Aurelina.jpg" alt="Patricia-Aurelina-PFP-Patricia-Aurelina" border="0"/></a>`,
        teams: "Simulations, Biochem, Design",
        blurb:
            "I work on simulations using COMSOL to find various values for the systems designed.",
    },
    {
        name: "Phoebe Chang",
        image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/v3p3PZb/Phoebe-Chang-pfp-Phoebe-Chang.jpg" alt="Phoebe-Chang-pfp-Phoebe-Chang" border="0"/></a>`,
        teams: "Materials, Energy",
        blurb:
            "Member of the Materials Science and Energy Storage team, currently working on refining theoretical analysis of temperature changes of thin metal films in the device.",
    },
    {
        name: "Nabeel Sabzwari",
        image: `<a href="https://ibb.co/87XhtfT"><img src="https://i.ibb.co/yQV37ZG/1671067411080-1.jpg" alt="1671067411080-1" border="0"></a>`,
        teams: "Software, Dialysis",
        blurb:
            "Working on debugging GUI implementation on RPi for a peritoneal dialysis device (dialysis) and creating a database using AWS that will contain CNT data (software)",
    },
    {
        name: "Mateusz Aleksander Czajka",
        image: `<a href="https://ibb.co/mXHnJsj"><img src="https://i.ibb.co/614KYhM/nanotech.jpg" alt="nanotech" border="0"></a>`,
        teams: "Materials, Energy, Hardware",
        blurb:
            "I'm designing a nanoscale material that is going to maximize the energy density of the carbon nanotube supercapacitor. Namely, my research focuses on developing a high-k dielectric using the Atomic Layer Deposition technique. Furthermore, I'm creating and optimizing the hardware required to power electric motors with the carbon nanotube supercapacitor.",
    },
]

const principalInvestigator = people.find(person => person.name === "Waqas Khalid");
const otherResearchers = people.filter(person => person.name !== "Waqas Khalid");

const sortedResearchers = otherResearchers.slice().sort((a, b) => {
    const lastNameA = a.name.split(' ').pop() || "";
    const lastNameB = b.name.split(' ').pop() || "";
    return lastNameA.localeCompare(lastNameB);
});

const PeoplePage: React.FC = () => {
    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });

    return (
        <animated.div style={fadeIn} className="text-center font-link">
            <div className="container p-5 mx-auto">
                <h1 className="text-5xl pb-5">
                    Meet the student researchers of the Nanotechnology Laboratory!
                </h1>

                {/* Principal Investigator Row */}
                {principalInvestigator && (
                    <div className="row mb-5 person-container">
                        <div className="col-12">
                            <div className="text-center person-info">
                                <div className="people-image" dangerouslySetInnerHTML={{ __html: principalInvestigator.image }}></div>
                                <h5 className="text-3xl">{principalInvestigator.name}</h5>
                                <p className="card-text font-italic">Principal Investigator</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Other Researchers - Fixed Columns */}
                <div className="row">
                    {sortedResearchers.map((person, index) => (
                        // Check if all fields are complete
                        person.image && person.name && person.teams && person.blurb ? (
                            <div key={index} className="col-md-4">
                                <div className="person-container">
                                    <div className="people-image" dangerouslySetInnerHTML={{ __html: person.image }}></div>
                                    <div className="person-info">
                                        <span className="text-3xl">{person.name}</span>
                                        <p>{person.blurb}</p>
                                        <p className="font-italic">Team(s): {person.teams}</p>
                                    </div>
                                </div>
                            </div>
                        ) : null
                    ))}
                </div>


                <p>Click <a href="/PeopleArchive">here</a> to view past interns.</p>
            </div>
        </animated.div>
    );
}

export default PeoplePage;