import React from "react";
import { Link } from "react-router-dom";

export default function GoToAdd() {

  return <>
    <div className="goto_add_form">
      <h3>No Contact Detail Found. Please Add!:--</h3>
      <Link to="/addContact">
        <button className="add_button">Add Detail</button>
      </Link>
    </div>
  </>
}