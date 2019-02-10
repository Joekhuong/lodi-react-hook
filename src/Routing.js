import React from "react";
import AuthenticatedNav from "./AuthenticatedNav";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import IdolManagement from "./IdolManagement";
import { connect } from "./store";
import IdolSearch from "./IdolSearch";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import firebase from "./Firebase";
import { LOGIN_ACTION, LOGOUT_ACTION } from "./actions";
import {getUserByFirebaseUid, loginUser} from "./UserModel";
import {
  Navbar,
  Nav,
  NavDropdown,
  FormControl,
  Button,
  Form
} from "react-bootstrap";

import NavBar from "./NavBar";

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  login: user => {
    dispatch({
      type: LOGIN_ACTION,
      payload: {
        user,
        loading_state: false
      }
    });
  },
  logout: () =>
    dispatch({
      type: LOGOUT_ACTION,
      payload: {
        loading_state: false
      }
    })
});

const Public = () => <h3>Public</h3>;
const Protected = props => <h3>Protected {props.test}</h3>;

class Routing extends React.Component {
  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        getUserByFirebaseUid(user.uid).then(res => {
          user.user_info = res;
          loginUser(this.props.dispatch,user);
          self.props.history.push("/");
        })
        .catch(err => {
          console.log(err);
        });
      } else {
        self.props.logout();
      }
    });
  }

  handleSearch = (e) => {
    console.log('Search');
    console.log(this.props.history);
    //this.props.history.push('/dashboard')
  }

  render() {
    return (
      <Router>
        <div>
          <NavBar {...this.props}/>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
