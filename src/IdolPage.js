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
import {getIdolByPageId} from "./IdolModel";
import {
  Table,
  Container,
  Col,
  Row,
  Image,
  Form,
  Button
} from "react-bootstrap";


const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({

});


class IdolPage extends React.Component {

  state = {
    idol: null
  }

  componentDidMount() {
    var self = this;
    const { page_id } = this.props.match.params || "";
    getIdolByPageId(page_id).then(res => {
      console.log(self.props);
      this.setState({idol: res});
    }).catch(err => {
      console.log(err);
    });
  }

  handleSearch = (e) => {

  }

  render() {
    const { page_id } = this.props.match.params

    if(page_id == undefined)
    {
      this.props.history.push('/');
    }

    if(this.props.loading_state == true || this.state.idol == null)
    {
      return null;
    }

    return (
      <Container>
        <Row className="mt-2">
          <h1>Page for idol {this.state.idol.firstname} {this.state.idol.lastname}</h1>
        </Row>
        <Row className="mt-2">
          <Col className="d-none d-lg-block d-xl-block">
            <Image className="mt-3" src={this.state.idol.img_url} rounded />
            <Button className="mt-2" variant="primary" type="submit">
              Follow
            </Button>
          </Col>

          <Col lg="8">
            <Container>
              <Row className="">
                <Col>
                  <Form>
                    <Form.Group controlId="">
                      <Form.Control as="textarea" placeholder="What you want to post?" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Post
                    </Button>
                  </Form>
                  <hr/>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col className="d-none d-lg-block d-xl-block border border-warning">

          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(IdolPage));
