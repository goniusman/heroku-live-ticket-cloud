import React from 'react';

import {Container, Row, Col, Modal, ModalBody, ModalHeader} from 'reactstrap'
import { connect } from 'react-redux'
import { getAllTicket, removeTicket, updateSolved } from '../../store/actions/ticketAction'
import ListView from '../listView'
import TableView from '../tableView'
import Controller from '../controller'
import CreateTicketForm from '../create-ticket-form'

class Ticket extends React.Component{

    state = {
        isOpenTicketForm: false,
        searchTerm: '',
        view: 'list',
        filter: 'all'
    }

    toggleSelect = (ticketId) => {
        const tickets = [...this.props.tickets]
        const ticket = tickets.find(t => t.id === ticketId )
        ticket.isSelect = !ticket.isSelect

        this.setState({
            tickets
        })
    }

    toggleComplete = (ticketId) => {
        
        const tickets = [...this.props.tickets]
        const ticket = tickets.find(t => t._id === ticketId )
        this.props.updateSolved(ticket._id)
        ticket.isComplete = !ticket.isComplete
        this.setState({
            tickets
        })

    }
  
    handleSeach = (value) => {
        this.setState({searchTerm: value})
    } 
    
    changeView = (event) => {
        this.setState({
            view: event.target.value
        })
    }

    clearSelected = () => {
        const tickets = this.state.tickets.filter(ticket => !ticket.isSelect)
        this.setState({
            tickets
        })
    }

    clearCompleted = () => {
        const tickets = this.state.tickets.filter(ticket => !ticket.isComplete)
        this.setState({
            tickets
        })
    }

    reset = () => {
        this.setState({
            searchTerm: '',
            isOpenTicketForm: false,
            view: 'list',
            filter: 'all'

        })
    }

    handleFilter = (filter) => {
        this.setState({
            filter
        })
    }

    performFilter= (tickets) => {
        const {filter} = this.state
        if(filter === 'solved'){
            return tickets.filter(ticket => ticket.isComplete)
        }else if(filter === 'pending'){
            return tickets.filter(ticket => !ticket.isComplete)
        }else{
            return tickets
        }
       
    }

    performSearch = (e) => {
        if(this.props.tickets.length > 0){

            return this.props.tickets.filter(ticket => ticket.topic.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
        }
    }
    
    getView = () => {
       let {tickets} = this.props

        tickets = this.performSearch();
        tickets = this.performFilter(tickets)
        return this.state.view === 'list' ? (
            <ListView
                tickets={tickets}
                toggleSelect={this.toggleSelect}
                toggleComplete={this.toggleComplete}
                deleteHandle={this.props.removeTicket}
            />
        ) : (
            <TableView
                    tickets={tickets}
                    toggleSelect={this.toggleSelect}
                    toggleComplete={this.toggleComplete}
                    deleteHandle={this.props.removeTicket}
                />
        ) 
    }

    componentDidMount() {
        this.props.getAllTicket()
    }
 
    toggleForm = () => {
        this.setState({
            isOpenTicketForm: !this.state.isOpenTicketForm
        })
    }

    render(){
 
        return(
        <Container className='my-3'>
                <Row>
                    <Col>
                        <h1 className="display-4 text-center md-5">Ticket For Cloud</h1>
                
                        <Controller
                            term={this.state.searchTerm}
                            toggleForm={this.toggleForm}
                            handleSeach={this.handleSeach}
                            view={this.state.view}
                            changeView={this.changeView}
                            clearSelected={this.clearSelected}
                            clearCompleted={this.clearCompleted}
                            reset={this.reset}
                            handleFilter={this.handleFilter}   
                        />
                            { this.getView() } 

                        <Modal
                            style={{marginTop:'5rem'}}
                            isOpen={this.state.isOpenTicketForm}
                            toggle={this.toggleForm}
                        >
                            <ModalHeader toggle={this.toggleForm} >
                                Create New ticket 
                            </ModalHeader>
                            <ModalBody>
                                <CreateTicketForm 
                                // CreateTicket={this.createticket}
                                toggleForm={this.toggleForm}
                            />
                            </ModalBody>
                    </Modal>
                

                


                </Col>
                </Row>
            </Container>
            
        )
    }
 
}


 
const mapStateToProps = state => ({
    tickets: state.tickets
})

export default connect(mapStateToProps, { getAllTicket, removeTicket, updateSolved })(Ticket)







