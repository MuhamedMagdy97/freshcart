import React, { useState } from "react";
import amazon from "../../Assets/images/partners/amazon.png";
import american from "../../Assets/images/partners/american.png";
import appstore from "../../Assets/images/partners/app store.png";
import googleplay from "../../Assets/images/partners/googleplay.png";
import mastercard from "../../Assets/images/partners/mastercard.png";
import style from "./Footer.module.css";

export default function Footer() {
  const [email, setEmail] = useState("");

  function shareAppLink(event) {
    event.preventDefault();
    const subject = encodeURIComponent("Try FreshCart");
    const body = encodeURIComponent(`Shop FreshCart: ${window.location.origin}${process.env.PUBLIC_URL || ""}/`);
    window.location.assign(`mailto:${encodeURIComponent(email)}?subject=${subject}&body=${body}`);
  }

  return <footer><div className="container-fluid bg-main-light"><div className="row mt-5 m-5"><div className="col-md-12"><h2 className="h3 mt-3">Get the FreshCart app</h2><p className="lead text-capitalize h6 mt-3">We will send you a link to open on your phone.</p><form onSubmit={shareAppLink} className="d-flex align-items-center border-bottom mt-3"><label className="visually-hidden" htmlFor="share-email">Email address</label><input required value={email} onChange={(event) => setEmail(event.target.value)} type="email" id="share-email" placeholder="Email…" className="form-control w-100 mt-3 mb-3" autoComplete="email" /><button className="btn bg-main text-light ms-3 w-25">Share app link</button></form><div className="row border-bottom"><div className="col-md-3"><div className="d-flex align-items-center mt-3"><p className="pe-2">Payment partners</p><img src={amazon} className={style.image} alt="Amazon" /><img src={mastercard} className={style.image} alt="Mastercard" /><img src={american} className={style.image} alt="American Express" /></div></div><div className="col-md-3 ms-auto"><div className="d-flex align-items-center"><img src={appstore} className={style.apps} alt="Download on the App Store" /><img src={googleplay} className={style.apps} alt="Get it on Google Play" /></div></div></div></div></div></div></footer>;
}