import React from 'react';
import {LOGIN_ACTION} from './actions';
import {connect} from './store';
import {Redirect} from "react-router-dom";

const mapStateToProps = (state, props) => ({authenticated: state.authenticated});

const mapDispatchToProps = (dispatch, props) => ({
  login: () => {
    dispatch({type: LOGIN_ACTION, payload: {}});
  }
});

class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = (e) => {
    e.preventDefault();
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

    if (redirectToReferrer) {
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
                <button type="submit" className="btn btn-lg btn-primary btn-block text-uppercase" onClick={this.login}>
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
