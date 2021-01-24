import React, { Component } from 'react'
import {Container, Row, Col } from 'reactstrap'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {getSingleTicket, imageUpload} from '../../store/actions/ticketAction'

import FeatureImage from './feature-image'
import Ticket from './ticket'
import Comment from './comment'
import ReplyForm from './reply-form'


class SingleTicket extends Component {

    state = {
        file: '',
        fileName: ''
    }

    componentDidMount(){
        const slug = this.props.match.params.slug;
        this.props.getSingleTicket(slug)
    }
    
    imageHandler = (e) => {
        this.setState({
            file: e.target.files[0]
        })
    }

    // imageSubmit = (e) => {
    //     e.preventDefault()
    //     const {file} = this.state
    //     const formData = new FormData();
    //     formData.append('file', file);

    //     this.props.imageUpload(formData)
    // }


    submitImage = async e => {
        e.preventDefault()
        const {file} = this.state
        const formData = new FormData();
        formData.append('file', file);
        const slug = this.props.match.params.slug;

       
        this.props.imageUpload(slug, formData)

        // try {
        //   await Axios.post(`/api/ticket/upload/${slug}`, formData)
           
        // } catch (error) {
        //     console.log(error)
        // }



    }
    

    render() {
        const {ticket} = this.props
        return ( 
            <main>
            <Container className='my-3 mt-3'>
                <Row className="wow fadeIn">
                    <Col style={{maxWidth: '70%', margin: '0px auto'}}>
                        <h1 className="display-4 text-center md-5">Ticket For Cloud</h1>
                        <NavLink to="/" exact >Back to Home</NavLink>

                        <FeatureImage
                        onchange={this.imageHandler}
                        onsubmit={this.submitImage}
                        ticket={ticket}
                        
                        />
                        <Ticket ticket={ticket} />
                     
                        {
                            ticket.comments &&
                            ticket.comments.length > 0 ? 
                            ticket.comments.reverse().map((com, index) => (
                                <Comment name={ticket.name} key={index} com={com} />
                            )) :
                            <h1 className="text-center my-5">There are no comments</h1>
                        } 

                        <ReplyForm ticket={ticket}  /> 

                    </Col>
                </Row>
            </Container>
            </main>
        )
    }
}

const mapStateToProps = state => ({
    ticket: state.singleTicket
});
  
export default connect( mapStateToProps , { getSingleTicket, imageUpload } )(SingleTicket);

