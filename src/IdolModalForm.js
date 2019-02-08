import React from "react";
import {Modal, Button, Form, Image} from "react-bootstrap";

class IdolModalForm extends React.Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      idol: props.idol
    };
  }

  handleOnChange = e => {
   e.preventDefault(e);
   this.setState({
     [e.target.name]: e.target.value
   }, () => (console.log(this.state)));
 };

  render() {
    console.log(this.state.idol);
    return (<React.Fragment>
      <Modal show={this.props.show} onHide={this.props.onClose}>
        <Modal.Header closeButton="closeButton">
          <Modal.Title>{
              this.props.idol == null
                ? 'Create new idol'
                : `Edit ${this.props.idol.first} ${this.props.idol.last}`
            }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="text" name="first" placeholder="Firstname" value={this.state.idol != null ? this.state.idol.first : ""} onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" name="last" placeholder="Lastname" value={this.state.idol != null ? this.state.idol.last : ""} onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Image Url" onChange={this.handleOnChange}/>
              <Image className="mt-3" src="https://via.placeholder.com/150/d32776" rounded />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.onClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>)
  }
}

export default IdolModalForm;
