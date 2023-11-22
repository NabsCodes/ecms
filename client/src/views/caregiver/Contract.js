import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "../../data/api";
import { FaUserCircle } from "react-icons/fa";
import Notifications from "components/Notification/Notification";
import { useAuth } from "contexts/AuthContext";

// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Row,
  Col
} from "reactstrap";

function Contracts() {
  const [mode, setMode] = useState('view');
  const [current, setCurrent] = useState({ email: "" });
  const [search, setSearch] = useState('');
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const { userDetail } = useAuth();


  useEffect(
    () => {
      async function fetchContracts() {
        await axios.get(user.showUserByEmail + "/" + userDetail.email).then((response) => {
          if (response.data.status === true) {
            setCurrent(response.data.data);
          }
          else {
            setNotificationDetails({ msg: "Error Loading Contracts, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchContracts();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function checkDates(start1, end1) {
    if (!start1 || !end1) {
      return false;
    }
    const date = new Date();

    const start = new Date(start1);
    const end = new Date(end1);
    let result = null;

    if (date > start && date < end) {
      result = true;
    } else {
      result = false;
    }
    return result;
  }


  return (
    <>
      {notificationStatus === true ? <Notifications details={notificationDetails} /> : null}
      <div className="content">

        {mode === "view" ?
          <>

            <Row>
              <Col md={4}>
                <Card className="card-user">
                  <div style={{ textAlign: "center" }}>
                    <h4 style={{ marginTop: "10px" }}>{current.first_name + " " + current.last_name}</h4>
                    <FaUserCircle size={100} />
                    <h5 style={{ marginTop: "10px" }}>{"Contracts: " + current?.Contracts?.length || 0}</h5>
                  </div>

                </Card>
              </Col>
              <Col md={8}>
                <Card className="card-user">
                  <div style={{ textAlign: "center" }}>
                    <h4 style={{ marginTop: "10px" }}>All Contracts</h4>
                    <Table>
                      <thead>
                        <tr>
                          <th>Start/End Date</th>
                          <th>Description</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(current.Contracts || []).map((items, key) => {
                          return (
                            <tr key={key}>
                              <td>
                                {items.start_date + " - " + items.end_date}<br />
                              </td>
                              <td> {items.description}</td>
                              <td>
                                {checkDates(items.start_date, items.end_date) ?
                                  <div style={{ background: "rgb(46, 212, 122)", color: "white", borderRadius: "10px", cursor: "not-allowed" }}>Valid</div> :
                                  <>
                                    {key === 0 ?
                                      <div style={{ background: "orange", color: "white", borderRadius: "10px", cursor: "pointer" }} onClick={() => { setCurrent({ ...current, email: items.email }); setMode("add"); }}>Renew?</div>
                                      :
                                      <div style={{ background: "crimson", color: "white", borderRadius: "10px", cursor: "not-allowed" }}>Expired</div>
                                    }
                                  </>


                                }
                              </td>

                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </div>

                  <CardBody>

                  </CardBody>
                </Card>
              </Col>
            </Row>
          </>
          : null
        }

      </div>
    </>
  );
}

export default Contracts;
