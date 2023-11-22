import React, { useState, useEffect } from "react";
import Notifications from "components/Notification/Notification";
import { MdOutlineEvent } from "react-icons/md";
import { FaFileContract, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { user } from "data/api";
import Schedules from "../caregiver/Schedule";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
import Contracts from "./Contract";
// core components


function Dashboard() {
  const [counts, setCounts] = useState({});
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  useEffect(
    () => {
      async function fetchCounts() {
        await axios.get(user.getCounts).then((response) => {
          if (response.data.status === true) {
            setCounts(response.data.data);
          }
          else {
            setNotificationDetails({ msg: "Error Loading Counts, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchCounts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
  return (
    <>
      {notificationStatus === true ? <Notifications details={notificationDetails} /> : null}
      <div className="content">
        <Row>
          <Col md={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="9" style={{ fontSize: "20px" }}>
                    <p className="card-category">Contracts</p>
                    <CardTitle tag="p"> Total: {counts.contracts}</CardTitle>
                    <p />
                  </Col>
                  <Col md="3">
                    <div className="icon-big text-center icon-warning">
                      <FaFileContract />
                    </div>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="9" style={{ fontSize: "20px" }}>
                    <p className="card-category">Clients</p>
                    <CardTitle tag="p">Total: {counts.clients}</CardTitle>
                    <p />
                  </Col>
                  <Col md="3">
                    <div className="icon-big text-center icon-warning">
                      <FaUserCircle />
                    </div>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
          <Col md={4}>
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="9" style={{ fontSize: "20px" }}>
                    <p className="card-category">Upcoming Events</p>
                    <CardTitle tag="p"> :</CardTitle>
                    <p />
                  </Col>
                  <Col md="3">
                    <div className="icon-big text-center icon-warning">
                      <MdOutlineEvent />
                    </div>
                  </Col>
                </Row>
              </CardBody>

            </Card>
          </Col>
        </Row>
        <Row>

          <Col md={6}>
            <h5>Contracts</h5>
            <Contracts isDashboard={true} />
          </Col>
          <Col md={6}>
            <h5>Schedule</h5>
            <Schedules />
          </Col>
        </Row>


      </div>
    </>
  );
}

export default Dashboard;
