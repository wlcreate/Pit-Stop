import React from 'react'

class PlacesSearch extends React.Component{

    handleChange = (evt) => {
        // logic for updating the search term in the SpotsContainer component's state
        this.props.changeSearchTerm(evt.target.value)
    }

    render(){
        return(
            <form>
            <p><strong>Search</strong></p>
            <input type="text" 
                placeholder="Search by name"
                value={this.props.searchTerm} 
                onChange={this.handleChange}
            />
        </form>
        )
    }
}

export default PlacesSearch