import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'

class ReflectionCard extends React.Component{

    // handleClick = () => {
    //     this.props.setReflectionsInfo(this.props.place)
    //     this.props.history.push(`/trips/${this.props.trip.id}/places/${this.props.place.id}/reflections`)
    // }

    render(){
        let {nice_timestamp, rating, content} = this.props.reflection
        return(
            <Card>
                <Card.Content>
                    <Card.Header>{nice_timestamp}</Card.Header>
                    <Card.Meta>Rating: {rating}</Card.Meta>
                    <Card.Description>
                        {content}
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

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component

export default connect()(withRouter(ReflectionCard))