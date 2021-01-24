import * as Types from '../actions/types.js'
   
const singleReducer = (state=[], action) => {
    switch (action.type) {

        case Types.SINGLE_TICKET: {
            return action.payload.ticket
        }

        case Types.UPDATE_TICKET: {
            // let singleTicket = this.state
            // return singleTicket.comments.map(tic => {
            //     if (tic._id === action.payload.ticket._id) {
            //         return action.payload.ticket
            //     }
            //     // return tic
            // })
            return action.payload.ticket
            
        }
        
        default: return state
    }
}

export default singleReducer