import React from 'react';
import AuthButton from './AuthButton';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import {connect} from './store';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";

const mapStateToProps = (state, props) => ({authenticated: state.authenticated});

const mapDispatchToProps = (dispatch, props) => {};

const Public = () => <h3>Public</h3>;
const Protected = (props) => <h3>Protected {props.test}</h3>;
const Home = () => <h3>Home</h3>;

const AuthExample = (props) => (<Router>
  <div>

    {
      (() => {
        if (props.authenticated) {
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
      <PrivateRoute authenticated={props.authenticated} exact path="/" component={Home} test="1"/>
      <Route path="/public" component={Public}/>
      <Route path="/login" component={Login}/>
      <PrivateRoute authenticated={props.authenticated} path="/protected" component={Protected} test="1"/>
    </Switch>
  </div>
</Router>);

export default connect(mapStateToProps, mapDispatchToProps)(AuthExample)
