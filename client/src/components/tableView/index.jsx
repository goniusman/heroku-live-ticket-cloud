import React from 'react';
import PropTypes from 'prop-types'
import {CustomInput, Button} from 'reactstrap'
import {NavLink} from 'react-router-dom'

const RowItem = ({ticket, toggleSelect, toggleComplete, Delete}) => (<>


    <tr key={ticket._id}>
    <td>
    <CustomInput
                    type="checkbox"
                    id={ticket.id}
                    checked={ticket.isSelect}
                    onChange={() => toggleSelect(ticket.id)}
            />
    </td>
    <td>{ticket.topic} <br />  { new Date(ticket.createdAt).toDateString('en-BD') }</td>
    <td>{ticket.subject}</td>
    <td className="project-state">
    <Button 
                className="ml-auto"
                color={ticket.isComplete ? "success" : "primary"}
                value={ticket.isComplete}
                onClick={() => toggleComplete(ticket._id)}
            >
                {ticket.isComplete ? "Solved" : "Pending"}
            </Button>
    </td>

    <td className="project-actions text-right">

    <NavLink style={{marginRight: '1rem', paddingTop: '.25rem', paddingBottom: '.25rem'}} className="btn btn-primary btn-sm d-inline" pticket={ticket} key={ticket.id} to={`/ticket/${ticket._id}`}>
            <i className="fas fa-folder">
            </i>
            View
    </NavLink>

        {/* <a className="btn btn-info btn-sm" href="#">
            <i className="fas fa-pencil-alt">
            </i>
            Edit
        </a> */}
    <Button
        className="btn btn-danger btn-sm"
        color="danger"
        onClick={() => Delete(ticket._id)}
    >
        <i className="fas fa-trash">
        </i>
            Delete
    </Button>
    </td>
</tr>

</>)

RowItem.propTypes = {
    ticket: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}

const TableView = ({tickets, toggleComplete, toggleSelect, deleteHandle}) => {
    return(<>
       
        <div className="card-body p-0" style={{height: '300px', overflow: 'auto'}}>
            {tickets.length ? 
            
        
    
            <table className="table table-striped projects">
                <thead>
                    <tr>
                        <th style={{width:'5%'}}>Checkbox</th>
                        <th style={{width:'25%'}}>Department</th>
                        <th style={{width:'30%'}}>Subject</th>
                        <th style={{width:'10%'}}>Status</th>
                        <th className="text-right" style={{width:'20%'}}>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    
                {tickets.length > 0 && tickets.reverse().map(ticket => (
                    <RowItem
                        key={ticket.id}
                        ticket={ticket}
                        toggleSelect={toggleSelect}
                        toggleComplete={toggleComplete}
                        Delete={deleteHandle}
                    />
                ))}

                </tbody>
            </table>
                    : <h1 className="text-center">There are no ticket</h1> }
        </div>


        
    </>)
}
export default TableView

TableView.propTypes = {
    tickets: PropTypes.object.isRequired,
    toggleSelect: PropTypes.func.isRequired,
    toggleComplete: PropTypes.func.isRequired
}
