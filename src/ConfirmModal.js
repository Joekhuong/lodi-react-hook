import React from "react";
import { Modal, Button } from "react-bootstrap";

class ConfirmModal extends React.Component {
  state = {
    confirmText: this.props.confirmText || "Yes",
    closeText: this.props.closeText || "No",
    title: this.props.title || "Are you sure you want to do this?"
  };

  handleOnClose = e => {
    this.props.onClose();
  };

  handleOnConfirm = e => {
    this.props.onConfirm();
  };

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.show} onHide={this.handleOnClose}>
          <Modal.Header closeButton="closeButton">
          <Modal.Title>{
              this.state.title
            }</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.children}</Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleOnConfirm}>
              {this.state.confirmText}
            </Button>
            <Button variant="secondary" onClick={this.handleOnClose}>
              {this.state.closeText}
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default ConfirmModal;
