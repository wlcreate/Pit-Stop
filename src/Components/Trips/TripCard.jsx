import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card } from 'semantic-ui-react'

class TripCard extends React.Component{

    handleClick = () => {
        this.props.setPlacesInfo(this.props.trip)
        this.props.history.push(`/trips/${this.props.trip.id}/places`)
    }

    render(){
        
        let {title, start_date, end_date, description} = this.props.trip

        return(
            <Card onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>{title}</Card.Header>
                    <Card.Meta>{start_date} - {end_date}</Card.Meta>
                    <Card.Description>
                        {description}
                    </Card.Description>
                </Card.Content>
            </Card>
        )
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let setPlacesInfo = (tripInfo) => {
    return {
        type: "SET_PLACES",
        payload: tripInfo.places
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    setPlacesInfo: setPlacesInfo
}

export default connect(null, mapDispatchToProps)(withRouter(TripCard))