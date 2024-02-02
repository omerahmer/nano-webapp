import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'

const Biosensor = () => {
    const navigate = useNavigate()
    async function populateBiosensor() {
        try {
            const req = await fetch('http://localhost:1337/api/Biosensor', {
                headers: {
                    'x-access-token': localStorage.getItem('token')
                },
            });
    
            const data = await req.json(); // Await here
            console.log(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const user = decodeToken(token)
            if (!user) {
                localStorage.removeItem('token')
                navigate('/login')
            } else {
                populateBiosensor()
            }
        }
    })

    const fadeIn = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    });
    return (
        <animated.div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column" style={fadeIn}>
        </animated.div>
    )
}

export default Biosensor;