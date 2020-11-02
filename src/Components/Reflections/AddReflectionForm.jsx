import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'

class AddReflectionForm extends React.Component{

    state = {
        date_visited: "",
        rating: "",
        content: ""
    }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }

    handleAddReflection = (evt) => {
        evt.preventDefault()
        let {date_visited, rating, content} = this.state
        fetch("http://localhost:3000/reflections", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({
                date_visited,
                rating,
                content,
                place_id: this.props.place.id
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.setState({
                date_visited: "",
                rating: "",
                content: ""
            })
            this.props.addReflection(response)
        })
    }

    render(){

        let {date_visited, rating, content} = this.state

        return(
            <div>
                <h2>Add a Reflection</h2>
                <form onSubmit={this.handleAddReflection}>
                    <label htmlFor="date_visited">Date Visited</label>
                    <input type="date"
                        name="date_visited"
                        value={date_visited}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="rating">Rating</label>
                    <input type="number" min="0" max="10"
                        name="rating"
                        value={rating}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="content">Content</label>
                    <textarea 
                        name="content"
                        value={content}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <input type="submit" value="Add Reflection"/>
                </form>
            </div>
        )
    }
}


// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
    let mapStateToProps = (globalState) => {
        return {
            place: globalState.user.chosen_place,
            token: globalState.user.token
        }
    }

// Action creator -> Function definition down
    // Invoke that action creator within the component -> Function invocation up
let addReflection = (newInfo) => {
    return {
        type: "ADD_REFLECTION",
        payload: newInfo
    }
}

// mapDispatchToProps sends information
    // is a POJO that will be merged into the props of the component
let mapDispatchToProps = {
    addReflection: addReflection
}

export default  connect(mapStateToProps, mapDispatchToProps)(withRouter(AddReflectionForm))