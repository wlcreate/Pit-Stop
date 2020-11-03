import React from 'react'
import { CardGroup } from 'semantic-ui-react'
import PlaceCard from './PlaceCard'

const PlacesContainer = (props) => {

    let arrayOfComponents = props.places.map(placeObj => {
        return <PlaceCard key={placeObj.id} place={placeObj}/>
    })

    return(
        <CardGroup className="places-card-group">
            {arrayOfComponents}
        </CardGroup>
    )
}

export default PlacesContainer