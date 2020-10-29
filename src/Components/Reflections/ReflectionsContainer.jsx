import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { CardGroup } from 'semantic-ui-react'
import { Button } from 'semantic-ui-react'
import ReflectionCard from './ReflectionCard'

class ReflectionsContainer extends React.Component{

    handleEditPlace = (evt) => {

    }

    handleAddReflection = (evt) => {
        
    }

    render(){

        let {name, address, area, country, revisit, category} = this.props.place

        let arrayOfComponents = this.props.reflections.map(reflectionObj => {
            return <ReflectionCard key={reflectionObj.id} reflection={reflectionObj}/>
        })

        return(
            <div>
                <h1>{name}</h1>
                <h3>{category.name}</h3>
                <h3>{area}, {country}</h3>
                <p>{address}</p>
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
                <br></br>
                <br></br>
                <Button onClick={this.handleAddReflection}>Add a Reflection</Button>
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
    let place = globalState.places.find(place => place.reflections === globalState.reflections)
    let trip = globalState.trips.find(trip => trip.places.includes(place))
    return {
        reflections: globalState.reflections,
        place: place,
        trip: trip
    }
}

export default connect(mapStateToProps)(withRouter(ReflectionsContainer))