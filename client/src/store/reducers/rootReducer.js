import { combineReducers } from 'redux'
import ticketReducer from './ticketReducer'
import ticketsReducer from './ticketsReducer'
import singleReducer from './singleReducer'
import authReducer from './authReducer'
 

const rootReducer = combineReducers({
    auth: authReducer,
    ticket: ticketReducer,
    tickets: ticketsReducer,
    singleTicket: singleReducer
})

export default rootReducer