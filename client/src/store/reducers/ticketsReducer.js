import * as Types from '../actions/types.js'
  


const ticketsReducer = (state=[], action) => {
    switch (action.type) {

        case Types.SET_TICKET: {
            let tickets = [...state]
            tickets.push(action.payload.ticket)
            return tickets
        }

        case Types.LOAD_TICKETS: {
            return action.payload.tickets
        }


        case Types.REMOVE_TICKET:  {
            let tickets = [...state]
            return tickets.filter(ticket => {
                return ticket._id !== action.payload.id
            })
        } 
      
        default: return state
    }
}

export default ticketsReducer