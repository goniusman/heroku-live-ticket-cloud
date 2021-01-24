import * as Types from '../actions/types.js'

const init = {
    error: {}
}

const ticketReducer = (state=init, action) => {
    switch (action.type) {
        case Types.TICKET_ERROR: {
            return {
                ...state,
                error: action.payload.error
            }
        }
        default: return state
    }
}
export default ticketReducer