import React from "react";
import { Link } from "react-router-dom";

export default function GoToAdd() {
  return (
    <>
      <div className="goto_add_form">
        <h3>Welcome to the Contact App!</h3>
        <br />
        <Link to="/showContact">
          <button className="add_button">Show Contacts</button>
        </Link>
      </div>
    </>
  );
}
