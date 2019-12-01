/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container } from "reactstrap";

// core components

function DefaultFooter() {
  return (
    <>
      <footer className="footer footer-default">
        <Container>
          <nav>
            <ul>
              <li>
              </li>
            </ul>
          </nav>
          <div className="copyright" id="copyright">
             {new Date().getFullYear()}, Designed for W210 |{" "}
              UC Berkeley - MIDS
          </div>
        </Container>
      </footer>
    </>
  );
}

export default DefaultFooter;
