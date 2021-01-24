import React from 'react'
import {Form, Input, Button,} from 'reactstrap'

export default function FeatureImage({ticket, onchange, onsubmit}) {
    return (
        <div className="card mb-4">
        { ticket.image ?
            <img src={ticket.image} className="img-fluid z-depth-1-half mb-4 img-fluid rounded mx-auto" alt="" />
            :
            <div  style={{paddingTop: '6rem', paddingBottom: '6rem', marginBottom: '1rem'}} className="col-lg-12 col-md-12 col-sm-12 d-flex justify-content-center">
                <Form onSubmit={onsubmit} >
                    <Input onChange={onchange} style={{marginBottom: '1rem'}} className="text-center" type="file" name="screnshort"  />
                    <Button type="submit">Upload Image</Button>
                </Form>
            </div>
        }
            
        </div>
    )
}
