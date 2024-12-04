import React, { useEffect, useState } from "react";
import "./Statistics.css";
import data from '../data'

const Statistics = () => {
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);

  useEffect(() => {

    if (data) {
      let cases = 0, deaths = 0, recovered = 0;
      data.forEach(location => {
        cases += location.infected;
        deaths += location.dead;
        recovered += location.recovered;
      });
      setTotalCases(cases);
      setTotalDeaths(deaths);
      setTotalRecovered(recovered);
    }
  }, []);

  return (
    <section id="stats">
      <h2>Global Statistics</h2>
      <div className="stats-grid">
        <div className="stat-item">
          <h3>Cases</h3>
          <p>{totalCases.toLocaleString()}</p>
        </div>
        <div className="stat-item">
          <h3>Deaths</h3>
          <p>{totalDeaths.toLocaleString()}</p>
        </div>
        <div className="stat-item">
          <h3>Recovered</h3>
          <p>{totalRecovered.toLocaleString()}</p>
        </div>
      </div>
    </section>
  );
};

export default Statistics;
