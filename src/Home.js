import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import PostForm from "./PostForm";
import { Container, Row, Col } from "react-bootstrap";
import { getRegions } from "./RegionModel";
import RankingTable from "./RankingTable";
import FollowedIdolTable from "./FollowedIdolTable";
import {getPostByUserId} from "./PostModel";
import Post from "./Post";

const mapStateToProps = (state, props) => ({
  regions: state.regions,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({ type: FETCH_REGION, payload: regions });
  }
});

class Home extends React.Component {

  state = {
    posts: []
  }

  componentDidMount() {
    getRegions(this.props.dispatch).catch(err => {
      console.log(err);
    });

    getPostByUserId(this.props.user.user_info.id)
    .then((res)=> {
      console.log(res);
      this.setState({posts: res});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleOnPost = () => {
    getPostByUserId(this.props.user.user_info.id)
    .then((res)=> {
      this.setState({posts: res});
    })
    .catch(err => {
      console.log(err);
    });
  }

  render() {
    return (
      <Container>
        <Row className="mt-2">
          <Col className="d-none d-lg-block d-xl-block">
            <RankingTable />
          </Col>

          <Col lg="8">
            <Container>
              <Row className="">
                <Col>
                  <PostForm user_id={this.props.user.user_info.id} onPosted={this.handleOnPost}/>
                  <hr/>
                </Col>
              </Row>
              <Row className="">
                {this.state.posts.map((post) => <Post item={post}/>)}
              </Row>
            </Container>
          </Col>

          <Col className="d-none d-lg-block d-xl-block border border-warning">
            <FollowedIdolTable />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
