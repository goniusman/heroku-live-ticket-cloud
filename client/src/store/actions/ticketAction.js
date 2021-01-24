import Axios from 'axios'
import * as Types from './types'

export const ticektCreate = (ticket, history) => dispatch => {
    Axios.post('/api/ticket', ticket)
    .then(res => {
            dispatch({
                type: Types.SET_TICKET,
                payload: {
                    ticket: res.data,
                    error: {}
                }

            })
            // history.push('/')
        })
        .catch(error => {
            dispatch({
                type: Types.TICKET_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const getAllTicket = () => dispatch => {
    Axios.get('/api/ticket') 
        .then(response => {
            dispatch({
                type: Types.LOAD_TICKETS,
                payload: {
                    tickets: response.data
                }
            })
        })
        .catch(error => {
            console.log(error)
        })
}
 

export const getSingleTicket = (id) => dispatch => {
    Axios.get(`/api/ticket/${id}`) 
        .then(response => {
            dispatch({
                type: Types.SINGLE_TICKET,
                payload: {
                    ticket: response.data
                }
            })
            // console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
}


export const removeTicket = id => dispatch => {
    Axios.delete(`/api/ticket/${id}`)
        .then(response => {
            dispatch({type: Types.REMOVE_TICKET, payload: {id: response.data._id}})
        })
        .catch(error => {
            console.log(error)
        })
}

 
export const updateTicket = (id, ticket) => dispatch => {
    Axios.put(`/api/ticket/${id}`, ticket)
        .then(response => {
            dispatch({
                type: Types.UPDATE_TICKET, 
                payload: {ticket: response.data}
            })
        })
        .catch(error => {
            console.log(error)
        })
}


export const updateSolved = (id) => dispatch => {
    Axios.put(`/api/ticket/issuetoggle/${id}`)
        .then(response => {
            console.log(response)
            // dispatch({
            //     type: Types.UPDATE_TICKET, 
            //     payload: {ticket: response.data.ticket}
            // })
        }) 
        .catch(error => {
            console.log(error)
        })
}


export const imageUpload = (id, formData) => dispatch => {
    Axios.post(`/api/ticket/upload/${id}`, formData)
    .then(res => {
            dispatch({
                type: Types.SINGLE_TICKET,
                payload: {
                    ticket: res.data
                }
            })
    })
    .catch(error => {
        console.log(error)
    })
}
