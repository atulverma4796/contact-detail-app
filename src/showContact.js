import React, { useEffect, useState } from "react";
import './index.css';
import GoToAdd from "./goToAdd";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Link } from "react-router-dom";


const ShowContact = () => {
  const [contactData, setContactData] = useState([])
  useEffect(() => {
    let data = JSON.parse(localStorage.getItem('contact'));
    if (data !== null && data.length !== 0) {
      setContactData(data)
    }
  }, [])

  const deleteContact = () => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: (index) => {
            let data = JSON.parse(localStorage.getItem('contact'));
            if (data !== null && data.length !== 0) {
              data.splice(index, 1)
              // console.log(data)
              // setContactData(data)
              localStorage.setItem('contact', JSON.stringify(data));
              window.location = "/"
            }
          }
        },
        {
          label: 'No',
          onClick: () => {
            // window.location="/"
          }
        }
      ]
    });
  }
  return <>
    {contactData.length !== 0 ?
      <div className="contact_table">
        <div className="header">
          <h3 className="table_caption">Contact Detail Table</h3>
          <Link to="/addContact">
            <button className="add_button">Add Detail</button>
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Serial No.</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Type</th>
              <th>isWhatsapp</th>
              <th>Operation</th>
            </tr>
          </thead>
          <tbody>
            {contactData.map((value, index) => <tr key={index}>
              <td>{index + 1}</td>
              <td>{value.name}</td>
              <td>{value.phone}</td>
              <td>{value.type}</td>
              <td>{value.isWhatsapp ? 'Yes' : 'No'}</td>
              <td>
                <Link to={`/addContact/${value.id}`}>
                  <button className="edit_button">Edit</button>
                </Link>
                <button className="delete_button" onClick={() => deleteContact(index)}>Delete</button>
              </td>
            </tr>)}
          </tbody>
        </table>
      </div>
      : <div className=""><GoToAdd /></div>}
  </>
}
export default ShowContact;