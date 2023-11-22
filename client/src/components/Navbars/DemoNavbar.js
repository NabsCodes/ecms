import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';
import { FaUserCircle } from 'react-icons/fa';
import { AiFillCloseCircle } from "react-icons/ai";
import Modal from 'react-modal';

import logo from "../../assets/img/logo.png";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  Col,
  Row, Button
} from "reactstrap";


function Header({ props, routes }) {
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [modalIsOpen, setIsModalOpen] = useState(false);


  const [isOpen, setIsOpen] = React.useState(false);
  const [color, setColor] = React.useState("transparent");
  const sidebarToggle = React.useRef();
  const location = useLocation();
  const { userDetail } = useAuth();
  const toggle = () => {
    if (isOpen) {
      setColor("transparent");
    } else {
      setColor("dark");
    }
    setIsOpen(!isOpen);
  };

  const getBrand = () => {
    let brandName = "Default";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  };
  const openSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    sidebarToggle.current.classList.toggle("toggled");
  };
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor("dark");
    } else {
      setColor("transparent");
    }
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateColor.bind(this));
  });
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      sidebarToggle.current.classList.toggle("toggled");
    }
  }, [location]);
  const { getLoggedIn } = useAuth();

  async function logout() {
    try {
      window.localStorage.removeItem("token");
      await getLoggedIn();
    } catch (e) {
      alert(e);
    }

  };
  return (
    // add or remove classes depending if we are on full-screen-maps page or not
    <Navbar
      color={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "dark"
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf("full-screen-maps") !== -1
          ? "navbar-absolute fixed-top"
          : "navbar-absolute fixed-top " +
          (color === "transparent" ? "navbar-transparent " : "")
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>

          <div className="logo">
            <a
              href="#"
              className="simple-text logo-mini"
            >
              <div className="logo-img">
                <img src={logo} style={{ width: "40px", marginRight: "10px" }} alt="react-logo" />
              </div>
            </a>

          </div>
        </div>
        <NavbarBrand href="/">{getBrand()}</NavbarBrand>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">

          <Nav navbar>

            <NavItem>
              <Row >
                <Col style={{ margin: "10px" }}><Link to="user-page"><FaUserCircle size={25} /></Link></Col>
                <Col style={{ marginLeft: "0px" }}> <span className="nav-link btn-rotate" style={{ cursor: "pointer", fontSize: "13px" }}>{userDetail.first_name || ""}</span></Col>
              </Row>


            </NavItem>
            <NavItem>
              <span style={{ cursor: "pointer" }} className="nav-link btn-rotate" onClick={() => setIsModalOpen(true)}>
                Logout
              </span>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setIsModalOpen(false)}
        style={customStyles}
        contentLabel="Logout Modal"
      >
        <button onClick={() => setIsModalOpen(false)}>Close <AiFillCloseCircle color="red" /></button>
        <div style={{ padding: "20px" }}>
          <Button
            className="btn-round"
            color="primary"
            type="submit"
            onClick={() => setIsModalOpen(false)}
          >
            Stay Signed In
          </Button>
          <Button
            onClick={() => logout()}
            style={{ marginLeft: "15px" }}
            className="btn-round"
            color="danger"
            type="submit"
          >
            Logout
          </Button>
        </div>
      </Modal>
    </Navbar>
  );
}

export default Header;
