import React from 'react'
import {Link} from 'react-router-dom'

const Controller = ({alltickets, yourtickets, pendingLength, solvedLength}) => {

        return (<>
        
                <div className="row">

                    <div className="col-lg-3 col-6">

                  <div className="small-box bg-warning">
                    <div className="inner">
                      <h3>{alltickets}</h3>

                      <p>All Tickets</p>
                    </div>
                    <div className="icon">
                      <i className="ion ion-person-add"></i>
                    </div>
                    <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                  </div>
                  </div>

                    <div className="col-lg-3 col-6">

                      <div className="small-box bg-info">
                        <div className="inner">
                          <h3>{yourtickets}</h3>

                          <p>Yout Tickets</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-bag"></i>
                        </div>
                        <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                      </div>
                    </div>

                    <div className="col-lg-3 col-6">

                      <div className="small-box bg-danger">
                        <div className="inner">
                          <h3>{pendingLength}</h3>

                          <p>Pending</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-pie-graph"></i>
                        </div>
                        <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                      </div>
                    </div>
                 
                    <div className="col-lg-3 col-6">

                      <div className="small-box bg-success">
                        <div className="inner">
                          <h3>{solvedLength}<sup style={{fontSize: '20px'}}></sup></h3>

                          <p>Solved</p>
                        </div>
                        <div className="icon">
                          <i className="ion ion-stats-bars"></i>
                        </div>
                        <Link to="/" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></Link>
                      </div>
                    </div>

                </div>
            </>
        )

}


export default Controller




