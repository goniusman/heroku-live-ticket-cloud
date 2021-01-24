import React from 'react'
import {NavLink} from 'react-router-dom'

const Comment = ({com,name}) =>{
    return ( 
        <>
            <div className="card card-avatar mb-4 wow fadeIn">
                <div className="card-header font-weight-bold">
                        <span>Abut the author</span>
                        <span className="pull-right">
                            <NavLink to="" className="mr-3">
                                <i className="fa fa-envelope mr-1"></i>
                                Send message
                            </NavLink>
                        </span>
                        <div className="text-right d-inline" style={{float:'right'}}>
                        { com.createdtime && new Date(com.createdtime).toLocaleString('en-BD') }
                        </div>
                </div>
                <div className="card-body">
                    <div className="media">
                        <img style={{width: '64px', borderRadius: '50%'}} className="d-flex mr-3 z-depth-1" src="https://mdbootstrap.com/img/Photos/Avatars/img%20(20).jpg" alt="Generic placeholder " />
                        <div className="media-body">
                            {name ?  <h5 className="mt-0 font-weight-bold">{name}</h5>
                            :  <h5 className="mt-0 font-weight-bold">Miley Steward</h5>
                            }
                            {
                                com.comment &&
                           
                           com.comment.replace(/(<([^>]+)>)/gi, "")
                            
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Comment