import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";

export default function Layout() {
  return <div className="flex-container">
    <Navbar />
    <main className="container flex-grow-1">
      <Offline><div className="alert alert-warning mt-3" role="alert">You are offline. Some information may be unavailable.</div></Offline>
      <Outlet />
    </main>
    <Footer />
  </div>;
}