import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../styles/fixture.css'
export default function Fixtures(){
    const [competition, setCompetition] = useState('championsleague')
    const [fixtureData, setFixtureData] = useState(null)

    useEffect(() => {
        fetch(`https://football98.p.rapidapi.com/${competition}/fixtures`, {
            "method": "GET",
            "headers": {
              "x-rapidapi-host": 'football98.p.rapidapi.com',
              "x-rapidapi-key":process.env.REACT_APP_API_KEY 
            }
          })
          .then(response => response.json())
          .then(data => {
            setFixtureData(data)
            console.log(data)
          })
       
    }, [competition])
    return(
        <div className="fixtures">
            <Link to='/'>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Link>
            <div className="leagueSelect">
                <button className={competition === 'championsleague' && 'active'} id="championsleague" onClick={({target}) => setCompetition(target.id)}>Champions League</button>
                <button className={competition === 'premierleague' && 'active'} id="premierleague" onClick={({target}) => setCompetition(target.id)}>Premier League</button>
                <button className={competition === 'laliga' && 'active'} id="laliga" onClick={({target}) => setCompetition(target.id)}>Laliga</button>
                <button className={competition === 'europaleague' && 'active'} id="europaleague" onClick={({target}) => setCompetition(target.id)}>Europa League</button>
                <button className={competition === 'bundesliga,bundesliga' && 'active'} id="bundesliga,bundesliga" onClick={({target}) => setCompetition(target.id)}>Bundesliga</button>
                <button className={competition === 'seriea' && 'active'} id="seriea" onClick={({target}) => setCompetition(target.id)}>Serie A</button>
            </div>
           {fixtureData && <div className="fixtureContainer">
                {Object.keys(fixtureData[0]).map(key => <div key={key}>
                    <h2>
                        {key}
                    </h2>
                    <div>
                        {fixtureData[0][key].map((fixture, index) => <div className="matchesContainer" key={index}>
                            <h3>
                                {fixture.MatchDay}
                            </h3>
                            <div className="matches">
                                <div>
                                    <img src={fixture.homeLogo} alt={fixture.homeTeam} />
                                    <div>{fixture.homeTeam}</div>
                                </div>
                                <h2>VS</h2>
                                <div>
                                    <img src={fixture.awayLogo} alt={fixture.awayTeam} />
                                    <div>{fixture.awayTeam}</div>
                                </div>
                            </div>
                        </div>)}
                    </div>
                </div>)}
            </div>}
        </div>
    )
}