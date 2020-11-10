import React from 'react'

const PlacesRevisitFilter = (props) => {

    let handleChange = (evt) => {
        props.changeSelectedRevisit(evt.target.value)
    }

    return(
        <div id="filter-revisit">
            <p><strong>Filter by revisit</strong></p>
            <select value={props.selectedRevisit} onChange={handleChange}>
                <option value={"All"}>All</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
            </select>
        </div>
    )
}

export default PlacesRevisitFilter