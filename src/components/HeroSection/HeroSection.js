import React from "react";
import "./HeroSection.css";

const HeroSection = ({head,body,btn=false}) => {
  return (
    <section id="hero">
      <h1>{head}</h1>
      <p>{body}</p>
      {btn&&<button onClick={() => window.location.href = '/about'}>Learn More</button>}
    </section>
  );
};

export default HeroSection;
