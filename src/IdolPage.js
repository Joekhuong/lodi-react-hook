import React from "react";
import { connect } from "./store";
import { BrowserRouter as Router, Route, Link, withRouter, Switch } from "react-router-dom";
import Post from "./Post";
import PostForm from "./PostForm";
import {getIdolByPageId} from "./IdolModel";
import {getPostByPageId} from "./PostModel";
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
    is_follow: null,
    posts: []

  }

  componentDidMount() {
    var self = this;
    const { page_id } = this.props.match.params || "";

    getIdolByPageId(page_id).then(res => {

      let idol = res;

      checkFollow(self.props.user.user_info.id,idol.id)
      .then(
        (res) => {
          let is_follow = res.status;
          getPostByPageId(page_id)
          .then((res)=> {
            this.setState({idol: idol, is_follow: is_follow, posts: res});
          })
          .catch(err => {
            console.log(err);
          });
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
        if(res.status == true)
        {
            this.setState({is_follow: true});
        }
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
        if(res.status == true)
        {
            this.setState({is_follow: false});
        }
      }
    ).catch(err => {
      console.log(err);
    });
  }

  handleOnPost = () => {
    const { page_id } = this.props.match.params || "";
    getPostByPageId(page_id)
    .then((res)=> {
      this.setState({posts: res});
    })
    .catch(err => {
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
            <div className="d-flex flex-column justify-content-center align-items-center">
              <Image className="img-avatar" src={this.state.idol.img_url} rounded />
              {this.state.is_follow == false ? <Button width="100" className="mt-2 btn-follow" variant="primary" onClick={this.handleFollow}>
                Follow
              </Button> : <Button width="100" className="mt-2 btn-unfollow" variant="danger" onClick={this.handleUnfollow}>
                Unfollow
              </Button>}
            </div>
          </Col>

          <Col lg="8">
            <Container>
              <Row className="">
                <Col>
                  <PostForm page_id={page_id} onPosted={this.handleOnPost}/>
                  <hr/>

                </Col>
              </Row>
              <Row className="">
                {this.state.posts.map((post) => <Post item={post}/>)}
              </Row>
            </Container>
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
