import React, { useState } from 'react'
import {connect} from 'react-redux'
import { Button, Header, Icon, Modal, Form, FormField } from 'semantic-ui-react'
import {withRouter} from 'react-router-dom'

function PasswordModal(props) {
    // sets the state for the Modal
    const [open, setOpen] = React.useState(false)

    // sets the input state for the form
    let [password, setPassword] = useState("")

    let handleClick = (evt) => {
        evt.preventDefault()
        setOpen(false)
        fetch("http://localhost:3000/users/check_password", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization": props.token
            },
            body: JSON.stringify({
                password
            })
        })
        .then(res => res.json())
        .then(response => {
            setPassword("")
            // console.log(response)
            if(response.error){
                alert(response.error)
            } else {
                props.submitPassword()
                props.history.push("/account/edit")
            }
        })
    }

    return(
        <Modal
        closeIcon
        open={open}
        trigger={<Button color='teal'>Edit Account</Button>}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        >
        
            <Header icon='key' content='Please enter your password' />
            <Modal.Content>
                <Form>
                    <FormField>
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder=""
                            name="password"
                            value={password}
                            onChange={e => {setPassword(e.target.value)}}
                        />
                    </FormField>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button color='green' onClick={handleClick}>
                <Icon name='checkmark' /> Check Password
                </Button>
            </Modal.Actions>
        </Modal>
    )
}

// getting information
let mapStateToProps = (globalState) => {
    return {
        token: globalState.user.token
    }
}

// Action Creator
let submitPassword = (password) => {
    return {
        type: "SUBMITTED_PASSWORD",
        payload: password
    }
}

// sending information
let mapDispatchToProps = {
    submitPassword: submitPassword
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PasswordModal))