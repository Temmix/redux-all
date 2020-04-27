import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadBugs, resolveBug, unresolvedBugs, addBug } from "../store/bugs";

const BugList = () => {
  const dispatch = useDispatch();
  const bugs = useSelector(unresolvedBugs);

  useEffect(() => {
    dispatch(loadBugs());
  }, [dispatch]);

  return (
    <div>
      <button
        onClick={() => dispatch(addBug({ description: "Generic description" }))}
      >
        Add Bug
      </button>
      <ul>
        {bugs.map(bug => (
          <li key={bug.id}>
            {bug.id} {bug.description}{" "}
            <button onClick={() => dispatch(resolveBug(bug.id))}>
              Resolve
            </button>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BugList;
