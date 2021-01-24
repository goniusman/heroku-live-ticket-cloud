import React from 'react';
import {NavLink} from 'react-router-dom'
import PropTypes from 'prop-types'
import {ListGroup, ListGroupItem, CustomInput, Button} from 'reactstrap'
 
// list item 
const ListItem = ({ticket, toggleSelect, toggleComplete, Delete}) => {
    console.log()
    return(<>
        
        <ListGroupItem key={ticket._id} action className="d-flex align-items-center" >
          
            <CustomInput
                type="checkbox"
                id={ticket._id}
                checked={ticket.isSelect}
                onChange={() => toggleSelect(ticket.id)}
            />
            <div className="mx-3">
                <NavLink target="_blank" pticket={ticket} key={ticket._id} to={`/ticket/${ticket._id}`}>
                    <span className="h4 pr-5">{ticket.topic}</span>
                </NavLink>
               <span className="h6 pr-5">{ticket.subject.substr(0, 25)}</span>
                <span className="h6 pr-5 ">{ ticket.description.substr(0, 40).replace(/(<([^>]+)>)/gi, "") }.... </span>
                <span className="h6 pl-4 text-right " > { new Date(ticket.createdAt).toLocaleDateString('en-BD') }</span>
            </div>
            
            <Button 
                className="ml-auto"
                color={ticket.isComplete ? "success" : "primary"}
                value={ticket.isComplete}
                onClick={() => toggleComplete(ticket._id)}
            >
                {ticket.isComplete ? "Solved" : "Pending"}
            </Button>
            <Button
                className="ml-auto"
                color="danger"
                onClick={() => Delete(ticket._id)}
            >
                Delete
            </Button>
        </ListGroupItem>
    </>)
}

ListItem.propTypes = {
    ticket: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}



const ListView = ({tickets, toggleComplete, toggleSelect, deleteHandle }) => {
    return(
        
        <ListGroup  style={{height: '300px', overflow: 'auto'}}>
            
            { tickets && tickets.length > 0 ? tickets.reverse().map(ticket => (
              
               
                <ListItem
                    key={ticket._id}
                    ticket={ticket}
                    toggleSelect={toggleSelect}
                    toggleComplete={toggleComplete}
                    Delete={deleteHandle}
                />
            
            
            )): <h1>There are no ticket</h1> }
        </ListGroup>
    )
}

export default ListView

ListView.propTypes = {
    tickets: PropTypes.array.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}
