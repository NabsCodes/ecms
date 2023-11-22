import React, { useState, useEffect } from "react";
import Notifications from "components/Notification/Notification";
import { MdOutlineEvent } from "react-icons/md";
import { FaFileContract, FaUserCircle } from "react-icons/fa";
import axios from "axios";
import { user } from "data/api";
import { useAuth } from "contexts/AuthContext";
// reactstrap components
import {
  Card,
  CardBody,
  CardTitle,
  Row,
  Col
} from "reactstrap";
// core components


function Dashboard() {
  const { userDetail } = useAuth();
  const [counts, setCounts] = useState({});
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  useEffect(
    () => {
      async function fetchCounts() {
        await axios.get(user.getCounts + "/" + userDetail.email).then((response) => {
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
                    <p className="card-category">Invoices</p>
                    <CardTitle tag="p">Total: {counts.invoices}</CardTitle>
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


      </div>
    </>
  );
}

export default Dashboard;
