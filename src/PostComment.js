import React from "react";
import { connect } from "./store";
import { withRouter } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import { createPost, getPostByParentId } from "./PostModel";

import { Form, Button, Badge } from "react-bootstrap";

const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({});

class PostComment extends React.Component {
  state = {
    show_modal: false,
    post_content: "",
    disable_post_btn: true,
    page_id: this.props.page_id || null,
    parent_id: this.props.parent_id || null,
    comments: []
  };

  componentDidMount = () => {
    this.getComments();
  }

  getComments = () => {
    getPostByParentId(this.state.parent_id)
    .then((res)=> {
      this.setState({comments: res});
    })
    .catch(err => {
      console.log(err);
    });
  }

  handlePost = () => {
    let post = {
      content: this.state.post_content,
      user_id: this.props.user.user_info.id,
      page_id: this.state.page_id,
      parent_id: this.state.parent_id
    };

    this.setState({
      show_modal: false,
      disable_post_btn: true
    });

    createPost(post)
      .then(() => {
        this.setState({
          post_content: "",
          disable_post_btn: false
        });

        this.getComments();
      })
      .catch(() => {
        this.setState({
          post_content: "",
          disable_post_btn: false
        });
      });
  };

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

  handleContentChange = e => {
    let new_state = {
      post_content: e.target.value,
      disable_post_btn: e.target.value.length === 0
    };

    this.setState(new_state);
  };

  render() {
    return (
      <>
        <div className="detailBox">
          <div className="titleBox">
            <label>Comments</label>
          </div>
          <div className="actionBox">
            <ul className="commentList">
              {Object.keys(this.state.comments).map((item, index) => {
                var date = new Date(this.state.comments[item].createdAt);
                return (
                  <li key={item}>
                    <div className="commentText">
                      <p className="">{this.state.comments[item].content}</p>
                      <Badge variant="secondary" className="ml-2" >Posted at: {date.toDateString()}</Badge>
                    </div>
                  </li>
                );
              })}
            </ul>

            <form className="form-inline">
              <div className="form-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Your comments"
                  onChange={this.handleContentChange}
                  value={this.state.post_content}
                />
              </div>

              <div className="form-group">
                <Button
                  disabled={this.state.disable_post_btn}
                  variant="primary"
                  type="button"
                  onClick={this.showModal}
                >
                  Comment
                </Button>
              </div>
            </form>
          </div>
        </div>

        <ConfirmModal
          show={this.state.show_modal}
          onConfirm={this.handlePost}
          onClose={this.handleOnModalClose}
          confirmText="Post"
          confirmBtnVariant="primary"
          closeText="Cancel"
          title={`Are you sure you want to post comment?`}
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
)(withRouter(PostComment));
