import React, { Component } from "react";
import { connect } from "react-redux";
import { userImageUpload } from "../../../store/actions/authAction";
import { getAllTicket } from "../../../store/actions/ticketAction";
import { Redirect } from "react-router-dom";

import Sidebar from "../sidebar";
import Header from "../header";
import Footer from "../footer";

class User extends Component {
  state = {
    image: "",
  };

  handleImage = (e) => {
    this.setState({
      image: e.target.files[0],
    });
  };

  imageSubmit = (e) => {
    e.preventDefault();
    const { image } = this.state;
    const userId = this.props.auth.user._id;
    const formData = new FormData();
    formData.append("file", image);
    this.props.userImageUpload(userId, formData);
    this.setState({
      image: ''
    })
  };

  componentDidMount() {
    this.props.getAllTicket();
  }

  render() {
    const { name, email, image } = this.props.auth.user;
    return (
      <>
        {this.props.auth.isAuthenticated ? (
          <div className="wrapper">
            <Header />
            <Sidebar username={name} />

            <div className="content-wrapper">
              <div className="row my-5" >
              <div className="col-md-3" ></div>
                  <div className="col-md-6">
               
                    <div class="card card-primary" style={{padding: '1rem'}}>
                      <div class="card-header">
                        <h3 class="card-title">User Info</h3>
                      </div>

                            { 
                             image 
                            ?
                            <div className="text-center card-img">

                              <img src={image} style={{width: "30%", marginTop: '2rem'}} alt=" here" />
                            </div>
                            : 
                            <div class="text-center"> 
                          <form onSubmit={this.imageSubmit}>
                            <div class="form-group">
                              <label for="exampleInputFile">Image Upload</label>
                              <div class="input-group">

                              <div class="custom-file">
                              <input
                                type="file"
                                onChange={this.handleImage}
                                name="image"
                                className="custom-file-input"
                              />
                              <label
                                class="custom-file-label"
                                for="exampleInputFile"
                              >
                                Choose file
                              </label>
                            </div>
                            <div class="input-group-append">
                              <button type="submit" class="btn btn-primary">Upload Image</button>
                            </div>
                            </div>
                          </div>
                        </form>
                        </div>
                     }
                         



                      <form>
                        <div class="card-body">
                          <div class="form-group">
                            <label for="exampleInputEmail1">
                             Name
                            </label>
                            <input 
                              type="text" 
                              name="name" 
                              value={name} 
                              class="form-control"
                            />
                          
                          </div>
                          <div class="form-group">
                            <label for="exampleInputEmail1">
                              Email address
                            </label>
                            <input
                              type="email" 
                              name="email" 
                              value={email} 
                              class="form-control"
                            />
                          </div>
                        
                        </div>

                        <div class="card-footer">
                          <button type="submit" class="btn btn-primary">
                            Update
                          </button>
                        </div>
                      </form>
                      



                    </div>
                  </div>
               
              </div>
            </div>

            <Footer />
          </div>
        ) : (
          <Redirect exact to="/login" />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  tickets: state.tickets,
});

export default connect(mapStateToProps, { getAllTicket, userImageUpload })(
  User
);
