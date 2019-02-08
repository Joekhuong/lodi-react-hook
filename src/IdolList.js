import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import firebase from "./Firebase";
import IdolListItem from "./IdolListItem";
import IdolModalForm from "./IdolModalForm";
import { Button } from "react-bootstrap";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({ type: FETCH_REGION, payload: regions });
  }
});

class IdolList extends React.Component {
  state = {
    show: false,
    modal_idol: null
  };

  handleClose = idol => {
    this.setState({ show_modal: false, modal_idol: null });
  };

  handleShow = () => {
    this.setState({ show_modal: true });
  };

  handleItemEdit = item => {
    this.setState(
      {
        modal_idol: item
      },
      () => this.handleShow()
    );
  };

  handleSaveIdol = idol => {
    var self = this;
    if (idol.id !== undefined) {
      firebase
        .firestore()
        .collection("idols")
        .doc(idol.id)
        .set(idol)
        .then(function() {
          console.log("Document successfully written!");
          self.handleClose();
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    } else {
      firebase
        .firestore()
        .collection("idols")
        .add(idol)
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          self.handleClose();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    }
  };

  handleDeleteIdol = idol_id => {
    firebase
      .firestore()
      .collection("idols")
      .doc(idol_id)
      .delete()
      .then(function() {
        console.log("Document successfully deleted!");
      })
      .catch(function(error) {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(this.props.idols).map((item, index) => {
              return (
                <IdolListItem
                  idol={this.props.idols[item]}
                  key={item}
                  onItemEdit={this.handleItemEdit}
                  onItemDelete={this.handleDeleteIdol}
                />
              );
            })}
          </tbody>
        </table>

        <Button variant="primary" onClick={this.handleShow}>
          Create New
        </Button>

        {(() => {
          if (this.state.show_modal) {
            return (
              <IdolModalForm
                show={this.state.show_modal}
                idol={this.state.modal_idol}
                onClose={this.handleClose}
                onSave={this.handleSaveIdol}
              />
            );
          }
        })()}
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolList);
