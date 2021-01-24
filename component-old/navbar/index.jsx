import React from 'react'
import {Collapse,Navbar,NavbarBrand,Nav,NavItem,NavLink,NavbarText} from 'reactstrap';
import {  Link} from 'react-router-dom'




export default function MyNav() {
    return (
        <div>
              
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">reactstrap</NavbarBrand>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <Link exact to="/" component="/dashboard">Dashboard</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/alltickets/">Ticket List</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/form/">New Ticket</Link>
                        </NavItem>
                        {/* <NavItem>
                            <Link to="https://github.com/goniusman">GitHub</Link>
                        </NavItem> */}
                    </Nav>
                <NavbarText>Simple Text</NavbarText>
        </Navbar>
        </div>
    )
}
