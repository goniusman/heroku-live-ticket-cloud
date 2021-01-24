import React, { Component } from 'react'
import {Form, Label, Input, FormGroup, Button} from 'reactstrap'
import {Link, Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import {login} from '../../../store/actions/authAction'

export class Login extends Component {
    state = {
        email: "",
        password: "",
        error: {}
    }


    static getDerivedStateFromProps(nextProps, prevState) {
        if (
          JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)
        ) {
          return {
            error: nextProps.auth.error
          };
        }
        return null;
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const {email, password} = this.state
        this.props.login( {email, password}, this.props.history )

    }

    render() {
        const { email, password, error} = this.state
        return (
            <div className="c-app flex-row align-items-center mt-5">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-md-6">
                    {
                        this.props.auth.isAuthenticated ?
                        <Redirect to="/admin" />
                        :
                   
                        <div className="card mx-4">
                            <div className="card-body p-4">
                                <h1 className="center" style={{marginBottom: '1rem'}}> Login</h1>
                           {error.message && 
                           <div class="alert alert-danger" role="alert">
                      {error.message }
                         </div>}
                            <Form onSubmit={this.handleSubmit} >
                                
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
                                <FormGroup>
                                    <Label>Password</Label>
                                    <Input
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="Type password"
                                        onChange={this.handleChange}
                                        className={
                                            error.password ? "form-control is-invalid" : "form-control"
                                        }
                                    />
                                    {error.password && (
                                        <div className="invalid-feedback">{error.password}</div>
                                    )}
                                </FormGroup>
                            

                                    <Button className="btn btn-block btn-success" type="submit">Login</Button>
                            
                            </Form>
                            </div>
                            <div className="card-body p-4 right">
                            <span>If you new user</span>  <Link to='/register'><button className='btn btn-success'> Register </button></Link>
                            </div>

                            <div className="card-footer p-4">
                                <div className="row">
                                    <div className="col-6">
                                    <button className="btn btn-block btn-facebook" type="button"><span>facebook</span></button>
                                    </div>
                                    <div className="col-6">
                                    <button className="btn btn-block btn-twitter" type="button"><span>twitter</span></button>
                                    </div>
                                </div>
                            </div>
                        </div>
 }
                    </div>
                </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    auth: state.auth
})
export default connect(mapStateToProps, {login})(Login) 

