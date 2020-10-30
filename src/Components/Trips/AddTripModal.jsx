import React, { useState } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Icon, Modal, Form, FormField } from 'semantic-ui-react'

function AddTripModal(props) {
    // sets the state for the Modal
    const [open, setOpen] = React.useState(false)

    // sets the input state for the form
    let [title, setTitle] = useState("")
    let [start_date, setStartDate] = useState("")
    let [end_date, setEndDate] = useState("")
    let [description, setDescription] = useState("")

    let handleClick = (evt) => {
        evt.preventDefault()
        setOpen(false)
        fetch("http://localhost:3000/trips", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": props.token
            },
            body: JSON.stringify({
                title,
                start_date,
                end_date,
                description
            })
        })
        .then(res => res.json())
        .then(newTrip => {
            console.log(newTrip)
            props.createNewTrip(newTrip)
        })
    }

    return (
        <Modal
        closeIcon
        open={open}
        trigger={<Button>Add a Trip</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon='suitcase' content='Add a Trip' />
        <Modal.Content>
            <Form>
                <FormField>
                    <label htmlFor="title">Title</label>
                    <input type="text" placeholder="Title"
                        name="title"
                        value={title}
                        onChange={e => {setTitle(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="start_date">Start Date</label>
                    <input type="date"
                        name="start_date"
                        value={start_date}
                        onChange={e => {setStartDate(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="end_date">End Date</label>
                    <input type="date"
                        name="end_date"
                        value={end_date}
                        onChange={e => {setEndDate(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="description">Description</label>
                    <input type="text" placeholder="Description"
                        name="description"
                        value={description}
                        onChange={e => {setDescription(e.target.value)}}
                    />
                </FormField>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={handleClick}>
            <Icon name='checkmark' /> Create Trip
            </Button>
        </Modal.Actions>
        </Modal>
    )
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token
    }
}

// Action Creator
let createNewTrip = (createdTrip) => {
    return {
        type: "ADD_TRIP",
        payload: createdTrip
    }
}

// sending information
let mapDispatchToProps = {
    createNewTrip: createNewTrip
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTripModal)