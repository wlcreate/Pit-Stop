import React from 'react'
import {connect} from 'react-redux'

const PlacesCategoryFilter = (props) => {

    let handleChange = (evt) => {
        props.changeSelectedCategory(evt.target.value)
    }

    let categoriesList = () => {
        if (props.categories){
            return props.categories.categories.map(category => {
                // debugger
                return <option key={category.id} value={category.name}>{category.name}</option>
            })
        }
    }

    return(
        <div id="filter-category">
            <p><strong>Filter by category</strong></p>
            <select value={props.selectedCategory} onChange={handleChange}>
                <option value={"All"}>All</option>
                {categoriesList()}
            </select>
        </div>
    )
}

// mapStateToProps gets information
    // is a callback, 1st arg is globalStateObj, 2nd arg is ownProps
    // returns POJO to be merged into props of the component
let mapStateToProps = (globalState) => {
    return {
        categories: globalState.categories
    }
}

export default connect(mapStateToProps)(PlacesCategoryFilter)