import { useState, useEffect } from "react"
import '../styles/standings.css'
import '../styles/news.css'
import { Link } from "react-router-dom"
export default function News() {
    const [competition, setCompetition] = useState('championsleague')
    const [newsData, setNewsData] = useState(null)

    useEffect(() => {
        fetch(`https://football98.p.rapidapi.com/${competition}/news`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": 'football98.p.rapidapi.com',
                "x-rapidapi-key": process.env.REACT_APP_API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                setNewsData(data)
                console.log(data)
            })

    }, [competition])
    return (
        <div className="News">
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
            <div>
                {newsData && newsData.map((news, index) =><div className="newsContainer" key={index} >
                     <a href={news.NewsLink} target='blank' >
                        
                        <img className="newsImage" src={news.Image} alt="" />
                        <div>
                            <div>{news.PublisherDate}</div>
                            <div>
                                <img src={news.PublisherLogo} alt="publisher" />
                                <div>{news.PublisherName}:</div>
                            </div>
                            <div>{news.Title}</div>
                        </div>
                    </a>
                </div>)}
            </div>
          
        </div>
    )
}