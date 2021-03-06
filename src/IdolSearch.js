import React from "react";
import { connect } from "./store";
import {
  Link,
  withRouter,
} from "react-router-dom";
import { searchIdols } from "./IdolModel";
import { Table, Container, Col, Row, Image } from "react-bootstrap";

const mapStateToProps = (state, props) => ({
  ...props,
  ...state
});

const mapDispatchToProps = (dispatch, props) => ({});

class IdolSearch extends React.Component {
  state = {
    idols: []
  };

  componentDidMount() {
    const { term } = this.props.match.params || "";
    this.handleSearch(term);
  }

  componentDidUpdate(prevProps) {
    const { term } = this.props.match.params || "";
    if (this.props.match.params.term !== prevProps.match.params.term) {
      this.handleSearch(term);
    }
  }

  handleSearch = term => {
    searchIdols(term)
      .then(res => {
        console.log(res);
        this.setState({ idols: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  goToPage = page_id => e => {
    this.props.history.push("/idol/" + page_id);
  };

  render() {
    const { term } = this.props.match.params;
    console.log(this.state.idols);

    if (term === undefined) {
      this.props.history.push("/");
    }

    if (this.props.loading_state === true) {
      return null;
    }

    return (
      <Container>
        <Row>
          <Col>
            <h1 className="d-block">Idol search result for "{term}" </h1>
            <Table responsive>
              <tbody>
                {this.state.idols.length > 0 ? (
                  Object.keys(this.state.idols).map((item, index) => {
                    return (
                      <tr>
                        <td>
                          <Image
                            width="50"
                            height="50"
                            className=""
                            src={this.state.idols[item].img_url}
                            rounded
                          />
                        </td>
                        <td>
                          <Link
                            className="nav-link"
                            to={"/idol/" + this.state.idols[item].page_id}
                          >
                            <span>
                              {this.state.idols[item].firstname}{" "}
                              {this.state.idols[item].lastname}
                            </span>
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <h2>No result</h2>
                )}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(IdolSearch));
