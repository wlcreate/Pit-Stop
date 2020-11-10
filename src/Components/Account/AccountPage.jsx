import React from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import ParticlesBg from 'particles-bg'
import PasswordModal from './PasswordModal'

class AccountPage extends React.Component{

    render(){

        let {first_name, last_name, username} = this.props.user

        let config = {
            num: [6, 8],
            rps: 0.15,
            radius: [8, 80],
            life: [3, 8],
            v: [2, 3],
            tha: [-40, 40],
            alpha: [0.6, 0],
            scale: [.1, 0.4],
            position: "all",
            color: ["random", "#137F83"],
            cross: "dead",
            random: 15
        }

        if (Math.random() > 0.85) {
            config = Object.assign(config, {
                onParticleUpdate: (ctx, particle) => {
                    ctx.beginPath()
                    ctx.rect(
                        particle.p.x,
                        particle.p.y,
                        particle.radius * 2,
                        particle.radius *2
                    )
                    ctx.fillStyle = particle.color
                    ctx.fill()
                    ctx.closePath()
                }
            })
        }

        return(
            <div id="account-info">
                <h1>My Account</h1>
                <p>First name: {first_name}</p>
                <p>Last name: {last_name}</p>
                <p>username: {username}</p>
                <PasswordModal />
                <ParticlesBg type="custom" config={config} bg={true} />
            </div>
        )
    }
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        user: globalState.user.user
    }
}

export default connect(mapStateToProps)(withRouter(AccountPage))