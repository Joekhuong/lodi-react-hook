import React from "react";
import { connect } from "./store";
import { Container, Row, Table, ListGroup } from "react-bootstrap";
import { getFollowedIdolForUser } from "./FollowModel";
import { Link, withRouter } from "react-router-dom";

const mapStateToProps = (state, props) => ({
  regions: state.regions,
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({});

class FollowedIdolTable extends React.Component {
  state = {
    idols: []
  };

  componentDidMount() {
    getFollowedIdolForUser(this.props.user.user_info.id)
      .then(res => {
        this.setState({ idols: res });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <Container fluid="true">
        <Row className="">
          <h2 className="d-block">Your idols</h2>
          <ListGroup variant="flush">
            {Object.keys(this.state.idols).map((item, index) => {
              return (
                <ListGroup.Item key={index}>
                    <Link
                      className=""
                      to={"/idol/" + this.state.idols[item].page_id}
                    >
                      <span>
                        {this.state.idols[item].idol_name}
                      </span>
                    </Link>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(FollowedIdolTable));
