import React from 'react';
import AuthButton from './AuthButton';
import Login from './Login';
import Home from './Home';
import PrivateRoute from './PrivateRoute';
import {connect} from './store';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import firebase from './Firebase';
import {LOGIN_ACTION, LOGOUT_ACTION, SET_LOADING_STATE} from './actions';

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({
  login: (user) => {
    dispatch({
      type: LOGIN_ACTION,
      payload: {
        user,
        loading_state: false
      }
    });
  },
  logout: () => (
    dispatch({
      type: LOGOUT_ACTION,
      payload: {
        loading_state: false
      }
    }
  ))
});

const Public = () => <h3>Public</h3>;
const Protected = (props) => <h3>Protected {props.test}</h3>;

class Routing extends React.Component {

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      user
        ? this.props.login(user)
        : this.props.logout()
    });
  }

  render() {
    console.log(this.props);
    return (<Router>
      <div>

        {
          (() => {
            if (this.props.authenticated) {
              return (<div>
                <AuthButton/>
                <ul>
                  <li>
                    <Link to="/public">Public Page</Link>
                  </li>
                  <li>
                    <Link to="/protected">Protected Page</Link>
                  </li>

                </ul>
              </div>)
            }
          })()
        }

        <Switch>
          <PrivateRoute authenticated={this.props.authenticated} {...this.props} exact path="/" component={Home} test="1"/>
          <Route path="/public" component={Public}/>
          <Route path="/login" component={Login}/>
          <PrivateRoute authenticated={this.props.authenticated} {...this.props} path="/protected" component={Protected} test="1"/>
        </Switch>
      </div>
    </Router>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Routing)
