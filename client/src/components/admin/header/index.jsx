import React, { Component } from 'react'
import {connect} from 'react-redux' 
import { NavLink } from 'react-router-dom'

import {logout} from '../../../store/actions/authAction'

export class Header extends Component {
    render() {
        return (
            <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink to="/admin" className="nav-link" data-widget="pushmenu" role="button"><i className="fas fa-bars"></i></NavLink>
                    </li>
                    <li className="nav-item d-none d-sm-inline-block">
                        <NavLink to="/admin" className="nav-link">Home</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item dropdown show">
                        <NavLink to="/admin" className="nav-link" data-toggle="dropdown"  aria-expanded="true">
                        <i className="far fa-comments"></i>
                        <span className="badge badge-danger navbar-badge">3</span>
                        </NavLink>
                        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right" style={{left:'inherit', right: '0px', minWidth: '280px'}}>
                        <NavLink to="/admin"  className="dropdown-item">
                            <div className="media">
                            <img src="../../dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                Brad Diesel
                                <span className="float-right text-sm text-danger"><i className="fas fa-star"></i></span>
                                </h3>
                                <p className="text-sm">Call me whenever you can...</p>
                                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                            </div>
                        </NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink to="/admin" className="dropdown-item">
                     
                            <div className="media">
                            <img src="../../dist/img/user8-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                John Pierce
                                <span className="float-right text-sm text-muted"><i className="fas fa-star"></i></span>
                                </h3>
                                <p className="text-sm">I got your message bro</p>
                                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                            </div>
                           
                        </NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink to="/admin" className="dropdown-item">
                           
                            <div className="media">
                            <img src="../../dist/img/user3-128x128.jpg" alt="User Avatar" className="img-size-50 img-circle mr-3" />
                            <div className="media-body">
                                <h3 className="dropdown-item-title">
                                Nora Silvester
                                <span className="float-right text-sm text-warning"><i className="fas fa-star"></i></span>
                                </h3>
                                <p className="text-sm">The subject goes here</p>
                                <p className="text-sm text-muted"><i className="far fa-clock mr-1"></i> 4 Hours Ago</p>
                            </div>
                            </div>
                           
                        </NavLink>
                        <div className="dropdown-divider"></div>
                        <NavLink to="/admin" className="dropdown-item dropdown-footer">See All Messages</NavLink>
                        </div>
                    </li>

                    <li className="nav-item" style={{marginLeft: '2rem'}}>
                        {
                            this.props.auth.isAuthenticated &&
                                <button
                                    className='btn btn-danger'
                                    onClick={() => this.props.logout(this.props.history)}
                                >
                                    Logout
                                </button> 
                                
                        }
                    </li>
                   
                </ul>
            </nav>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, {logout} )(Header)

