import React from "react";
import { connect } from "./store";
import { FETCH_REGION } from "./actions";
import firebase from "./Firebase";
import IdolListItem from "./IdolListItem";

const mapStateToProps = (state, props) => ({
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({
  setRegion: regions => {
    dispatch({ type: FETCH_REGION, payload: regions });
  }
});

class IdolList extends React.Component {
  render() {

    Object.keys(this.props.idols).map((item, index) => (console.log(item,this.props.idols[item])));

    return (
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
              return (
                <IdolListItem idol={this.props.idols[item]} key={item}/>
            )})
          }
        </tbody>
      </table>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IdolList);
