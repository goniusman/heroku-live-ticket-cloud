import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export class Navbar extends Component {
    render() {
        return (
             <aside className="main-sidebar sidebar-dark-primary elevation-4">
                <div className="sidebar">
                    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                            <div className="image">
                                {
                                    this.props.image ? 
                                    <img src={this.props.image} className="img-circle elevation-2" alt="User " />
                                    :
                                    <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User " />
                                }
                            </div>
                            <div className="info">
                            <NavLink to="/admin" className="d-block">{this.props.username}</NavLink>
                            </div>
                        </div>
                    <div className="form-inline">
                            <div className="input-group" data-widget="sidebar-search">
                            <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search" />
                            <div className="input-group-append">
                                <button className="btn btn-sidebar">
                                <i className="fas fa-search fa-fw"></i>
                                </button>
                            </div>
                            
                            </div>
                        </div>                  
                    <nav className="mt-2">
                            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                
                            
                            <li className="nav-item">
                                <NavLink to="/admin" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    All Tickets
                                    <span className="right badge badge-danger">New</span>
                                </p>
                                </NavLink>
                            </li>

                          
                            <li className="nav-item">
                                <NavLink to="/user" className="nav-link">
                                <i className="nav-icon far fa-circle text-danger"></i>
                                <p className="text">User Info</p>
                                </NavLink>
                            </li>
                       
                        
                            </ul>
                        </nav>
                </div>
            </aside>
        )
    }
}

export default Navbar
