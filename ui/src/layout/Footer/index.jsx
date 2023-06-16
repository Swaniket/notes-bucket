import React from "react";

function Footer() {
  return (
    <footer className="page-footer font-small blue pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h6>Created with &#10084; by Swaniket Chowdhury</h6>
            <p>
              View the source code in{" "}
              <a href="https://github.com/Swaniket/notes-bucket">Github</a>
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Tech stack</h5>
            <ul className="list-unstyled">
              <li>ReactJS</li>
              <li>Redux</li>
              <li>NodeJS</li>
              <li>MySQL</li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            <h5 className="text-uppercase">Connect with me</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.linkedin.com/in/swaniketchowdhury/">
                  My Linkedin
                </a>
              </li>
              <li>
                <a href="https://github.com/Swaniket">My Github</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        Copyright © 2023 All rights reserved
      </div>
    </footer>
  );
}

export default Footer;
