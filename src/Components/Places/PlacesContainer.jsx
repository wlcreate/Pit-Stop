import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import PlaceCard from './PlaceCard'
import AddPlaceModal from './AddPlaceModal'
import UpdateTripForm from '../Trips/UpdateTripForm'

class PlacesContainer extends React.Component{

    state = {
        showForm: false
    }

    componentDidMount(){
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(categoriesArray => {
            // console.log(categoriesArray)
            this.props.setCategories(categoriesArray)
        })
    }

    handleUpdate = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleDelete = () => {
        console.log("I've been clicked to delete the Trip!")
        this.props.history.push("/trips")
        fetch(`http://localhost:3000/trips/${this.props.trip.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            }
        })
        .then(res => res.json())
        .then(deletedObj => {
            // console.log(deletedObj)
            this.props.deleteTrip(deletedObj)
        })
    }

    render(){

        let {title, start_nice_timestamp, end_nice_timestamp, description} = this.props.trip

        let arrayOfComponents = this.props.places.map(placeObj => {
            return <PlaceCard key={placeObj.id} trip={this.props.trip} place={placeObj}/>
        })

        return(
            <div className="places-container">
                <div id="trip-info">
                    <h1>{title}</h1>
                    <h3>{start_nice_timestamp} - {end_nice_timestamp}</h3>
                    <p>{description}</p>
                    <div>
                            <button className="ui red button" onClick={this.handleDelete}>
                                Delete
                            </button>
                            <Button onClick={this.handleUpdate}>Edit Trip</Button>
                    </div>
                </div>
                {
                    this.state.showForm
                    ?
                    <UpdateTripForm handleUpdate={this.handleUpdate}/>
                    :
                    null
                }
                {/* <Button onClick={this.handleAddPlace}>Add a Place</Button> */}
                <h2 className="card-group-title">Where I went</h2>
                <AddPlaceModal />
                <CardGroup className="places-card-group">
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
        trip: globalState.user.chosen_trip,
        token: globalState.user.token
    }
}

// Action Creator
let setCategories = (allCategories) => {
    return {
        type: "SET_CATEGORIES",
        payload: allCategories
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let deleteTrip = (deletedTrip) => {
    return {
        type: "DELETE_TRIP",
        payload: deletedTrip
    }
}

// sending information
let mapDispatchToProps = {
    setCategories: setCategories,
    deleteTrip: deleteTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlacesContainer))