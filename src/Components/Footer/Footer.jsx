import React from "react";
import style from "./Footer.module.css";
import amazon from '../../Assets/images/partners/amazon.png'
import american from "../../Assets/images/partners/american.png";
import appstore from '../../Assets/images/partners/app store.png'
import googleplay from '../../Assets/images/partners/googleplay.png'
import mastercard from '../../Assets/images/partners/mastercard.png'

export default function Footer() {
  return (
    <>
      <footer>
        <div className="container-fluid  bg-main-light">
        <div className="row mt-5 m-5">
          <div className="col-md-12">
            <div className="getApp">
              <h3 className="h2 mt-3">Get The FreshCart App</h3>
              <p className="lead text-capitalize h6 mt-3">
                We Will Send You A Link, Opent it on Your Phone to Download The
                App
              </p>
              <div className="search-button d-flex justify-content-center align-items-center border-bottom mt-3">
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email..."
                  className="form-control w-100 mt-3 mb-3"
                />
                <button className="btn bg-main text-light ms-3  w-25">
                  ShareAppLink
                </button>
              </div>
            </div>
            <div className="row  border-bottom">
              <div className="col-md-3">
                <div className="payment-methods mt-3 pe-5">
                  <div className=" d-flex justify-content-space-evenly align-items-center">
                    <p className=" pe-2  ">Payment Partners</p>
                    <img src={amazon} className={style.image} alt="" />
                    <img src={mastercard} className={style.image} alt="" />
                    <img src={american} className={style.image} alt="" />
                  </div>
                </div>
              </div>
              <div className="col-md-3 ms-auto">
                <div className="app-links d-flex justify-content-space-evenly align-items-center">
                  <img src={appstore} className={style.apps} alt="" />
                  <img src={googleplay} className={style.apps} alt="" />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <div className="m-4 p-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </footer>
    </>
  );
}
