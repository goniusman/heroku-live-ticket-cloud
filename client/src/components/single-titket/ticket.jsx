import React from 'react'
// import PropTypes from 'prop-types'

export default function Ticket( {ticket}) {
    return (<>

        <div className="card mb-4"> 
            <div className="card-body">
                <p>by { ticket.name } on { new Date(ticket.createdAt).toDateString('en-BD') }</p>
                <p className="h5 my-4">{ticket.subject} </p>
                <p>{ ticket.description && ticket.description.replace(/(<([^>]+)>)/gi, "") }</p>      
            </div>
        </div> 
</>)
}


