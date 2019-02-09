import React from "react";
import {Modal, Button, Form, Image} from "react-bootstrap";

class IdolModalForm extends React.Component {

  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      idol: props.idol || {
        firstname: "",
        lastname: "",
        img_url: ""
      }
    };
  }

 handleOnChange = e => {
   e.preventDefault(e);

   // Merge value to state idol
   this.setState({
     ...this.state, idol: {...this.state.idol, [e.target.name]: e.target.value}
   }, () => (console.log(this.state)));
 };

 handleOnClose = (e) => {
   this.props.onClose();
 }

 handleOnSave = (e) => {
   this.props.onSave(this.state.idol);
 }

  render() {
    console.log(this.state.idol);
    return (<React.Fragment>
      <Modal show={this.props.show} onHide={this.handleOnClose}>

        <Modal.Header closeButton="closeButton">
          <Modal.Title>{
              this.props.idol == null
                ? 'Create new idol'
                : `Edit ${this.props.idol.firstname} ${this.props.idol.lastname}`
            }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Firstname</Form.Label>
              <Form.Control type="text" name="firstname" placeholder="Firstname" value={this.state.idol.firstname} onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Lastname</Form.Label>
              <Form.Control type="text" name="lastname" placeholder="Lastname" value={this.state.idol.lastname} onChange={this.handleOnChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicChecbox">
              <Form.Label>Image URL</Form.Label>
              <Form.Control type="text" placeholder="Image Url" name="img_url" value={this.state.idol.img_url} onChange={this.handleOnChange}/>
              <Image className="mt-3" src={this.state.idol.img_url} rounded />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleOnClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleOnSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>)
  }
}

export default IdolModalForm;
