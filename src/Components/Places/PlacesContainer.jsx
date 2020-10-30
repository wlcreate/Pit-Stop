import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import PlaceCard from './PlaceCard'
import AddPlaceModal from './AddPlaceModal'

class PlacesContainer extends React.Component{

    componentDidMount(){
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(categoriesArray => {
            // console.log(categoriesArray)
            this.props.setCategories(categoriesArray)
        })
    }

    render(){

        let {title, start_date, end_date, description} = this.props.trip

        let arrayOfComponents = this.props.places.map(placeObj => {
            return <PlaceCard key={placeObj.id} trip={this.props.trip} place={placeObj}/>
        })

        return(
            <div>
                <h1>{title}</h1>
                <h3>{start_date} - {end_date}</h3>
                <p>{description}</p>
                <Button>Edit Trip</Button>
                <br></br>
                <br></br>
                {/* <Button onClick={this.handleAddPlace}>Add a Place</Button> */}
                <AddPlaceModal />
                <CardGroup>
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
    // debugger
    // let trip = globalState.user.trips.filter(trip => {
    //     debugger
    //     return trip.places === globalState.user.places
    // }).pop()
    // let trip = globalState.user.trips.find(trip => trip.places === globalState.user.places)
    return {
        places: globalState.user.places,
        trip: globalState.user.chosen_trip
    }
}

// Action Creator
let setCategories = (allCategories) => {
    return {
        type: "SET_CATEGORIES",
        payload: allCategories
    }
}

// sending information
let mapDispatchToProps = {
    setCategories: setCategories
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlacesContainer))