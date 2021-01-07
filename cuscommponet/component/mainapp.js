import React, { Component } from 'react'
import {Container, Row, Col} from 'reactstrap'
import { Route, Switch} from 'react-router-dom'
import './mainapp-module.css'   

import MyNav from './navbar';
// import Dashboard from './dashboard/index'
import MainForm from './form/mainform'    
import List from './list/list'    

class MainApp extends Component {

    getTicket = (event) => {
        console.log(event)
    }

    render() {
        return (<>
          
                <section id="cover" className="min-vh-100">
                    <div id="cover-caption">
                        <Container>
                            <Row>
                                <Col>
                                    <MyNav />
                                </Col>
                                <Col className=" col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-autoform p-4 offset-md-4">
                                    <h1 className="display-6 py-2 text-truncate">User Ticketing Form</h1>
                                    <div className="px-2">
                                        <div className="alert alert-success alert-dismissible" id="success" style={{display:"none"}}>
                                            {/* <a href="" className="close" data-dismiss="alert" aria-label="close">×</a> */}
                                        </div>
                                       
                                        <Switch>
                                            <Route exact  path="/" component="" />
                                            <Route path="/alltickets" component={List} />
                                            <Route path="/form" component={MainForm} />
                                        </Switch> 
                                         
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>
           
            </>)
    }
}

export default MainApp
