import React from "react";
import {connect} from "./store";
import {FETCH_REGION} from "./actions";
import firebase from "./Firebase";
import IdolListItem from "./IdolListItem";
import IdolModalForm from "./IdolModalForm";
import {Button} from "react-bootstrap";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({type: FETCH_REGION, payload: regions});
  }
});

class IdolList extends React.Component {

  state = {
    show: false,
    modal_idol: null
  }

  handleClose = () => {
    this.setState({show_modal: false, modal_idol: null});
  };

  handleShow = () => {
    this.setState({show_modal: true});
  };

  handleItemEdit = (item) => {
    this.setState({
      modal_idol: item
    }, () => (this.handleShow()));
  }

  saveIdol = () => {
    firebase.firestore().collection('idols').add({firstname: "Phong", lastname: "Ly"}).then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    }).catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (<React.Fragment>
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">First</th>
            <th scope="col">Last</th>
          </tr>
        </thead>
        <tbody>
          {
            Object.keys(this.props.idols).map((item, index) => {
              return <IdolListItem idol={this.props.idols[item]} key={item} onItemClick={this.handleItemEdit}/>;
            })
          }
        </tbody>
      </table>

      <Button variant="primary" onClick={this.saveIdol}>
        Create New
      </Button>

      {
        (() => {
          if (this.state.show_modal) {
            return (<IdolModalForm show={this.state.show_modal} idol={this.state.modal_idol} onClose={this.handleClose}/>);
          }
        })()
      }
    </React.Fragment>);
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IdolList);
