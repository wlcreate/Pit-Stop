import React, { useState } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Icon, Modal, Form, FormField, FormGroup } from 'semantic-ui-react'

function AddPlaceModal(props) {
    // sets the state for the Modal
    const [open, setOpen] = React.useState(false)

    // sets the input state for the form
    let [name, setName] = useState("")
    let [address, setAddress] = useState("")
    let [area, setArea] = useState("")
    let [country, setCountry] = useState("")
    let [revisit, setRevisit] = useState("")

    let handleClick = (evt) => {
        evt.preventDefault()
        setOpen(false)
        fetch("http://localhost:3000/places", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
            },
            body: JSON.stringify({
                
            })
        })
        .then(res => res.json())
        .then(newPlace => {
            console.log(newPlace)
            props.createNewPlace(newPlace)
        })
    }

    return (
        <Modal
        closeIcon
        open={open}
        trigger={<Button>Add a Place</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon='map' content='Add a Trip' />
        <Modal.Content>
            <Form>
                <FormField>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="address">Address</label>
                    <input type="text" placeholder="Address"
                        name="address"
                        value={address}
                        onChange={e => {setAddress(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="area">Area</label>
                    <input type="text" placeholder="Area"
                        name="area"
                        value={area}
                        onChange={e => {setArea(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Country"
                        name="country"
                        value={country}
                        onChange={e => {setCountry(e.target.value)}}
                    />
                </FormField>
                {/* ! HAVING ISSUES WITH RADIO BUTTONS!!!! */}
                <FormGroup>
                    <label htmlFor="revisit">Revisit?</label>
                    <Form.Radio
                        label='Yes'
                        value="true"
                        checked={revisit === 'true'}
                        onChange={(e) => {setRevisit(e.target.value)}}
                    />
                    <Form.Radio
                        label='No'
                        value="false"
                        checked={revisit === 'false'}
                        onChange={(e) => {setRevisit(e.target.value)}}
                    />
                </FormGroup>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button color='green' onClick={handleClick}>
            <Icon name='checkmark' /> Create Place
            </Button>
        </Modal.Actions>
        </Modal>
    )
}

// Action Creator
let createNewPlace = (createdPlace) => {
    return {
        type: "ADD_PLACE",
        payload: createdPlace
    }
}

// sending information
let mapDispatchToProps = {
    createNewPlace: createNewPlace
}

export default connect(null, mapDispatchToProps)(AddPlaceModal)