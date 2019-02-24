import React from "react";
import { connect } from "./store";
import { Container, Row, Table, Form } from "react-bootstrap";
import { getFollowerInRegion } from "./FollowModel";
import { Link, withRouter } from "react-router-dom";
import LoadingOverlay from "react-loading-overlay";

const mapStateToProps = (state, props) => ({
  regions: state.regions,
  ...props
});

const mapDispatchToProps = (dispatch, props) => ({});

class RankingTable extends React.Component {
  state = {
    select_region: -1,
    onLoading: false,
    ranking_data: [],
    showOverlay: false
  };

  componentDidMount() {
    getFollowerInRegion(this.state.select_region)
      .then(res => {
        this.setState({ onLoading: false, ranking_data: res });
      })
      .catch(err => console.log(err));
  }

  handleOnChange = e => {
    e.preventDefault(e);
    this.setState({
      select_region: e.target.value,
      onLoading: true,
      ranking_data: [],
      showOverlay: true
    });

    getFollowerInRegion(e.target.value)
      .then(res => {
        setTimeout(
          () =>
            this.setState({
              onLoading: false,
              ranking_data: res,
              showOverlay: false
            }),
          2000
        );
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid="true">
        <Row className="">
          <LoadingOverlay
            active={this.state.showOverlay}
            spinner
            text="Loading..."
          >
            <h1 className="d-block">Ranking</h1>
            <Form.Control
              name="select_region"
              disabled={this.state.onLoading}
              value={this.state.select_region}
              onChange={this.handleOnChange}
              as="select"
            >
              <option value="-1">All region</option>
              {Object.keys(this.props.regions).map((item, index) => {
                return (
                  <option key={index} value={item}>
                    {this.props.regions[item]}
                  </option>
                );
              })}
            </Form.Control>
            <Table responsive>
              <tbody>
                {Object.keys(this.state.ranking_data).map((item, index) => {
                  return (
                    <tr key={item}>
                      <td>
                        <Link
                          className=""
                          to={"/idol/" + this.state.ranking_data[item].page_id}
                        >
                          <span>
                            {this.state.ranking_data[item].firstname}{" "}
                            {this.state.ranking_data[item].lastname}
                          </span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </LoadingOverlay>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(RankingTable));
