import React from 'react';
import './Team.css'
import team1 from '../../assets/team1.jpg'
import team2 from '../../assets/team2.jpg'
import team3 from '../../assets/team3.jpg'

const Team = () => {
    return (
        <section id="team">
            <h2>Meet the Team</h2>
            <div class="team-grid">
                <div class="team-member">
                    <img src={team1} alt="Team Member 1" />
                    <h3>John Doe</h3>
                    <p>Founder & CEO</p>
                    <p>John is the visionary behind PandemicInfo, passionate about providing the public with accurate and timely health information.</p>
                </div>
                <div class="team-member">
                    <img src={team2} alt="Team Member 2" />
                    <h3>Jane Smith</h3>
                    <p>Lead Developer</p>
                    <p>Jane leads the technical team, ensuring the website runs smoothly and that the data presented is accurate and up-to-date.</p>
                </div>
                <div class="team-member">
                    <img src={team3} alt="Team Member 3" />
                    <h3>Michael Johnson</h3>
                    <p>Operations Manager</p>
                    <p>Michael manages the day-to-day operations of PandemicInfo, making sure everything runs efficiently and according to plan.</p>
                </div>
            </div>
        </section>
    );
}

export default Team;
