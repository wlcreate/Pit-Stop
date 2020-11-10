import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import UpdatePlaceForm from '../Places/UpdatePlaceForm'
import ReflectionCard from './ReflectionCard'
import AddReflectionForm from './AddReflectionForm'

class ReflectionsContainer extends React.Component{

    state = {
        showEditForm: false
    }

    handleEditPlace = () => {
        this.setState({
            showEditForm: !this.state.showEditForm
        })
    }

    handlePlaceDelete = (evt) => {
        this.props.history.push("/trips")
        fetch(`http://localhost:3000/places/${this.props.place.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.props.deletePlace(response)
        })
    }

    render(){

        let {name, address, area, country, revisit, category} = this.props.place

        let arrayOfComponents = this.props.reflections.map(reflectionObj => {
            return <ReflectionCard key={reflectionObj.id} reflection={reflectionObj}/>
        })

        return(
            <div className="reflections-container">
                <div id="place-info">
                    <h1>{name}</h1>
                    <h3>{category.name}</h3>
                    <h3>{area}, {country}</h3>
                    <p>{address}</p>
                    <p>Revisit?
                    {
                        revisit
                        ?
                        " Yes"
                        :
                        " No"
                    }
                    </p>
                    <div>
                        <Button color="yellow" onClick={this.handleEditPlace}>Edit Place</Button>
                        <button className="ui red button" onClick={this.handlePlaceDelete}>
                            Delete
                        </button>
                    </div> 
                </div>
                {
                    this.state.showEditForm
                    ?
                    <UpdatePlaceForm handleEditPlace={this.handleEditPlace}/>
                    :
                    null
                }
                <h2 id="reflection-cards-title">My Reflections</h2>
                <CardGroup className="reflections-card-group">
                    {arrayOfComponents}
                </CardGroup>
                <AddReflectionForm />
            </div>
        )
    }
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
    // let place = globalState.user.places.find(place => place.reflections === globalState.user.reflections)
    // let trip = globalState.user.trips.find(trip => trip.places.includes(place))

    return {
        reflections: globalState.user.reflections,
        place: globalState.user.chosen_place,
        trip: globalState.user.chosen_trip,
        token: globalState.user.token
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let deletePlace = (deletedInfo) => {
    return {
        type: "DELETE_PLACE",
        payload: deletedInfo
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    deletePlace: deletePlace
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReflectionsContainer))