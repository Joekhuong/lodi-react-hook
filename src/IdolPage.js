import React from "react";
import { connect } from "./store";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";

import {getIdolByPageId} from "./IdolModel";
import {checkFollow, followIdol, unFollowIdol} from "./FollowModel";
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
    idol: null,
    is_follow: null
  }

  componentDidMount() {
    var self = this;
    const { page_id } = this.props.match.params || "";

    console.log(this.props);

    getIdolByPageId(page_id).then(res => {

      let idol = res;

      checkFollow(self.props.user.user_info.id,idol.id)
      .then(
        (res) => {
          console.log(res);
          this.setState({idol: idol, is_follow: res.status});
        }
      ).catch(err => {
        console.log(err);
      });

    }).catch(err => {
      console.log(err);
    });
  }

  handleFollow = (e) => {

    let self = this;
    let idol = this.state.idol;

    followIdol(self.props.user.user_info.id,idol.id)
    .then(
      (res) => {
        console.log(res);
        this.setState({is_follow: true});
      }
    ).catch(err => {
      console.log(err);
    });
  }

  handleUnfollow = (e) => {

    let self = this;
    let idol = this.state.idol;

    unFollowIdol(self.props.user.user_info.id,idol.id)
    .then(
      (res) => {
        console.log(res);
        this.setState({is_follow: false});
      }
    ).catch(err => {
      console.log(err);
    });
  }

  render() {
    const { page_id } = this.props.match.params

    if(page_id == undefined)
    {
      this.props.history.push('/');
    }

    if(this.props.loading_state == true || this.state.idol == null || this.state.is_follow == null)
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
            {this.state.is_follow == false ? <Button className="mt-2" variant="primary" onClick={this.handleFollow}>
              Follow
            </Button> : <Button className="mt-2" variant="danger" onClick={this.handleUnfollow}>
              Unfollow
            </Button>}
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
