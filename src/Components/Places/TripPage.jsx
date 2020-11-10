import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import AddPlaceModal from './AddPlaceModal'
import UpdateTripForm from '../Trips/UpdateTripForm'
import PlacesSearch from './PlacesSearch'
import PlacesCategoryFilter from './PlacesCategoryFilter'
import PlacesRevisitFilter from './PlacesRevisitFilter'
import PlacesContainer from './PlacesContainer'
import PlacesMap from './PlacesMap'

class TripPage extends React.Component{

    state = {
        showForm: false,
        searchTerm: "",
        selectedCategory: "All",
        selectedRevisit: "All"
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

    handleTripDelete = () => {
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

     // logic for updating the search term
     changeSearchTerm = (userInput) => {
        this.setState({
            searchTerm: userInput
        })
    }

    // logic for changing the category
    changeSelectedCategory = (chosenCategory) => {
        this.setState({
          selectedCategory: chosenCategory
        })
    }

    changeSelectedRevisit = (chosenRevisit) => {
        this.setState({
            selectedRevisit: chosenRevisit
        })
    }

    findPlaces = () => {
        if (this.state.selectedCategory === "All" && this.state.selectedRevisit === "All"){
            let searchedPlaces = this.props.places.filter(place => {
                return place.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
            })
            return searchedPlaces
        } else if (this.state.selectedCategory !== "All" && this.state.selectedRevisit === "All") {
            let searchedPlaces = this.props.places.filter(place => {
                // debugger
                return place.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) && place.category.name === this.state.selectedCategory
            })
            return searchedPlaces
        } else if (this.state.selectedCategory === "All" && this.state.selectedRevisit !== "All") {
            let searchedPlaces = this.props.places.filter(place => {
                // debugger
                return place.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) && place.revisit.toString() === this.state.selectedRevisit // ! error: cannot read property toString of null -> tried in console and w/o toString they are not ===
            })
            return searchedPlaces
        } else if (this.state.selectedCategory !== "All" && this.state.selectedRevisit === true.toString()) {
            let searchedPlaces = this.props.places.filter(place => {
                // debugger
                return place.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) && place.category.name === this.state.selectedCategory && place.revisit === true
            })
            return searchedPlaces
        } else if (this.state.selectedCategory !== "All" && this.state.selectedRevisit === false.toString()) {
            let searchedPlaces = this.props.places.filter(place => {
                // debugger
                return place.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()) && place.category.name === this.state.selectedCategory && place.revisit === false
            })
            return searchedPlaces
        }
    }

    render(){

        let {title, start_nice_timestamp, end_nice_timestamp, description} = this.props.trip

        // let arrayOfComponents = this.props.places.map(placeObj => {
        //     return <PlaceCard key={placeObj.id} place={placeObj}/>
        // })

        return(
            <div className="places-container">
                <div id="trip-info">
                    <h1>{title}</h1>
                    <h3>{start_nice_timestamp} - {end_nice_timestamp}</h3>
                    <p>{description}</p>
                    <div>
                            <Button color="yellow" onClick={this.handleUpdate}>Edit Trip</Button>
                            <button className="ui red button" onClick={this.handleTripDelete}>
                                Delete
                            </button>
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
                <h2 className="card-group-title">All the places I stopped at</h2>
                {/* <PlacesMap places={this.findPlaces()}/> */}
                <div id="search-filter">
                    <PlacesSearch searchTerm={this.state.searchTerm} changeSearchTerm={this.changeSearchTerm}/>
                    <PlacesRevisitFilter selectedRevisit={this.state.selectedRevisit} changeSelectedRevisit={this.changeSelectedRevisit}/>
                    <PlacesCategoryFilter selectedCategory={this.state.selectedCategory} changeSelectedCategory={this.changeSelectedCategory}/>
                    <AddPlaceModal />
                </div>
                <PlacesContainer places={this.findPlaces()}/>
                {/* <CardGroup className="places-card-group">
                    {arrayOfComponents}
                </CardGroup> */}
            </div>
        )
    }
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripPage))