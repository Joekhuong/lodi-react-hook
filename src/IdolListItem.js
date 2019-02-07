import React from "react";
import { Button } from "react-bootstrap";

class IdolListItem extends React.Component {

  handleItemClick = (idol) => (e) => {
    this.props.onItemClick(idol);
  }

  render() {
    return (
      <tr>
        <td>{this.props.idol.first}</td>
        <td>{this.props.idol.last}</td>
        <td>
          <Button variant="primary" onClick={this.handleItemClick(this.props.idol)}>
            Edit
          </Button>
        </td>
      </tr>
    );
  }
}

export default IdolListItem;
