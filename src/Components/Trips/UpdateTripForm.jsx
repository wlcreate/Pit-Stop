import React from 'react'
import {connect} from 'react-redux'
import { Input, Form, Button } from 'semantic-ui-react'

class UpdateTripForm extends React.Component{
    constructor(props){
        super(props)
        let s_array = props.trip.start_nice_timestamp.split("/")
        let e_array = props.trip.end_nice_timestamp.split("/")
        this.state = {
            title: props.trip.title,
            start_date: `${s_array[2]}-${s_array[0]}-${s_array[1]}`,
            end_date: `${e_array[2]}-${e_array[0]}-${e_array[1]}`,
            description: props.trip.description
        }
    }
    

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    } 

    handleClick = (evt) => {
        evt.preventDefault()
        let {title, start_date, end_date, description} = this.state
        fetch(`http://localhost:3000/trips/${this.props.trip.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({
                title,
                start_date,
                end_date,
                description
            })
        })
        .then(res => res.json())
        .then(updatedTrip => {
            console.log(updatedTrip)
            this.props.handleUpdate()
            this.props.updateTrip(updatedTrip)
        })
    }

    render(){

        let {title, start_date, end_date, description} = this.state

        console.log(this.props.trip)
        console.log(start_date)
        return(
            <div>
                <h2>Edit {this.props.trip.title}!</h2>
                <Form>
                    <Form.Field id="title"
                        control={Input}
                        label="Title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="start_date"
                        control={Input}
                        type="date"
                        label="Start Date"
                        name="start_date"
                        value={start_date}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="end_date"
                        control={Input}
                        type="date"
                        label="End Date"
                        name="end_date"
                        value={end_date}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field id="description"
                        control={Input}
                        label="Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                        width={8}
                    />
                    <Form.Field
                        id='submit'
                        control={Button}
                        content='Update'
                        onClick={this.handleClick}
                    />
                </Form>
            </div>
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

// Action Creator
let updateTrip = (updatedTrip) => {
    return {
        type: "UPDATE_TRIP",
        payload: updatedTrip
    }
}

// sending information
let mapDispatchToProps = {
    updateTrip: updateTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTripForm)