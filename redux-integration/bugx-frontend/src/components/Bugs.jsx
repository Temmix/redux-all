import React from "react";
import { connect } from "react-redux";
import { loadBugs, resolveBug, addBug } from "../store/bugs";

class Bugs extends React.Component {
  componentDidMount() {
    this.props.loadBugs();
  }

  componentWillUnmount() {}

  render() {
    return (
      <React.Fragment>
        <button
          onClick={() =>
            this.props.addBug({ description: "Generic description" })
          }
        >
          Add Bug
        </button>
        <ul>
          {this.props.bugs
            .filter(x => !x.resolved)
            .map(bug => (
              <React.Fragment key={bug.id}>
                <li key={bug.id}>
                  {bug.id} {bug.description}{" "}
                  <button onClick={() => this.props.resolveBug(bug.id)}>
                    Resolve
                  </button>
                </li>
              </React.Fragment>
            ))}
        </ul>
      </React.Fragment>
    );
  }
}

// bugs: state.entities.bugs.list
const mapStateToProps = state => ({
  bugs: state.entities.bugs.list
  // bugs: unresolvedBugs(state), if using this, you wont use the filter method in render method above
});

const mapDispatchToProps = dispatch => ({
  loadBugs: () => dispatch(loadBugs()),
  resolveBug: id => dispatch(resolveBug(id)),
  addBug: bug => dispatch(addBug(bug))
});

// High Order Component or Container component wraps around the presentation component (Bugs)
export default connect(mapStateToProps, mapDispatchToProps)(Bugs);
