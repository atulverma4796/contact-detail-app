import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import AddContact from './addContact'

const ContactPage = React.lazy(
  () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import("./showContact")), 1000)
    )
);

export default function MainComponent() {

  return <>
    <Routes>
      <Route path="/" element={
        <Suspense fallback={<div className="spinner"></div>}>
          <ContactPage />
        </Suspense>} />
      <Route path="/addContact" element={<AddContact />} />
      <Route path="/addContact/:id" element={<AddContact />} />
    </Routes>
  </>

}