import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

class TripCard extends React.Component{

    handleClick = () => {
        this.props.setPlacesInfo(this.props.trip)
        this.props.history.push(`/trips/${this.props.trip.id}/places`)
    }

    handleDelete = () => {
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

        return(
            <Card>
                <Card.Content onClick={this.handleClick}>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{start_nice_timestamp} - {end_nice_timestamp}</Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <div onClick={this.handleDelete}>
                        <Button floated='right' className="ui right floated red button">
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let setPlacesInfo = (tripInfo) => {
    return {
        type: "SET_PLACES",
        payload: tripInfo
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

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    setPlacesInfo: setPlacesInfo,
    deleteTrip: deleteTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TripCard))