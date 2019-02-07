import React from 'react';

class IdolListItem extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.idol.first}</td>
        <td>{this.props.idol.last}</td>
      </tr>
    );
  }
}

export default IdolListItem;
