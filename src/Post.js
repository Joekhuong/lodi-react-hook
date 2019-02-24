import React from "react";
import { connect } from "./store";
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Badge
} from "react-bootstrap";
import PostComment from "./PostComment";

const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({

});


class Post extends React.Component {

  state = {
    created_by: null,
    is_follow: null
  }

  componentDidMount() {
    //GET COMMENT
  }

  render() {

    var date = new Date(this.props.item.createdAt);
    return (
      <>
      <Container className="post-item border border-dark mb-4">
        <Row className="post-footer p-3 bg-primary">
           <Badge variant="dark">Posted by: {this.props.item.user_name}</Badge>
           <Badge variant="dark" className="ml-2" >Posted at: {date.toDateString()}</Badge>
           {this.props.item.idol_name != null ? <Badge className="ml-2" variant="dark">Idol: {this.props.item.idol_name}</Badge> : ""}
        </Row>
        <Row className="post-content p-3">
          {this.props.item.content}
        </Row>
        <PostComment parent_id={this.props.item.id} />
        <hr/>
      </Container>
      </>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));
