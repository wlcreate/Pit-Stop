import React from 'react'
import {connect} from 'react-redux'

class UpdateReflectionForm extends React.Component{
    constructor(props){
        super(props)
        let date_array = props.reflection.nice_timestamp.split("/")
        this.state = {
            date_visited: `${date_array[2]}-${date_array[0]}-${date_array[1]}`,
            rating: this.props.reflection.rating,
            content: this.props.reflection.content
        }
    }

    // state = {
    //     date_visited: this.props.reflection.date_visited,
    //     rating: this.props.reflection.rating,
    //     content: this.props.reflection.content
    // }

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    } 

    handleUpdateReflection = (evt) => {
        evt.preventDefault()
        let {date_visited, rating, content} = this.state
        fetch(`http://localhost:3000/reflections/${this.props.reflection.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({
                date_visited,
                rating,
                content
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.props.handleEditReflection()
            this.props.updateReflection(response)
        })
    }

    render(){

        let {date_visited, rating, content} = this.state

        return(
            <div id="edit-reflection">
                <h2>Edit {this.props.reflection.nice_timestamp}!</h2>
                <form onSubmit={this.handleUpdateReflection}>
                    {/* <label htmlFor="date_visited">Date Visited</label> */}
                    <label htmlFor="date_visited">Date</label>
                    <input id="reflection-date" type="date"
                        name="date_visited"
                        value={date_visited}
                        onChange={this.handleChange}
                    />
                    <br></br>
                    <label htmlFor="rating">Rating (must be between 0 - 10)</label>
                    <input id="reflection-rating" type="number" min="0" max="10"
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
                    <input id="reflection-submit" type="submit" value="Update Reflection"/>
                </form>
            </div>
        )
    }
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token
    }
}

// Action Creator
let updateReflection = (updatedInfo) => {
    return {
        type: "UPDATE_REFLECTION",
        payload: updatedInfo
    }
}

// sending information
let mapDispatchToProps = {
    updateReflection: updateReflection
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReflectionForm)