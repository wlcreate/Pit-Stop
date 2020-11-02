import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import UpdatePlaceForm from '../Places/UpdatePlaceForm'
import ReflectionCard from './ReflectionCard'

class ReflectionsContainer extends React.Component{

    state = {
        showForm: false
    }

    handleEditPlace = (evt) => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    handleAddReflection = (evt) => {
        
    }

    render(){

        let {name, address, area, country, revisit, category} = this.props.place
        console.log(revisit)
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
                    {/* NEED TO FIGURE OUT THIS LOGIC */}
                    <p>Revisit?
                    {
                        {revisit}
                        ?
                        "Yes"
                        :
                        "No"
                    }
                    </p>
                    <Button onClick={this.handleEditPlace}>Edit Place</Button>
                </div>
                {
                    this.state.showForm
                    ?
                    <UpdatePlaceForm handleEditPlace={this.handleEditPlace}/>
                    :
                    null
                }
                <h2 className="card-group-title">My Reflections</h2>
                <Button color='teal' onClick={this.handleAddReflection}>Add a Reflection</Button>
                <CardGroup className="reflections-card-group">
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
    // let place = globalState.user.places.find(place => place.reflections === globalState.user.reflections)
    // let trip = globalState.user.trips.find(trip => trip.places.includes(place))

    return {
        reflections: globalState.user.reflections,
        place: globalState.user.chosen_place,
        trip: globalState.user.chosen_trip,
        token: globalState.user.token
    }
}

export default connect(mapStateToProps)(withRouter(ReflectionsContainer))