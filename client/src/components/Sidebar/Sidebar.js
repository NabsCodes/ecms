import React from "react";
import { NavLink } from "react-router-dom";
import { Nav } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "../../assets/img/logo.png";

var ps;

function Sidebar(props) {
  const sidebar = React.useRef();
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  };
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
    };
  });
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo" style={{ textAlign: "center" }}>
        {/* <a
          href="#"
          className="simple-text logo-mini"
        >
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a> */}
        <a
          href="#"
          className="simple-text logo-normal"
        >
          CMS Elderly Home

        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? " active-pro" : "")
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  {prop.icon_comp ? <>{prop.icon_comp} <span style={{ paddingLeft: '15px' }}> {prop.name}</span></> : <><i className={prop.icon} /> <p>{prop.name}</p></>}

                </NavLink>
              </li>
            );
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
