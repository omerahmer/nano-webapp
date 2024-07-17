import React, { useEffect, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { Container } from 'react-bootstrap';


// @ts-ignore

import OldB from "./OldB"

import "../../index.css";

const Biosensor = () => {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
        const user = decodeToken(token);
        if (!user) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        setLoading(false);
        const req = await fetch(
          "https://nanotech.studentorg.berkeley.edu/api/Biosensor",
          {
            headers: {
              "x-access-token": token,
            },
          },
        );
        const data = await req.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchData();
    return () => {
      // Any cleanup logic (e.g., canceling requests, unsubscribing from subscriptions)
    };
  }, [navigate]);

  // Render loading state
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <animated.div className="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column font-link" style={fadeIn}>
      <Container className="mt-5 font-link">
        <h1 className="mb-4">Biosensor</h1>
        <p className="overview">Simulation page -- still under construction.</p>
      </Container>
      <OldB />
      <h1 className="mb-4" style={{ padding: "20px" }}>Links</h1>
    </animated.div>
  );
};

export default Biosensor;
