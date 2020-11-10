import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Label } from 'semantic-ui-react'

class PlaceCard extends React.Component{

    handleClick = () => {
        this.props.setReflectionsInfo(this.props.place)
        this.props.history.push(`/trips/${this.props.trip.id}/places/${this.props.place.id}/reflections`)
    }

    // handleDelete = (evt) => {
    //     this.props.history.push("/trips")
    //     fetch(`http://localhost:3000/places/${this.props.place.id}`, {
    //         method: "DELETE",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Authorization": this.props.token
    //         }
    //     })
    //     .then(res => res.json())
    //     .then(response => {
    //         console.log(response)
    //         this.props.deletePlace(response)
    //     })
    // }

    render(){
        let {name, category, area, country, revisit} = this.props.place
        // console.log(revisit)
        return(
            <Card>
                <Card.Content onClick={this.handleClick}>
                    <Card.Header>{name}</Card.Header>
                    {/* <Card.Meta>{category.name}</Card.Meta> */}
                    <Card.Description>
                        {area}, {country}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <div>
                        <a className="ui blue label">
                            {category.name}
                        </a>
                        {
                            revisit
                            ?
                            <a className="ui purple label">
                                Revisit
                            </a>
                            :
                            null
                        }
                    
                    </div>
                    
                </Card.Content>
                {/* <Card.Content>
                    <div onClick={this.handleDelete}>
                        <Button floated='right' className="ui right floated red button">
                            Delete
                        </Button>
                    </div>
                </Card.Content> */}
            </Card>
        )
    }
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token,
        trip: globalState.user.chosen_trip
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let setReflectionsInfo = (placeInfo) => {
    return {
        type: "SET_REFLECTIONS",
        payload: placeInfo
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
    setReflectionsInfo: setReflectionsInfo,
    deletePlace: deletePlace
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PlaceCard))