import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';
import './People.css'
import { useSpring, animated } from 'react-spring';
import './styles.css'


const people = [
	{
		name: "Alexandro Ochoa",
		image: `<a href="https://ibb.co/v3LPc8j"><img src="https://i.ibb.co/YcfkNGL/Alexandro-Ochoa-pfp-Alexandro-Romero-Ochoa.jpg" alt="Alexandro-Ochoa-pfp-Alexandro-Romero-Ochoa" border="0"/></a>`,
		teams: "Materials, Energy",
		blurb:
			"I'm currently investigating materials with unusual electrical properties for the purpose of fabricating solid state batteries with phenomenally high energy storage densities.",
	},
	{
		name: "Angelo Braganza",
		image: `<a href="https://ibb.co/jynhN7T"><img src="https://i.ibb.co/v301F2H/angelo-braganza-pfp-Angelo-Braganza.jpg" alt="angelo-braganza-pfp-Angelo-Braganza" border="0"/></a>`,
		teams: "Design",
		blurb:
			"My focus is the research, design, and integration of 3D printed models and assemblies. I work with the different components of our PCB devices while considering the role ergonomics, accessibility, appearance, and human interaction have on the implementation of our groundbreaking technology.",
	},
	{
		name: "Anthony Gavin",
		image: `<a href="https://ibb.co/d58nX1B"><img src="https://i.ibb.co/x7xVwPh/Anthoy-Gavin-pfp-Anthony-Gavin.jpg" alt="Anthoy-Gavin-pfp-Anthony-Gavin" border="0"/></a>`,
		teams: "Biochem",
		blurb:
			"Constructing organic synthesis reaction schemes with the intent to functionalize CNTs with new and exciting materials.",
	},
	{
		name: "Anthony Pentrack",
		image: `<a href="https://ibb.co/pjHmxCQ"><img src="https://i.ibb.co/k2LdxYJ/Anthony-Pentrack-pfp-Anthony-Pentrack.jpg" alt="Anthony-Pentrack-pfp-Anthony-Pentrack" border="0"/></a>`,
		teams: "Biochem",
		blurb:
			"I have been working with the other Anthonys and Khoi on a reaction scheme for the functionalization of the carbon nanotubes.",
	},
	{
		name: "Benjamin Heronimus",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/hLHFYmx/benjamin-heronimus-pfp-Benjamin-Heronimus.jpg" alt="benjamin-heronimus-pfp-Benjamin-Heronimus" border="0"/></a>`,
		teams: "Simulations",
		blurb:
			"My work focuses on developing finite element analysis and computational fluid dynamic simulations of the various applications of carbon nanotube technology in order to verify theoretical models and advise the production processes. My simulations have been instrumental in the evaluation of various dielectrics to be applied to our nanotube chips as well as simulating electrostatic interactions at the nanotube level. I am currently working towards developing 3D models of electron beam emission using carbon nanotubes in the hopes of building better e-beam lithography devices.",
	},
	{
		name: "Charles Gordon",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/fpT2kdT/charles-gordon-pfp-Charles-Gordon.jpg" alt="charles-gordon-pfp-Charles-Gordon" border="0"/></a>`,
		teams: "Design, Business",
		blurb:
			"Charles is a UC Berkeley undergraduate on the design and business teams. He works on designing cnt-based designs for lithography and biosensing. ",
	},
	{
		name: "Christopher Yoo",
		image: `<a href="https://ibb.co/WKYxTns"><img src="https://i.ibb.co/bd8Wf17/chris-yoo-pfp-Christopher-Yoo.jpg" alt="chris-yoo-pfp-Christopher-Yoo" border="0"/></a>`,
		teams: "Biochem",
		blurb:
			"Oversee CRISPR-Chip subgroup team to design integration of CRISPR-dCas9 functionalization onto CNTs",
	},
	{
		name: "Ethan Long",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/bmTVsZs/ethan-long-pfp-Ethan-Long.jpg" alt="ethan-long-pfp-Ethan-Long" border="0"/></a>`,
		teams: "Materials, Energy",
		blurb:
			"Research the uses of carbon nanotubes and dielectrics for energy storage applications while designing and creating materials with high dielectric constants utilizing Atomic Layer Deposition (ALD) that can be conjoined with carbon nanotubes to storage energy.",
	},
	{
		name: "Francisco Catanzaro",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/SxVmzwx/francisco-catanzaro-pfp-Francisco-Catanzaro.png" alt="francisco-catanzaro-pfp-Francisco-Catanzaro" border="0"/></a>`,
		teams: "Hardware, Business, Materials, Energy",
		blurb:
			"I'm currently working on market analysis for possible applications of our devices as well as grant writing and obtaining funding. My technical work with the hardware and energy storage teams give me the background knowledge to construct in-depth market analyses and write grants for organizations such as SBIR, NSF, etc.",
	},
	{
		name: "Jorell Gotamco",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/rs4pFdG/profile-pic-Jorell-Gotamco.jpg" alt="profile-pic-Jorell-Gotamco" border="0"/></a>`,
		teams: "Dialysis",
		blurb:
			"I am leading the members to troubleshoot, repair, and further develop the current prototype of the pediatric peritoneal dialysis machine. So far, I have made repairs to the prototype hardware, debugged Arduino code, and tested the full operation of the machine.",
	},
	{
		name: "Justin Ye",
		image: `<a href="https://ibb.co/QXXwK4r"><img src="https://i.ibb.co/yVVjQrW/Justin-Ye-pfp-Justin-Ye.jpg" alt="Justin-Ye-pfp-Justin-Ye" border="0"/></a>`,
		teams: "Materials",
		blurb:
			"I'm currently working on finding a high k dielectric that is also well suited to our carbon nanotubes. Finding a good dielectric will enable our carbon nanotube devices to store a ton of energy, and make a breakthrough in the field of energy storage devices!",
	},
	{
		name: "Katarina Cook",
		image: `<a href="https://ibb.co/9qc1rg5"><img src="https://i.ibb.co/JzmGstJ/katarina-cook-pfp-Katarina-Cook.jpg" alt="katarina-cook-pfp-Katarina-Cook" border="0"/></a>`,
		teams: "Biochem",
		blurb:
			"Katarina is a fourth year Molecular Biology major, with double minors in Global Public Health and Data Science, and is currently one of the mentors on our Biochem team. Although she has worked on the COVID team for over a year, and this semester began to work on the multi-analyte sensor with primary applications for kidney transplant patients, Katarina has a specific passion for assisted reproductive technology. She concurrently works as the Fertility Technician for the Alta Bates Fertility Program and aspires to attend medical school. Recently, Katarina has used our interdisciplinary team to lead an investigation into microfluidic and CNT-based solutions for gametic selection, with applications in both livestock and human IVF cycles. ",
	},
	{
		name: "Khoi Le",
		image: `<a href="https://ibb.co/kDLFN7r"><img src="https://i.ibb.co/HPcQ5SM/Profile-1-Khoi-Le.jpg" alt="Profile-1-Khoi-Le" border="0"/></a>`,
		teams: "Biochem",
		blurb:
			"Functionalization of CNTs. Attaching carboxylate ions on solid CNTs chip in order to couple with CRISPR-dCas9 for COVID-19 detection. Long term goal is to turn functionalized CNTs into biosensors. ",
	},
	{
		name: "Lena Marjanovic",
		image: `<a href="https://imgbb.com/"><img src="https://i.ibb.co/tskRWSM/Lena-Marjanovic-pfp-Lena-Marjanovic.jpg" alt="Lena-Marjanovic-pfp-Lena-Marjanovic" border="0"/></a>`,
		teams: "Materials, Energy",
		blurb:
			"Current focus is on Atomic Layer Deposition for optimizing high-k dielectrics for MIM capacitors and analysis of step down/up converters for Field Emission Simulations.",
	},
	{
		name: "Marcus Hong",
		image: `<a href="https://ibb.co/ZGG3nLN"><img src="https://i.ibb.co/hLLkP7C/Marcus-Hong-PFP-Marcus-Hong.png" alt="Marcus-Hong-PFP-Marcus-Hong" border="0"/></a>`,
		teams: "Software",
		blurb: "Software Manager",
	},
	{
		name: "Mark(Zhiyuan) Yang",
		image: `<a href="https://ibb.co/dWDdYVt"><img src="https://i.ibb.co/r7HCrz3/Zhiyuan-Yang-pfp-Mark-Yang.jpg" alt="Zhiyuan-Yang-pfp-Mark-Yang" border="0"/></a>`,
		teams: "Biochem, Bio Team",
		blurb:
			"Research Covid-19 Biomarkers their linkages and possible application to nanotechnology. ",
	},
	{
		name: "Nabeel Sabzwari ",
		image: `<a href="https://ibb.co/vzff9ZJ"><img src="https://i.ibb.co/LpBBKnC/Screenshot-20211116-132633-Linked-In-Nabeel-Sabzwari.jpg" alt="Screenshot-20211116-132633-Linked-In-Nabeel-Sabzwari" border="0"/></a>`,
		teams: "Software, Dialysis",
		blurb:
			"Working on debugging GUI implementation on RPi for a peritoneal dialysis device (dialysis) and creating a database using AWS that will contain CNT data (software)",
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
		name: "Richard Tee",
		image: `<a href="https://ibb.co/rFjQx2T"><img src="https://i.ibb.co/gm2rSZH/Richard-Tee-pfp-Richard-Tee.jpg" alt="Richard-Tee-pfp-Richard-Tee" border="0"/></a>`,
		teams: "Design",
		blurb:
			"I am a mechanical engineer on the design team, and we focus on the design and fabrication of carbon nanotube devices and applications. The team and I are hard at work on making the devices a reality and operable for experimentation. We are currently focused on microfluidic systems and field emission devices, and hope to one day build a device for everyone to use.",
	},
	{
		name: "Tyler Wang",
		image: `<a href="https://ibb.co/bQwN1wb"><img src="https://i.ibb.co/n6dQrdP/tyler-wang-pfp-Tyler-Wang-BS.jpg" alt="tyler-wang-pfp-Tyler-Wang-BS" border="0"/></a>`,
		teams: "Simulations, Biochem, Materials, Energy, Field Emissions",
		blurb:
			"Tyler is currently focusing on detecting low concentrations of biomolecules with specificity in dirty solutions, developing carbon nanotube devices exhibiting supercapacitance, and designing targeted field emission devices for lithography.",
	},
	{
		name: "Daniela Adler",
		image: `<a href="https://ibb.co/BGh2GVf"><img src="https://i.ibb.co/sCT9Cvg/IMG-5620.jpg" alt="IMG-5620" border="0"></a><br /><a target='_blank' href='https://imgbb.com/'>share picture</a><br />`,
		teams: "Software",
		blurb: "Working as part of the Software - hopefully in the database"
	},
	{
		name: "Nykole Liu",
		image: `<a href="https://ibb.co/VxrcGpF"><img src="https://i.ibb.co/YXYFST5/Wechat-IMG255.jpg" alt="Wechat-IMG255" border="0"></a>`,
		teams: "Software, Design",
		blurb: "Nykole is enthusiastic about doing research in physics, astrophysics, computer science and engineering.",
	},
	{
		name: "Omer Ahmer",
		image: `<a href="https://ibb.co/NxC9QV0"><img src="https://i.ibb.co/nrm7ZgX/8d6fed87-2e30-4021-bae6-8de8ce4c78a9.jpg" alt="8d6fed87-2e30-4021-bae6-8de8ce4c78a9" border="0"></a>`,
		teams: "Software",
		blurb: "I am working on USB communication between the CNT sensors and the computer for faster and more accurate analysis."
	},
]

const People = () => {
	const fadeIn = useSpring({
		from: { opacity: 0 },
		to: { opacity: 1 },
		config: { duration: 1000 }, // Adjust the duration as needed
	});
	return (
		<animated.div style={fadeIn}>
			<div className="container p-5">
				<h1 className="text-center text-5xl pb-5">
					Meet the student researchers of the Nanotechnology Laboratory!
				</h1>

				{people.map((el) => (
					<div key={el.name} className="row text-center mb-5">
						{/* Person text (Left column) */}
						<div className="col-md-6">
							<div className="d-flex flex-column align-items-center">
								<span className="text-3xl italic">{el.name}</span>
								<hr className="w-25 my-4 bg-white" />
								<span className="">{el.blurb}</span>
								<br />
								<span className="font-italic">Team(s): {el.teams}</span>
							</div>
						</div>
						{/* Person image (Right column) */}
						<div className="col-md-6">
							<div className="h-48 w-48 mx-auto">
								<div
									className="overflow-hidden"
									dangerouslySetInnerHTML={{ __html: el.image }}
								></div>
							</div>
						</div>
					</div>
				))}
			</div>
		</animated.div>
	)
}

export default People;