import React from "react";
import { connect } from "./store";
import { withRouter } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import {createPost} from "./PostModel";

import {
  Form,
  Button
} from "react-bootstrap";


const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({

});

class Post extends React.Component {

  state = {
    show_modal: false,
    post_content: "",
    disable_post_btn: true,
    page_id: this.props.page_id || null,
    parent_id: this.props.parent_id || null
  };

  handlePost = () => {

    let post = {
      content: this.state.post_content,
      user_id: this.props.user.user_info.id,
      page_id: this.state.page_id,
      parent_id: this.state.parent_id
    }
    console.log(post);
    this.setState({
      show_modal: false,
      disable_post_btn: true
    });

    createPost(post)
    .then(()=>{
      this.setState({
        post_content: "",
        disable_post_btn: false
      });
      this.props.onPosted();
    })
    .catch(()=>{
      this.setState({
        post_content: "",
        disable_post_btn: false
      });

    });
  }

  showModal = () => {
    this.setState({
      show_modal: true
    });
  };

  handleOnModalClose = () => {
    this.setState({
      show_modal: false
    });
  };

  handleContentChange = (e) => {

    let new_state = {
      post_content: e.target.value,
      disable_post_btn: e.target.value.length === 0
    }

    this.setState(new_state)
  }

  render() {
    console.log(this.props.user);
    return (
      <>
        <Form>
          <Form.Group controlId="">
            <Form.Control as="textarea" placeholder="What you want to post?" value={this.state.post_content} onChange={this.handleContentChange}/>
          </Form.Group>
        </Form>
        <Button disabled={this.state.disable_post_btn} variant="primary" type="submit" onClick={this.showModal}>
          Post
        </Button>
        <ConfirmModal
          show={this.state.show_modal}
          onConfirm={this.handlePost}
          onClose={this.handleOnModalClose}
          confirmText="Post"
          confirmBtnVariant="primary"
          closeText="Cancel"
          title={`Are you sure you want to post?`}
        >
          <p>Click Post when want to post, otherwise click Cancel</p>
        </ConfirmModal>
      </>
    );
  }

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Post));
