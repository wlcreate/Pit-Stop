import React from 'react'
import HomePageVideo from './HomePageVideo.mp4'

const Home = () => {
    return (
        <div id="home-page">
            {/* <h1>Welcome to pitStop</h1> */}
            <video id="home-video" width="100%" controls autostart loop autoPlay src={HomePageVideo} type="video/mp4" />
            <h2 id="home-header">The travel journal application changing the way you reflect</h2>
            <p id="definition">Memory Space (Les Lieux de Mémoire): a concept related to collective memory, stating that certain places, objects, or events can have special significance related to group's remembrance.</p>
            <p id="home-text">Pit Stop is more than a journal, it's the best journal to record your trips by helping you remember the places you stopped at long after you left. Inspired by the concept of "Memory Space" and the idea that when we travel, the places we visit leave marks on us as we do on them. While the time spent at these places are short, our memories of them last a lifetime.</p>
            <h2 id="home-header">A trip down memory lane just for you</h2>
            <p id="home-text">Pit Stop provides a place just for you to collect and reflect on the places you visited based on all of your trips.</p>
            <img id="home-img" src="https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" alt="female with map on traveling"/>
            <h2 id="home-header">Noteworthy Features</h2>
            <img id="home-img" src="https://i.gifer.com/921j.gif" alt="home page welcome"/>
            <div id="features-list-div">
                <ul id="features-list">
                    <li>Add trips past or present</li>
                    <li>Add places you visited during a trip</li>
                    <li>Search and filter the places you visited</li>
                    <li>See a map of all the places you visited</li>
                </ul>
                <ul id="features-list">
                    <li>Make a note if you would revisit it or not</li>
                    <li>Write private reflections for each place</li>
                    <li>Add a photo to your reflection</li>
                    <li>Edit any of your entries whenever you want</li>
                </ul>
            </div>
        </div>
    )
}

export default Home