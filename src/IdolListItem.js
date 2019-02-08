import React from "react";
import { Button } from "react-bootstrap";

class IdolListItem extends React.Component {

  handleEditClick = (idol) => (e) => {
    this.props.onItemEdit(idol);
  }

  handleDeleteClick = (idol_id) => (e) => {
    this.props.onItemDelete(idol_id);
  }

  render() {
    return (
      <tr>
        <td>{this.props.idol.firstname}</td>
        <td>{this.props.idol.lastname}</td>
        <td>
          <Button variant="primary" onClick={this.handleEditClick(this.props.idol)}>
            Edit
          </Button>
          <Button variant="primary" onClick={this.handleDeleteClick(this.props.idol.id)}>
            Delete
          </Button>
        </td>
      </tr>
    );
  }
}

export default IdolListItem;
