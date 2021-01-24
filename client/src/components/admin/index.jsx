import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAllTicket, removeTicket, updateSolved } from '../../store/actions/ticketAction'
import { Redirect } from 'react-router-dom'
import ListView from '../listView'
import TableView from '../tableView'


import  DashBoard  from './dashboard/dashboard'
import  Sidebar  from './sidebar'
import  Header  from './header'
import SearchPanel from './search/search';
import Footer from './footer'


export class Admin extends Component {
    state = {
        searchTerm: '',
        view: 'list',
        filter: 'all'
    }

    handleSeach = (value) => {
        this.setState({searchTerm: value})
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

    specificType = () => {
        const type = this.props.auth.user.type
        let tickets = [...this.props.tickets]
        return tickets.filter(t => t.topic === type )
    }

    pendingLength = () => {
        const type = this.props.auth.user.type
        let tickets = [...this.props.tickets]
        let ttickets = tickets.filter(t => t.topic === type )
        return ttickets.filter(ticket => !ticket.isComplete)
    }
    solvedLength = () => {
        const type = this.props.auth.user.type
        let tickets = [...this.props.tickets]
        let ttickets = tickets.filter(t => t.topic === type )
        return ttickets.filter(ticket => ticket.isComplete)
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
        return this.props.tickets.filter(ticket => ticket.topic.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
    } 

    getView = () => {
        let {tickets} = this.props
        tickets = this.performSearch();
        tickets = this.performFilter(tickets)
        tickets = this.specificType()
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
                    deleteHandle={this.deleteHandle}
                />
        ) 
    }

    reset = () => {
        this.setState({
            searchTerm: '',
            isOpenTicketForm: false,
            view: 'table',
            filter: 'all'

        })
    }

    handleFilter = (filter) => {
        this.setState({
            filter
        })
    }



    componentDidMount() {
        this.props.getAllTicket()
    }

    render() {
     const {name, image} = this.props.auth.user
        return (<>
                    {
                        this.props.auth.isAuthenticated ?
                        <div className="wrapper">
                                <Header />
                                <Sidebar
                                    image={image}
                                    username={name}
                                />
                                <div className="content-wrapper">
                                    <SearchPanel
                                        term={this.state.searchTerm}
                                        handleSeach={this.handleSeach}
                                    />
                                    <DashBoard
                                        alltickets = {this.props.tickets.length}
                                        yourtickets = {this.specificType().length}
                                        pendingLength ={this.pendingLength().length}
                                        solvedLength ={this.solvedLength().length}
                                        getView = {this.getView}
                                    
                                    /> 
                                </div>
                                <Footer />
                        </div>
                        :
                        <Redirect exact to="/login" />
                    }
        </>)
    }
}


const mapStateToProps = state => ({
    auth: state.auth,
  tickets: state.tickets
})

export default connect(mapStateToProps, { getAllTicket, removeTicket, updateSolved })(Admin)
