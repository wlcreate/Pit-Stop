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

    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
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
                category,
                address,
                area,
                country,
                revisit
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

        let {name, category, address, area, country, revisit} = this.state

        // options for categories dropdown
        let categoriesList = () => {
            if (this.props.categories){
                return this.props.categories.categories.map(category => {
                    // debugger
                    return <option key={category.id} value={category.id} selected={category}>{category.name}</option>
                })
            }
        }

        return(
            <div>
                <h2>Edit {this.props.place.name}!</h2>
                <form onSubmit={this.handleClick}>
                    <label htmlFor="name">Name</label>
                    <input type="text"
                        name="name"
                        value={name}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="category">Category</label>
                    <select value={category} onChange={this.handleChange}>
                        {categoriesList()}
                    </select>
                    <label htmlFor="address">Address</label>
                    <input type="text"
                        name="address"
                        value={address}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="area">Area</label>
                    <input type="text"
                        name="area"
                        value={area}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="country">Country</label>
                    <CountryDropdown
                        valueType="full"
                        value={country}
                        onChange={this.handleChange}
                    />
                    <label htmlFor="revisit">Revisit?</label>
                    <input type="radio" id="Yes"
                        name="revisit"
                        value={true}
                        checked={revisit}
                        onChange={this.handleChange}
                    />
                    <label for="Yes">Yes</label>
                    <input type="radio" id="No"
                        name="revisit"
                        value={false}
                        checked={!revisit}
                        onChange={this.handleChange}
                    />
                    <label for="No">No</label>
                    <input type="submit" value="Update"/>
                </form>
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
let updatePlace = (updatedPlace) => {
    return {
        type: "UPDATE_PLACE",
        payload: updatedPlace
    }
}

// sending information
let mapDispatchToProps = {
    updatePlace: updatePlace
}
export default connect(mapStateToProps, mapDispatchToProps)(UpdatePlaceForm)