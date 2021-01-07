import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Input, Button, Form, FormGroup, Label, FormText, Alert } from 'reactstrap'

import InputForm from './inputform'

const user = {
    name: "",
    email: "",
    topic: "",
    severity: "",
    subject: "",
    description: "",
    screenshort: ""
}
class MainForm extends Component {

    state = {
       user: user,
       errors: {},
       success: false
    }

    onChangeHandler = event => {
        this.setState({
            user:{
                ...this.state.user,
                [event.target.name] : event.target.value
            }
        })
        // console.log(this.state.user)
    }

    onSubmitHandler = event => {
        event.preventDefault();
        const {isValid, errors} = this.validate()
        if(isValid){
            this.props.getTicket(this.state.user)
            this.setState({
                user: user,
                errors: {},
                success: true
            })
            setInterval(() => {
                this.setState({
                    success:false
                })
            }, 3000);
        }else{
            this.setState({errors})
            setInterval(() => {
                this.setState({
                    errors: {}
                })
            }, 5000);
        }
    }

    validate = () => {
        const errors = {}
        const {name, email, topic, severity, subject, description, screenshort} = this.state.user
        if(!name){
            errors.name = "Please Provide Your Name"
        }
        if(!email){
            errors.email = "Please Provide Your email"
        }
        if(!topic){
            errors.topic = "Please Provide Your topic"
        }
        if(!severity){
            errors.severity = "Please Provide Your severity"
        }
        if(!subject){
            errors.subject = "Please Provide Your subject"
        }
        if(!description){
            errors.description = "Please Provide Your description"
        }
        if(!screenshort){
            errors.screenshort = "Please Provide Your screenshort"
        }

        return {
            errors,
            isValid : Object.keys(errors).length === 0
        }
    }
    
    render() {
        const {name, email, topic, severity, subject, description, screenshort} = this.state.user
      
        return (
            <Form onSubmit={this.onSubmitHandler}>
                <InputForm
                    type="text"
                    name="name"
                    label="Name"
                    value={name}
                    placeholder="Type Your Name"
                    onChangeHandler={this.onChangeHandler}
                    error={this.state.errors.name}
                />
                <InputForm
                    type="email"
                    name="email"
                    label="Email"
                    value={email}
                    placeholder="Type Your Email"
                    onChangeHandler={this.onChangeHandler}
                    error={this.state.errors.email}
                />
               
                <FormGroup>
                    <Label>Topic</Label>
                    <Input type="select" name="topic" id="topic" value={topic} onChange={this.onChangeHandler}
                     className={this.state.errors.topic ? "form-control is-invalid" : "form-control"}
                    >
                    <option value="billing">Billing</option>
                    <option value="instance">Instance</option>
                    <option value="network">Network</option>
                    </Input>
                    { this.state.errors.topic && <div className="invalid-feedback" >{this.state.errors.topic}</div> }
                </FormGroup>

                <FormGroup>
                    <Label>Priority</Label>
                    <Input type="select" name="severity" id="severity" value={severity} onChange={this.onChangeHandler}
                     className={this.state.errors.severity ? "form-control is-invalid" : "form-control"}
                    >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    </Input>
                    { this.state.errors.severity && <div className="invalid-feedback" >{this.state.errors.severity}</div> }
                </FormGroup>
                <InputForm
                    type="text"
                    name="subject"
                    label="Subject"
                    value={subject}
                    placeholder="Subject"
                    onChangeHandler={this.onChangeHandler}
                    error={this.state.errors.subject}
                />
                <InputForm
                    type="textarea"
                    name="description"
                    label="Brif Area"
                    value={description}
                    placeholder="Brif here"
                    onChangeHandler={this.onChangeHandler}
                    error={this.state.errors.description}
                />

                <FormGroup>
                    <Label for="screenshort">File</Label>
                    <Input type="file" name="screenshort" id="screenshort" onChange={this.onChangeHandler}
                    className={this.state.errors.screenshort ? "is-invalid" : ""}
                    />
                    { this.state.errors.screenshort && <div className="invalid-feedback" >{this.state.errors.screenshort}</div> }
                    <FormText color="muted">
                        Upload an image with your error
                    </FormText>
                </FormGroup>

                <Button  style={{marginTop:"1rem"}} type="submit" className="btn btn-primary btn-lg" name="save" id="butsave">
                    Send
                </Button>
                <Alert color="success" isOpen={this.state.success}>
                    This is a success alert — check it out!
                </Alert>
                
            </Form>
        )
    }
}


MainForm.propTypes = {
    getTicket: PropTypes.func.isRequired
}



export default MainForm 
