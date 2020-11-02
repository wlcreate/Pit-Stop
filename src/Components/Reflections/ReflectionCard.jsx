import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'
import UpdateReflectionForm from './UpdateReflectionForm'

class ReflectionCard extends React.Component{

    state = {
        showForm: false
    }

    handleDelete = () => {
        this.props.history.push("/trips")
        fetch(`http://localhost:3000/reflections/${this.props.reflection.id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            }
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.props.deleteReflection(response)
        })
    }

    handleEditReflection = () => {
        this.setState({
            showForm: !this.state.showForm
        })
    }

    render(){
        let {nice_timestamp, rating, content} = this.props.reflection
        return(
            <div class="ui fluid card">
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{nice_timestamp}</Card.Header>
                        <Card.Meta>Rating: {rating}</Card.Meta>
                        <Card.Description>
                            {content}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <div>
                            <Button floated='right' className="ui right floated red button" onClick={this.handleDelete}>
                                Delete
                            </Button>
                            <Button floated='right' className="ui right floated button" onClick={this.handleEditReflection}> 
                                Edit Reflection
                            </Button>
                        </div>
                    </Card.Content>
                </Card>
                {
                    this.state.showForm
                    ?
                    <UpdateReflectionForm reflection={this.props.reflection} handleEditReflection={this.handleEditReflection}/>
                    :
                    null
                }
            </div>
        )
    }
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token
    }
}

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let deleteReflection = (deletedReflection) => {
    return {
        type: "DELETE_REFLECTION",
        payload: deletedReflection
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    deleteReflection: deleteReflection
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReflectionCard))