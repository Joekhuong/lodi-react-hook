import React from "react";
import { Modal, Button } from "react-bootstrap";

class IdolModalForm extends React.Component {

  render() {
    return (
      <React.Fragment>
        <Modal show={this.props.show} onHide={this.props.onClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.props.idol == null ? 'Create new idol' : `Edit ${this.props.idol.first} ${this.props.idol.last}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.onClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.props.onClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default IdolModalForm;
