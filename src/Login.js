import React from 'react';
import {LOGIN_ACTION} from './actions';
import {connect} from './store';
import {Redirect} from "react-router-dom";
import firebase from './Firebase';

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({
  login: () => {
    dispatch({type: LOGIN_ACTION, payload: {}});
  }
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
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then(function(doc) {
              let user_info = doc.data();
              console.log(user_info);
              user.user_info = user_info;
              self.login();
            });
        } else {
          self.dispatch({
            type: "LOGOUT",
            payload: {}
          });
        }
      })
      .catch(function(error) {
        alert(error.message);
      });
  };

  login = e => {
    this.props.login();
    setTimeout(() => this.setState({redirectToReferrer: true}), 100);
  }

  render() {
    const {from} = this.props.location.state || {
      from: {
        pathname: "/"
      }
    };
    const {redirectToReferrer} = this.state;
    console.log(this.props);

    if (this.props.loading_state) {
      return null;
    }

    if (redirectToReferrer || this.props.authenticated) {
      return <Redirect to={from} />;
    }

    return (<div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card card-signin my-5 bg-secondary text-white">
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
