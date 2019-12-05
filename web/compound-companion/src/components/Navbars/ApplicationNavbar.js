import React from "react";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  UncontrolledTooltip
} from "reactstrap";

function ApplicationNavbar() {
  const [navbarColor, setNavbarColor] = React.useState("navbar");
  const [collapseOpen, setCollapseOpen] = React.useState(false);


  const navMargStyle = {
    marginBottom: '0px'
  };

  React.useEffect(() => {
  });
  return (
    <>
      {collapseOpen ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setCollapseOpen(false);
          }}
        />
      ) : null}
      <Navbar className={navbarColor} style={navMargStyle} expand="lg" color="info">
        <Container>
          <div className="navbar-translate">
            <Link
              className="navbar-brand"
              to="/index"
              id="navbar-brand"
            >
              Compound Companion
            </Link>
            <button
              className="navbar-toggler navbar-toggler"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setCollapseOpen(!collapseOpen);
              }}
              aria-expanded={collapseOpen}
              type="button"
            >
              <span className="navbar-toggler-bar top-bar"></span>
              <span className="navbar-toggler-bar middle-bar"></span>
              <span className="navbar-toggler-bar bottom-bar"></span>
            </button>
          </div>
          <Collapse
            className="justify-content-end"
            isOpen={collapseOpen}
            navbar
          >
            <Nav navbar>
              <NavItem>
                <Link className="nav-link" to="/how-it-works">
                  <i className="now-ui-icons business_bulb-63"></i>
                  <p>How it works</p>
                </Link>
              </NavItem>
              <NavItem>
                <Link className="nav-link" to="/about">
                  <i className="now-ui-icons business_badge"></i>
                  <p>About us</p>
                </Link>
              </NavItem>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret
                  color="default"
                  nav
                  onClick={e => e.preventDefault()}
                >
                  <i className="now-ui-icons design_app mr-1"></i>
                  <p>Application</p>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem to="/portfolio" tag={Link}>
                    <i className="now-ui-icons business_chart-pie-36 mr-1"></i>
                    Portfolio
                  </DropdownItem>
                  <DropdownItem to="/patient" tag={Link}>
                    <i className="now-ui-icons users_single-02 mr-1"></i>
                    Predict
                  </DropdownItem>
                  <DropdownItem to="/recruit" tag={Link}>
                    <i className="now-ui-icons location_world mr-1"></i>
                    Recruit
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default ApplicationNavbar;
