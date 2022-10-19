import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns'
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'
import standingsPic from '../Annotation 2022-10-19 074832.png'
import newsPic from '../newspic.png'
import resultPic from '../resultpic.png'


export default function DashBoard(){
    const [video, setVideo] = useState(null)
    const frame = useRef()
   
    useEffect(() =>  {
        fetch('https://www.scorebat.com/video-api/v3/feed/?token=Mjk5MDJfMTY2NjEyNTk2M181YWI4OTBmYTVjYmRlOTM2NjQzZDJkMjZhYTM3MDkwZWVjZjlkNmMx')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setVideo(data)
        })
    }, [])

  
    return(
        <div className='dashboard'>
            <div className="dashboardContainer">
                <Link to = 'fixtures' className='fixtureGrid'>
                    <div>Fixtures</div>
                    <div>{format(new Date(), 'yyyy/MM/dd')}</div>
                </Link>
                <div className='videoGrid'>
                    {video && <div ref={frame} className='videoEmbed' dangerouslySetInnerHTML={{__html: video.response[Math.floor(Math.random()*video.response.length -1)].videos[0].embed}}>
                    </div>}
                </div>
                <Link to='news' className='newsGrid'>
                    <div>News</div>
                    <img src={newsPic} alt="news" />
                </Link>
                <Link to='standings' className='standingsGrid'>
                    <div>Standings</div>
                    <img src={standingsPic} alt="standings" />
                </Link>
                <Link to='results' className='resultsGrid'>
                    <div>Results</div>
                    <img src={resultPic} alt="results" />
                </Link>
            </div>

        </div>
    )
}