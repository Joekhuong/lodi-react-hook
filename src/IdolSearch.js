import React from "react";
import AuthenticatedNav from "./AuthenticatedNav";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import PrivateRoute from "./PrivateRoute";
import IdolManagement from "./IdolManagement";
import { connect } from "./store";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import firebase from "./Firebase";
import { LOGIN_ACTION, LOGOUT_ACTION } from "./actions";
import {getUserByFirebaseUid, loginUser} from "./UserModel";
import {
  Table,
  Container,
  Col,
  Row
} from "react-bootstrap";


const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({

});


class IdolSearch extends React.Component {


  handleSearch = (e) => {

  }

  render() {
    const { term } = this.props.match.params

    if(term == undefined)
    {
      this.props.history.push('/');
    }

    if(this.props.loading_state == true)
    {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col>
          <h1 className="d-block">Idol search result for "{term}" </h1>
          <Table responsive>
            <tbody>
              <tr>
                <td>1</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Table cell</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Table cell</td>
              </tr>
            </tbody>
          </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(IdolSearch));
