import React, {Component} from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux";
import ReactQuill from 'react-quill'
import { ticektCreate } from "../../store/actions/ticketAction";
import { Form, FormGroup, Label, Input, Button, Col, Row } from 'reactstrap'

class CreateTicketForm extends Component {
    state = {
        name: "",
        email: "",
        topic: "",
        priority: "",
        subject: "",
        description: "",
        message: "",
        error: {}
    }
  
    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          JSON.stringify(nextProps.ticket.error) !== JSON.stringify(prevState.error)
        ) {
          return {
            error: nextProps.ticket.error
          };
        }
        return null;
    }

    handleChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
    handleChangeForDesc = value => {
        this.setState({
            description: value
        })
    }
 
    handleSubmit = event => {
        event.preventDefault();
        let { name, email, topic, priority, subject, description } = this.state

      this.props.ticektCreate({ name, email, topic, priority, subject, description}, this.props.history)

            this.setState({
                name: "",
                email: "",
                topic: "",
                priority: "",
                subject: "",
                description: "",
                message:"",
                error: {}, 
                isOpen: true
            })
            

        
    }

    render(){
        let { name, email, subject,description,topic,priority, error, message } = this.state;
        console.log(message) 
        return(<>
               {message && 
                           <div class="alert alert-danger" role="alert">
                      {message }
                         </div>}
            <Form onSubmit={this.handleSubmit} >
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={name}
                                placeholder="Type Name"
                                onChange={this.handleChange}
                                className={
                                    error.name ? "form-control is-invalid" : "form-control"
                                }
                            />
                            {error.name && (
                                <div className="invalid-feedback">{error.name}</div>
                            )}
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                value={email}
                                placeholder="Type Email"
                                onChange={this.handleChange}
                                className={
                                    error.email ? "form-control is-invalid" : "form-control"
                                }
                            />
                            {error.email && (
                                <div className="invalid-feedback">{error.email}</div>
                            )}
                    </FormGroup>       
                    </Col>
                </Row>
               


                <Row>
                    <Col>
                        <FormGroup>
                            <Label for="topic">Department</Label>
                            <Input
                            
                                type="select" 
                                name="topic" 
                                id="topic" 
                                value={topic} 
                                onChange={this.handleChange}
                                required
                            >
                                <option value="">Select Department</option>
                                <option value="billing">Billing</option>
                                <option value="instance">Instance</option>
                                <option value="network">Network</option>
                            </Input>
                           
                                <div className="invalid-feedback">Please select one Department</div>
                            
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="priority">Priority</Label>
                            <Input type="select" name="priority" value={priority} id="priority" onChange={this.handleChange}>
                                <option>Select Priority</option>
                                <option value="low">Low</option>
                                <option value="medium">medium</option>
                                <option value="high">Hich</option>
                            </Input>
                           
                        </FormGroup>   
                    </Col>
                </Row>
               
                <FormGroup>
                    <Label>Subject</Label>
                    <Input
                        type="subject"
                        name="subject"
                        value={subject}
                        placeholder="Type Subject"
                        onChange={this.handleChange}
                        className={
                            error.subject ? "form-control is-invalid" : "form-control"
                        }
                    />
                    {error.subject && (
                        <div className="invalid-feedback">{error.subject}</div>
                    )}
                </FormGroup>
               
                
                <FormGroup>
                    <Label>Description</Label>
                    <ReactQuill
                        value={description}
                        onChange={this.handleChangeForDesc}
                    />
                    {error.description && (
                        <div className="invalid-feedback">{error.description}</div>
                      )}
                </FormGroup>

                <Button type="submit">
                    Create Ticket
                </Button>
            </Form>

            </>)
    }

}



CreateTicketForm.propTypes = {
    toggleForm: PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    ticket: state.ticket
  });
export default connect( mapStateToProps, { ticektCreate } )(CreateTicketForm);