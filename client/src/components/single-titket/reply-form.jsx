import { connect } from 'react-redux'
import React, {Component} from 'react'
import ReactQuill from 'react-quill'
import {updateTicket} from '../../store/actions/ticketAction';

 class ReplyForm extends Component{

    state = {
        comment: "",
        createdtime: new Date()
    }
  
    handleChangeForDesc = value => {
        this.setState({
            comment: value
        })
    }

    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    submitHandler = (e) => {
        e.preventDefault()
        if(this.state.comment === ""){
           return alert("You didn't write anything");
        }else{
            this.props.updateTicket(this.props.ticket._id, this.state)
        }
       
        this.setState({
            comment:"",
            createdtime:""
        })

    }


    render(){
        
        return (
            <>
                <div className="card mb-3 wow fadeIn"  style={{borderBottom:'0px'}}>
                    <div className="card-header font-weight-bold">Leave a reply</div>
                    
                        <form onSubmit={this.submitHandler}>
                            
                                <ReactQuill
                                    className="ql-editor"
                                    value={this.state.comment}
                                    onChange={this.handleChangeForDesc}

                                    placeholder={'replay form'}
                                
                                    formats={this.formats}
                                    
                                />
                           
                          
                            <div className="text-center mt-4">
                                <button className="btn btn-info btn-md" type="submit">Reply</button>
                            </div>
                        </form>
                
                    
                </div>
            </>
        )
    }
}




export default connect(null, {updateTicket})(ReplyForm)