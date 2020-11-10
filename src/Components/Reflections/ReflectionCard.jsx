import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Card, Button } from 'semantic-ui-react'
import UpdateReflectionForm from './UpdateReflectionForm'

class ReflectionCard extends React.Component{

    state = {
        showForm: false,
        media: {}
    }

    handleDelete = () => {
        // this.props.history.push("/trips")
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

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.files[0]
        })
    }

    handleMediaUpload = (evt) => {
        evt.preventDefault()
        if (this.state.media) {
            const form = new FormData()
            form.append("media", this.state.media)
            fetch(`http://localhost:3000/reflections/${this.props.reflection.id}/media`, {
                method: "PATCH",
                body: form
            })
            .then(res => res.json())
            .then(response => {
                console.log(response)
                // debugger
                this.props.updateReflection(response)
            })
        } else {
            console.log("I've been clicked")
            alert("No media uploaded")
        }
        
    }

    render(){
        let {nice_timestamp, rating, content, media} = this.props.reflection
        return(
            <div className="reflection-card">
                <Card fluid>
                    <Card.Content>
                        <Card.Header>{nice_timestamp}</Card.Header>
                        <Card.Meta>Rating: {rating}</Card.Meta>
                        <Card.Description>
                            {
                                media
                                ?
                                <img id="reflection-card-img" src={media} alt="reflection"/>
                                :
                                null
                            }
                            <p id="reflection-card-text">{content}</p>
                        </Card.Description>
                    </Card.Content>
                    <Card.Content>
                        <div>
                            <Button floated='right' className="ui right floated red button" onClick={this.handleDelete}>
                                Delete
                            </Button>
                            <Button floated='right' className="ui right floated yellow button" onClick={this.handleEditReflection}> 
                                Edit Reflection
                            </Button>
                            <form id="media-upload-form" onSubmit={this.handleMediaUpload}>
                                {/* <label htmlFor="media">Add Picture or Video</label> */}
                                <input id="media-upload-input" type="file"
                                    name="media"
                                    onChange={this.handleChange}
                                />
                                <input id="media-upload-submit" type="submit" value="Add Picture"/>
                            </form>
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

// Action Creator
let updateReflection = (updatedInfo) => {
    return {
        type: "UPDATE_REFLECTION",
        payload: updatedInfo
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    deleteReflection: deleteReflection,
    updateReflection: updateReflection
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ReflectionCard))