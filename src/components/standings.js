import { useState, useEffect } from "react"
import '../styles/standings.css'
import { Link } from "react-router-dom"
export default function Standings() {
    const [competition, setCompetition] = useState('championsleague')
    const [standingsData, setStandingsData] = useState(null)

    useEffect(() => {
        fetch(`https://football98.p.rapidapi.com/${competition}/table`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": 'football98.p.rapidapi.com',
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                setStandingsData(data)
                console.log(data)
            })

    }, [competition])
    return (
        <div className="Standings">
            <Link to='/'>
                <span className="material-symbols-outlined">
                    arrow_back
                </span>
            </Link>
            <div className="leagueSelect">
                <button className={competition === 'championsleague' && 'active'} id="championsleague" onClick={({ target }) => setCompetition(target.id)}>Champions League</button>
                <button className={competition === 'premierleague' && 'active'} id="premierleague" onClick={({ target }) => setCompetition(target.id)}>Premier League</button>
                <button className={competition === 'laliga' && 'active'} id="laliga" onClick={({ target }) => setCompetition(target.id)}>Laliga</button>
                <button className={competition === 'europaleague' && 'active'} id="europaleague" onClick={({ target }) => setCompetition(target.id)}>Europa League</button>
                <button className={competition === 'bundesliga,bundesliga' && 'active'} id="bundesliga,bundesliga" onClick={({ target }) => setCompetition(target.id)}>Bundesliga</button>
                <button className={competition === 'seriea' && 'active'} id="seriea" onClick={({ target }) => setCompetition(target.id)}>Serie A</button>
            </div>
            <div className="standingsContainer">
                <div className="standingsHeader">
                    <div></div>
                    <div className="standingsHeaderLeft">
                        <div>P</div>
                        <div>W</div>
                        <div>D</div>
                        <div>L</div>
                        <div>GD</div>
                        <div>PTS</div>
                    </div>
                </div>
                {standingsData && standingsData.map((club, index) => <div key={index} className='standings'>
                    <div className="standingsLeft">
                        <div>{club.Position}</div>
                        <img src={club.SquadLogo} alt={club.Name} />
                        <div>{club.Name}</div>
                    </div>
                    <div className="standingsRight">
                        <div>{club.Played}</div>
                        <div>{club.Winned}</div>
                        <div>{club.Tie}</div>
                        <div>{club.Loosed}</div>
                        <div>{club['Goal Difference']}</div>
                        <div>{club.Points}</div>
                    </div>
                </div>)}
            </div>
        </div>
    )
}