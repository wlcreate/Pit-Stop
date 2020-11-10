import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import AddTripModal from './AddTripModal'
import TripCard from './TripCard'
import Img1 from './TravelQuotes/1.png'
import Img2 from './TravelQuotes/2.png'
import Img3 from './TravelQuotes/3.png'
import Img4 from './TravelQuotes/4.png'
import Img5 from './TravelQuotes/5.png'
import Img6 from './TravelQuotes/6.png'
import Img7 from './TravelQuotes/7.png'
import Img8 from './TravelQuotes/8.png'
import Img9 from './TravelQuotes/9.png'
import Img10 from './TravelQuotes/10.png'
import Img11 from './TravelQuotes/11.png'
import Img12 from './TravelQuotes/12.png'
import Img13 from './TravelQuotes/13.png'
import Img14 from './TravelQuotes/14.png'
import Img15 from './TravelQuotes/15.png'
import Img16 from './TravelQuotes/16.png'
import Img17 from './TravelQuotes/17.png'

class TripsContainer extends React.Component{

    render(){

        let arrayOfComponents = this.props.trips.map(tripObj => {
            return <TripCard key={tripObj.id} trip={tripObj}/>
        })

        let travelQuotes = [
            "We travel not to escape life, but for life to not escape us. - Robyn Yong",
            "Once a year go someplace you've never been before. - Dalai Lama",
            "Wherever you go, go with all your heart. - Confucius",
            "Travel opens your heart, broadens your mind and fills your life with stories to tell. - Paula Bendfeldt",
            "Oh, the places you will go! - Dr. Seuss",
            "Travel makes one modest. You see what a tiny place you occupy in the world. - Gustave Flaubert",
            "Travel changes you. As you move through this life and this world you change things slightly, you leave marks behind, however small. And in return, life and travel leaves marks on you. - Anthony Bourdain",
            "Travel is about the gorgeous feeling of teetering in the unknown. - Anthony Bourdain",
            "Travel isn't always pretty. It isn't always comfortable. Sometimes it hurts, it even breaks your heart. But that's okay. - Anthony Bourdain",
            "Traveling tends to magnify all human emotions. - Peter Hong",
            "A nomad I will remain for life, in love with distant and uncharted places. - Isabelle Eberhardt",
            "Wherever you go becomes a part of you somehow. - Anita Desai",
            "We travel for romance, we travel for architecture, and we travel to be lost. - Ray Bradbury",
            "It's a funny thing coming home. Nothing changes. Everything looks the same, feels the same, even smells the same. You realize what's changed is you. - F. Scott Fitzgerald",
            "I'm not sure what I'll do, but - well, I want to go places and see people. I want my mind to grow. I want to live where things happen on a big scale. - F. Scott Fitzgerald",
            "It is good to have an end to journey toward; but it is the journey that matters in the end. - Ernest Hemingway",
            "Our happiest moments as tourists always seem to come when we stumble upon one thing while in pursuit of something else. - Lawrence Block"
        ]
        
        let randomQuote = travelQuotes[Math.floor(Math.random() * travelQuotes.length)]

        let imagesArray = [
            Img1, Img2, Img3, Img4, Img5, Img6, Img7, Img8, Img9, Img10, Img11, Img12, Img13, Img14, Img15, Img16, Img17
        ]

        let randomImage = imagesArray[Math.floor(Math.random() * imagesArray.length)]

        return(
            <div className="trips-container">
                <h1 id="hi-user">Hi {this.props.full_name} 👋🏼</h1>
                {/* <div id="travel-quote">
                    <img id="travel-quote-img" src={TripImage} alt="Trip Page Quote"/>
                    <p id="travel-quote-text">{randomQuote}</p>
                </div> */}
                <img id="travel-quote-img" src={randomImage} alt={randomQuote}/>
                <h2 className="card-group-title">Check out all of your trips</h2>
                <AddTripModal />
                <CardGroup className="trips-card-group">
                    {arrayOfComponents}
                </CardGroup>
            </div>
        )
    }
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
    return {
        full_name: globalState.user.user.full_name,
        trips: globalState.user.trips
    }
}

export default connect(mapStateToProps)(withRouter(TripsContainer))