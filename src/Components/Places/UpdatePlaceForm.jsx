import React from 'react'
import {connect} from 'react-redux'
import {CountryDropdown} from 'react-country-region-selector'
import { Input, Form, Button } from 'semantic-ui-react'

class UpdatePlaceForm extends React.Component{

    state = {
        name: this.props.place.name,
        category: this.props.place.category,
        address: this.props.place.address,
        area: this.props.place.area,
        country: this.props.place.country,
        revisit: this.props.place.revisit
    }

    handleName = (value) => {
        this.setState({
            name: value
        })
    }

    handleAddress = (value) => {
        this.setState({
            address: value
        })
    }

    handleArea = (value) => {
        this.setState({
            area: value
        })
    }

    handleRadioButtons = (checkboxValue) => {
        this.setState({
            revisit: checkboxValue
        })
    }

    handleCountryChange = (value) => {
        this.setState({
            country: value
        })
    }

    handleCategoryChange = (value) => {
        this.setState({
            category: value
        })
    }

    handleClick = (evt) => {
        evt.preventDefault()
        let {name, category, address, area, country, revisit} = this.state
        fetch(`http://localhost:3000/trips/${this.props.trip.id}/places/${this.props.place.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": this.props.token
            },
            body: JSON.stringify({
                name,
                category_id: category,
                address,
                area,
                country,
                revisit
            })
        })
        .then(res => res.json())
        .then(response => {
            console.log(response)
            this.props.handleEditPlace()
            this.props.updatePlace(response)
        })
    }

    render(){

        let {name, category, address, area, country, revisit} = this.state

        // options for categories dropdown
        let categoriesList = () => {
            if (this.props.categories){
                return this.props.categories.categories.map(category => {
                    // debugger
                    return <option key={category.id} value={category.id}>{category.name}</option>
                })
            }
        }

        return(
            <div>
                <h2>Edit {this.props.place.name}!</h2>
                <Form>
                    <Form.Field id="name"
                            control={Input}
                            label="Name"
                            value={name}
                            onChange={e => {this.handleName(e.target.value)}}
                            width={8}
                        />
                    <Form.Field>
                        <label htmlFor="category">Category</label>
                        <select value={category} onChange={e => {this.handleCategoryChange(e.target.value)}}>
                            {categoriesList()}
                        </select>
                    </Form.Field>
                    <Form.Field id="address"
                            control={Input}
                            label="Address"
                            value={address}
                            onChange={e => {this.handleAddress(e.target.value)}}
                            width={8}
                        />
                    <Form.Field id="area"
                            control={Input}
                            label="Area"
                            value={area}
                            onChange={e => {this.handleArea(e.target.value)}}
                            width={8}
                        />
                    <Form.Field>
                        <label htmlFor="country">Country</label>
                        <CountryDropdown
                            valueType="full"
                            value={country}
                            onChange={(value) => this.handleCountryChange(value)} 
                            // onChange={value => console.log(value)}
                        />
                    </Form.Field>
                    <Form.Group>
                        <label htmlFor="revisit">Revisit?</label>
                        <Form.Radio
                            label='Yes'
                            value={true}
                            checked={revisit}
                            onChange={(e, checkbox) => {this.handleRadioButtons(checkbox.value)}}
                        />
                        <Form.Radio
                            label='No'
                            value={false}
                            checked={!revisit}
                            onChange={(e, checkbox) => {this.handleRadioButtons(checkbox.value)}}
                        />
                    </Form.Group>
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
        place: globalState.user.chosen_place,
        trip: globalState.user.chosen_trip,
        categories: globalState.categories
    }
}

// Action Creator
let updatePlace = (updatedInfo) => {
    return {
        type: "UPDATE_PLACE",
        payload: updatedInfo
    }
}

// sending information
let mapDispatchToProps = {
    updatePlace: updatePlace
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlaceForm)