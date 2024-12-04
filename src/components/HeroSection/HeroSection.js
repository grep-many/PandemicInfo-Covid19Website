import React from "react";
import "./HeroSection.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const HeroSection = ({head,body,btn=false}) => {
  return (
    <section id="hero">
      <h1>{head}</h1>
      <p>{body}</p>
      {btn&&<Link to='/about' className='btn'>Learn More</Link>}
    </section>
  );
};

export default HeroSection;
