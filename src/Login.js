import React from 'react';
import {connect} from './store';
import {Redirect} from "react-router-dom";
import firebase from './Firebase';
import {getUserByFirebaseUid, loginUser, logoutUser} from "./UserModel";

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({

});

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  handleOnChange = e => {
   e.preventDefault(e);
   this.setState({
     [e.target.name]: e.target.value
   });
 };

 handleOnSubmit = e => {
    e.preventDefault();
    let self = this;

    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(function(res) {
        let user = res.user;
        console.log(user);
        if (user) {
          getUserByFirebaseUid(user.uid).then(res => {
            user.user_info = res;
            self.login(user);
            self.props.history.push("/");
          })
          .catch(err => {
            console.log(err);
          });

        } else {
          logoutUser(this.props.dispatch);
        }
      })
      .catch(function(error) {
        alert(error.message);
      });
  };

  login = (user) => {
    loginUser(this.props.dispatch,user);
  }

  render() {
    const {from} = this.props.location.state || {
      from: {
        pathname: "/"
      }
    };
    const {redirectToReferrer} = this.state;

    if (this.props.loading_state) {
      return null;
    }

    if (redirectToReferrer || this.props.authenticated) {
      return <Redirect to={from} />;
    }

    return (<div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5 bg-light text-white">
            <div className="card-body">
              <h5 className="card-title text-center">Sign In</h5>
              <form className="form-signin" onSubmit={this.handleOnSubmit} onChange={this.handleOnChange}>
                <div className="form-label-group">
                  <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required="required" autoFocus="autoFocus"/>
                </div>

                <div className="form-label-group">
                  <input type="password" name="password" id="password" className="form-control" placeholder="Password" required="required"/>
                </div>
                <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase">
                  Sign in
                </button>
                <a href="/register" className="btn btn-lg btn-dark btn-block text-uppercase">
                  Register
                </a>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
