import React from "react";
import AuthenticatedNav from "./AuthenticatedNav";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import { connect } from "./store";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import firebase from "./Firebase";
import { LOGIN_ACTION, LOGOUT_ACTION } from "./actions";

const mapStateToProps = (state, props) => ({
  authenticated: state.authenticated,
  ...state
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
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(function(doc) {
            let user_info = doc.data();
            user.user_info = user_info;
            self.props.login(user);
          });

      } else {
        self.props.logout();
      }
    });
  }

  render() {
    return (
      <Router>
        <div>
          {(() => {
            if (this.props.authenticated) {
              return (
                <div>
                  <ul className="nav">
                    <li className="nav-item">
                      <Link className="nav-link" to="/public">Public Page</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/protected">Protected Page</Link>
                    </li>
                    <li className="nav-item">
                      <AuthenticatedNav {...this.props}/>
                    </li>
                  </ul>
                </div>
              );
            }
          })()}

          <Switch>
            <PrivateRoute
              authenticated={this.props.authenticated}
              {...this.props}
              exact
              path="/"
              component={Home}
              test="1"
            />
            <Route path="/public" component={Public} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <PrivateRoute
              authenticated={this.props.authenticated}
              {...this.props}
              path="/protected"
              component={Protected}
              test="1"
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routing);
