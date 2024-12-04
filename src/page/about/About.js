import React from 'react';
import './About.css'
import HeroSection from '../../components/HeroSection/HeroSection';
import Team from '../../components/team/Team';

const About = () => {
  const { head, body } = {
    head: 'About PandemicInfo',
    body: 'Your trusted source for global pandemic information, offering real-time updates, maps, and essential resources to keep you and your loved ones safe.'
  }


  useEffect(() => {
    document.title = `PandemicInfo | About`;
    fetchData();
  }, []);

  return (
    <>
      <HeroSection head={head} body={body} />

      <section id="mission">
        <h2>Our Mission</h2>
        <p>At PandemicInfo, our goal is to provide reliable, real-time information about COVID-19, offering detailed global statistics, local resources, and essential safety tips. We strive to keep individuals informed and safe in the face of a global health crisis.</p>
      </section>

      <Team/>
    </>
  );
}

export default About;
