import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

class PlaceCard extends React.Component{

    handleClick = () => {
        this.props.setReflectionsInfo(this.props.place)
        this.props.history.push(`/trips/${this.props.trip.id}/places/${this.props.place.id}/reflections`)
    }

    render(){
        let {name, area, country} = this.props.place
        return(
            <Card onClick={this.handleClick}>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{this.props.place.category.name}</Card.Meta>
                    <Card.Description>
                        {area}, {country}
                    </Card.Description>
                </Card.Content>
                <Card.Content>
                    <div>
                        <Button floated='right' basic color='red'>
                            Delete
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        )
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let setReflectionsInfo = (placeInfo) => {
    return {
        type: "SET_REFLECTIONS",
        payload: placeInfo.reflections
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    setReflectionsInfo: setReflectionsInfo
}

export default connect(null, mapDispatchToProps)(withRouter(PlaceCard))