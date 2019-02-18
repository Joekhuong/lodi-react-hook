import React from "react";
import { connect } from "./store";
import { withRouter } from "react-router-dom";
import {
  Container,
  Row,
  Badge
} from "react-bootstrap";


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
    console.log('post render');
    return (
      <Container>
        <Row className="post-content">
          {this.props.item.content}
        </Row>
        <Row className="post-footer">
           <Badge className="mr-2" variant="info">Posted by: Ly Quoc Phong</Badge>
           <Badge variant="secondary">Posted at: {this.props.item.createdAt}</Badge>
        </Row>
        <hr/>
      </Container>

    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));
