import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import "./index.css";
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const ContactList = () => {
  const filePickerRef = useRef();
  const unique_id = uuid();
  let navigate = useNavigate();
  let { id } = useParams();
  const typeArr = ["Personal", "Office"];
  const [file, setFile] = useState();
  const [contact, setContact] = useState({
    id: "",
    name: "",
    phone: "",
    type: "",
    isWhatsapp: false,
    profilePic: "",
  });
  useEffect(() => {
    if (id) {
      setDataWhenEditIsCall();
    }
    if (!file) {
      return;
    }
    const path = `images/${file.name}`;
    const imageRef = ref(storage, path);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setContact((prev) => ({ ...contact, profilePic: url }));
        });
      })
      .catch((error) => {
        console.log("Not uploaded", error);
      });
  }, [file, id]);
  const setDataWhenEditIsCall = () => {
    let storageDAta = JSON.parse(localStorage.getItem("contact"));
    if (storageDAta !== null && storageDAta.length !== 0) {
      let findData = storageDAta.find((f) => f.id === id);
      if (findData) {
        setContact(() => ({
          ...contact,
          id: findData.id,
          name: findData.name,
          type: findData.type,
          phone: findData.phone,
          isWhatsapp: findData.isWhatsapp,
          profilePic: findData.profilePic,
        }));
      }
    }
    return;
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact((prev) => ({ ...contact, [name]: value }));
  };
  const handleCheckbox = (e) => {
    setContact((prev) => ({ ...contact, [e.target.name]: e.target.checked }));
  };
  const handleImage = (e) => {
    if (e.target.files && e.target.files.length === 1) {
      setFile(e.target.files[0]);
    }
  };
  const handleImageButon = () => {
    filePickerRef.current.click();
  };
  const handleSubmit = () => {
    const storageArr = JSON.parse(localStorage.getItem("contact"));
    const newArr =
      storageArr !== null && storageArr.length !== 0 ? storageArr : [];
    if (!id) {
      const _id = unique_id.slice(0, 4);
      let json = { ...contact, id: _id };
      newArr.push(json);
    } else {
      let editIndex = newArr.findIndex((value) => value.id === id);
      newArr[editIndex] = contact;
    }
    localStorage.setItem("contact", JSON.stringify(newArr));
    navigate("/showContact");
  };

  return (
    <>
      <h3 className="reg_form_heading">Contact Detail Form</h3>
      <div className="container_reg_form">
        <div className="contact_detail">
          <div className="contact_info">
            <label>Name:-</label>
            <input
              type="text"
              name="name"
              value={contact.name}
              onChange={handleChange}
              placeholder="Please Enter Your Name"
            />
          </div>
          <div className="contact_info">
            <label>Phone:-</label>
            <input
              type="text"
              name="phone"
              value={contact.phone}
              onChange={handleChange}
              placeholder="Please Enter Your Number"
            />
          </div>
          <div className="contact_info">
            <label>Type:-</label>
            <select
              className="selet_dd"
              name="type"
              value={contact.type}
              onChange={handleChange}
            >
              <option value="DEFAULT">Please Select Type</option>
              {typeArr.map((value, index) => (
                <option value={value} key={index}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="contact_info">
            <label>Whatsapp:-</label>
            <input
              type="checkbox"
              className="fix-checkbox"
              checked={contact.isWhatsapp}
              onChange={handleCheckbox}
              name="isWhatsapp"
            />
          </div>
          <div className="btn">
            <button className="submit_info" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
        <div className="contact_image">
          <input
            type="file"
            accept=".jpg,.png,.jpeg"
            ref={filePickerRef}
            style={{ display: "none" }}
            onChange={handleImage}
          />
          <div className="image_upload_center">
            <div className="image-upload_preview">
              {contact.profilePic && <img src={contact.profilePic} />}
              {!contact.profilePic && (
                <div className="center">
                  <button
                    className="image-upload-button"
                    onClick={handleImageButon}
                  >
                    Add Pic
                  </button>
                </div>
              )}
            </div>
            {contact.profilePic && (
              <div className="center">
                <button
                  className="image-upload-button"
                  onClick={handleImageButon}
                >
                  Edit Pic
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactList;
