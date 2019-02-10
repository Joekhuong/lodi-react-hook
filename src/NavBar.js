import React from "react";
import AuthenticatedNav from "./AuthenticatedNav";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import IdolManagement from "./IdolManagement";
import IdolSearch from "./IdolSearch";

import { connect } from "./store";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
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

class NavBar extends React.Component {

  state = {
    search_term: ""
  }

  handleSearchTermChange = (e) => {
    this.setState({
      search_term: e.target.value
    });
  }

  handleSearch = (e) => {
    console.log('Search');
    console.log(this.props.history);
    const term = this.state.search_term;
    console.log(term);
    if(term.length == 0)
    {
      console.log(term);
      return false;
    }
    this.props.history.push('/idol_search/'+term);
  }

  render() {
    console.log(this.props);
    return (
        <div>
          {(() => {
            if (this.props.authenticated) {
              return (
                <Navbar bg="light" expand="lg">
                  <Navbar.Brand href="#home">Lodi-World</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    <Nav className="">
                      <Nav.Link href="#"><Link className="nav-link" to="/">
                              Home Page
                            </Link></Nav.Link>
                      <Nav.Link href="#"><Link className="nav-link" to="/protected">
                              Protected Page
                            </Link></Nav.Link>
                            {(() => {
                                   if (this.props.user.user_info.is_admin) {
                                     return (
                                         <Nav.Link href="#"> <Link className="nav-link" to="/idol_management">
                                            Idol Management
                                          </Link></Nav.Link>
                                     );
                                   }
                                })()}
                    </Nav>

                    <div className="d-flex">
                      <FormControl type="text" placeholder="Search" value={this.state.search_term} onChange={this.handleSearchTermChange}  className="mr-sm-2" />
                      <Button variant="outline-success" className="mt-2" onClick={this.handleSearch}>Search</Button>
                    </div>

                    <AuthenticatedNav {...this.props} />

                  </Navbar.Collapse>
                </Navbar>
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
            <Route path="/idol_search/:term?" component={IdolSearch} />
            <PrivateRoute
              path="/idol_management"
              {...this.props}
              component={IdolManagement}
            />
            <PrivateRoute
              authenticated={this.props.authenticated}
              {...this.props}
              path="/protected"
              component={Protected}
              test="1"
            />
          </Switch>
        </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(NavBar));
