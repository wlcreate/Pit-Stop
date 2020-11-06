import React, { useState } from 'react'
import {connect} from 'react-redux'
import {CountryDropdown} from 'react-country-region-selector'
import { Button, Header, Icon, Modal, Form, FormField, FormGroup } from 'semantic-ui-react'

function AddPlaceModal(props) {
    // sets the state for the Modal
    const [open, setOpen] = React.useState(false)

    // sets the input state for the form
    let [name, setName] = useState("")
    let [address, setAddress] = useState("")
    let [area, setArea] = useState("")
    // let [country, setCountry] = useState("") // ! need to decide
    let [revisit, setRevisit] = useState(true)
    let [selectedCountry, setSelectedCountry] = useState("") // ! need to decide
    let [selectedCategory, setSelectedCategory] = useState(1)
    let [latitude, setLatitude] = useState("")
    let [longitude, setLongitude] = useState("")

    // options for categories dropdown
    let categoriesList = () => {
        if (props.categories){
            return props.categories.categories.map(category => {
                // debugger
                return <option key={category.id} value={category.id}>{category.name}</option>
            })
        }
    }

    let inputUserLocation = () => {

        function success (position) {
            setLatitude(position.coords.latitude)
            setLongitude(position.coords.longitude)
        }

        function error () {
            alert('Sorry, no position')
        }

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error)
        }
        // navigator.geolocation.getCurrentPosition((position) => {
        //     setLatitude(position.coords.latitude)
        //     setLongitude(position.coords.longitude)
        // })
    }

    let handleClick = (evt) => {
        // debugger
        evt.preventDefault()
        setOpen(false)
        fetch("http://localhost:3000/places", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": props.token
            },
            body: JSON.stringify({
                name,
                address,
                area,
                revisit,
                country: selectedCountry,
                category_id: selectedCategory,
                latitude,
                longitude,
                trip_id: props.trip.id
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            setName("")
            setAddress("")
            setArea("")
            setRevisit(true)
            setSelectedCountry("")
            setSelectedCategory(1)
            setLatitude("")
            setLongitude("")
            // debugger
            props.createNewPlace(response)
        })
    }
    // console.log(revisit)
    return (
        <Modal
        closeIcon
        open={open}
        trigger={<Button color='teal'>Add a Place</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        <Header icon='map' content='Add a Place' />
        <Modal.Content>
            <Form>
                <FormField>
                    <label htmlFor="name">Name</label>
                    <input type="text" autoComplete="off" placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => {setName(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="category">Category</label>
                    <select value={selectedCategory} onChange={e => {setSelectedCategory(e.target.value)}}>
                        {categoriesList()}
                    </select>
                </FormField>
                <FormField>
                    <label htmlFor="address">Address</label>
                    <input type="text" autoComplete="off" placeholder="Address"
                        name="address"
                        value={address}
                        onChange={e => {setAddress(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="latitude">Latitude</label>
                    <input type="text" autoComplete="off" placeholder="ex: 40.730610"
                        name="latitude"
                        value={latitude}
                        onChange={e => {setLatitude(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="longitude">Longitude</label>
                    <input type="text" autoComplete="off" placeholder="ex: -73.935242"
                        name="longitude"
                        value={longitude}
                        onChange={e => {setLongitude(e.target.value)}}
                    />
                </FormField>
                <FormField>
                    <label htmlFor="area">Area</label>
                    <input type="text" autoComplete="off" placeholder="Area"
                        name="area"
                        value={area}
                        onChange={e => {setArea(e.target.value)}}
                    />
                </FormField>
                {/* <FormField>
                    <label htmlFor="country">Country</label>
                    <input type="text" placeholder="Country"
                        name="country"
                        value={country}
                        onChange={e => {setCountry(e.target.value)}}
                    />
                </FormField> */}
                <FormField>
                    <label htmlFor="country">Country</label>
                    <CountryDropdown
                        valueType="full"
                        value={selectedCountry}
                        onChange={value => {setSelectedCountry(value)}} 
                        // onChange={value => console.log(value)}
                    />
                </FormField>
                <FormGroup>
                    <label htmlFor="revisit">Revisit?</label>
                    <Form.Radio
                        label='Yes'
                        value={true}
                        checked={revisit}
                        onChange={(e, checkbox) => {setRevisit(checkbox.value)}}
                    />
                    <Form.Radio
                        label='No'
                        value={false}
                        checked={!revisit}
                        onChange={(e, checkbox) => {setRevisit(checkbox.value)}}
                    />
                </FormGroup>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={inputUserLocation}>
                <Icon name='checkmark' /> Use my Location
            </Button>
            <Button color='green' onClick={handleClick}>
                <Icon name='checkmark' /> Create Place
            </Button>
        </Modal.Actions>
        </Modal>
    )
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        categories: globalState.categories,
        token: globalState.user.token,
        trip: globalState.user.chosen_trip
    }
}

// Action Creator
let createNewPlace = (createdRes) => {
    return {
        type: "ADD_PLACE",
        payload: createdRes
    }
}

// sending information
let mapDispatchToProps = {
    createNewPlace: createNewPlace
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPlaceModal)