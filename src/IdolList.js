import React from "react";
import { connect } from "./store";
import IdolListItem from "./IdolListItem";
import IdolModalForm from "./IdolModalForm";
import { Button } from "react-bootstrap";
import { createIdol, deleteIdol, updateIdol } from "./IdolModel";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({});

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
      updateIdol(this.props.dispatch,idol)
        .then(res => {
          self.handleClose();
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      createIdol(this.props.dispatch, idol)
        .then(res => {
          self.handleClose();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  handleDeleteIdol = idol_id => {
    deleteIdol(idol_id).catch(err => {
      console.log(err);
    });
  };

  render() {
    return (
      <React.Fragment>
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col" />
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
              <th scope="col" />
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
