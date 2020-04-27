import React from "react";
import { connect } from "react-redux";
import { loadBugs } from "../store/bugs";

class Bugs extends React.Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  componentWillUnmount() {}

  render() {
    return (
      <ul>
        {this.props.bugs.map(bug => (
          <li key={bug.id}>{bug.description}</li>
        ))}
      </ul>
    );
  }
}

// bugs: state.entities.bugs.list
const mapStateToProps = state => ({
  bugs: state.entities.bugs.list
});

const mapDispatchToProps = dispatch => ({
  loadBugs: () => dispatch(loadBugs())
});

// High Order Component or Container component wraps around the presentation component (Bugs)
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
