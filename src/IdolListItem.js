import React from "react";
import { Button,Image } from "react-bootstrap";
import ConfirmModal from "./ConfirmModal";

class IdolListItem extends React.Component {
  state = {
    show_modal: false
  };

  handleEditClick = idol => e => {
    this.props.onItemEdit(idol);
  };

  handleDelete = idol_id => {
    this.props.onItemDelete(idol_id);
  };

  showModal = () => {
    this.setState({
      show_modal: true
    });
  };

  handleOnModalConfirm = () => {
    this.setState({
      show_modal: false
    });

    this.handleDelete(this.props.idol.id)
  };

  handleOnModalClose = () => {
    this.setState({
      show_modal: false
    });
  };

  render() {
    return (
      <tr>
        <td>
          <Image className="" src={this.props.idol.img_url} rounded />
        </td>
        <td>{this.props.idol.firstname}</td>
        <td>{this.props.idol.lastname}</td>
        <td>
          <Button
            variant="primary"
            onClick={this.handleEditClick(this.props.idol)}
          >
            Edit
          </Button>
          <Button variant="danger" className="" onClick={this.showModal}>
            Delete
          </Button>

          <ConfirmModal
            show={this.state.show_modal}
            onConfirm={this.handleOnModalConfirm}
            onClose={this.handleOnModalClose}
            confirmText="Delete"
            closeText="Cancel"
            title={`Delete idol "${this.props.idol.firstname} ${this.props.idol.lastname}" ?`}
          >
            <p>Click Yes when want to delete this idol, otherwise click Cancel</p>
          </ConfirmModal>
        </td>
      </tr>
    );
  }
}

export default IdolListItem;
