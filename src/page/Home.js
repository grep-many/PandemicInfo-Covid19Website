import React from 'react';
import Statistics from '../components/statistics/Statistics';
import MapSection from '../components/mapSection/MapSection';
import HeroSection from '../components/HeroSection/HeroSection';

const Home = () => {

  const {head,body} = {
    head:'Stay Informed. Stay Safe.',
    body:'Your one-stop source for COVID-19 updates, live maps, and essential information to keep you and your loved ones protected.'
  }

  return (
    <>
      <HeroSection head={head} body={body} btn={true}/>
      <MapSection/>
      <Statistics />
    </>
  );
}

export default Home;
