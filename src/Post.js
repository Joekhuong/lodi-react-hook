import React from "react";
import { connect } from "./store";
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Badge
} from "react-bootstrap";
import PostComment from "./PostForm";

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
    console.log(this.props.item);
    return (
      <>
      <Container className="post-item">
        <Row className="post-content">
          {this.props.item.content}
        </Row>
        <Row className="post-footer">
           <Badge variant="info">Posted by: {this.props.item.user_name}</Badge>
           <Badge variant="secondary" className="ml-2" >Posted at: {date.toDateString()}</Badge>
           {this.props.item.idol_name != null ? <Badge className="ml-2" variant="warning">Idol: {this.props.item.idol_name}</Badge> : ""}
        </Row>
        <br/>
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
