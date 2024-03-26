// import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "../pages/HomePage";
import Procedures from "../pages/Procedures";
import CreateReservation from "../pages/CreateReservation";

export default function AppRouter() {
  return (
    <Routes>
      <Route exact path="/" index element={<HomePage />} />
      <Route exact path="/procedures" index element={<Procedures />} />
      <Route exact path="/create-reservation/:procedureId" element={<CreateReservation />} />
      {/* {isAuthenticated && <Route path="/about" element={<AboutAuthor />} />}
        {isAuthenticated && <Route path="/newpost" element={<NewPost />} />}
        {isAuthenticated && (
          <Route path="/update-post" element={<UpdatePost />} />
        )}
        <Route path="/post" element={<Post />} />
        {isAuthenticated && <Route path="/logout" element={<Logout />} />}
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="*" element={<Authenticate />} /> */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
