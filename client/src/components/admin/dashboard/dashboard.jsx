import React from 'react'
import { connect } from 'react-redux'
import Controller from '../controller'

import { getAllTicket, removeTicket, updateSolved } from '../../../store/actions/ticketAction'

 
const DashBoard = ({getView, alltickets, yourtickets, pendingLength, solvedLength}) => {

    return (
            <section className="content">
                <div className="container-fluid">
                    <Controller
                        alltickets={alltickets}
                        yourtickets={yourtickets}
                        pendingLength={pendingLength}
                        solvedLength={solvedLength}
                    />
                    <div className="card ">
                    <div class="card-header">
                            <h3 class="card-title">Tickets</h3>

                            <div class="card-tools">
                                <button type="button" class="btn btn-tool" data-card-widget="collapse" title="Collapse">
                                <i class="fas fa-minus"></i>
                                </button>
                                <button type="button" class="btn btn-tool" data-card-widget="remove" title="Remove">
                                <i class="fas fa-times"></i>
                                </button>
                            </div>
                            </div>
                    { getView() } 
                    </div>

                </div>
            </section>
    )
    
}


const mapStateToProps = state => ({
    auth: state.auth,
  tickets: state.tickets
})

export default connect(mapStateToProps, { getAllTicket, removeTicket, updateSolved })(DashBoard)

