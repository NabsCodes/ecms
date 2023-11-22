import React, { useState, useEffect } from "react";
import axios from "axios";
import { schedule } from "data/api";
import Notifications from "components/Notification/Notification";

// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
} from "reactstrap";

function Schedules() {
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [current, setCurrent] = useState({});
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(
    () => {
      async function fetchSchedules() {
        await axios.get(schedule.showAllSchedules).then((response) => {
          if (response.data.status === true) {
            if ((response.data.data)) {
              (response.data.data).map((x) => {
                if (checkDates(x.start_date, x.end_date)) {
                  setCurrent(x);
                }
              })

            }
          }
          else {
            setNotificationDetails({ msg: "Error Loading Schedules, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchSchedules();

    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function checkDates(start1, end1) {
    if (!start1 || !end1) {
      return false;
    }
    const date = new Date();

    const start = new Date(start1);
    const end = new Date(end1);
    let result = null;

    console.log(start.toLocaleDateString(), end.toLocaleDateString(), date.toLocaleDateString());
    if ((date > start && date < end) || (date.toLocaleDateString().substring(0, 10) === start.toLocaleDateString().substring(0, 10) || date.toLocaleDateString().substring(0, 10) === end.toLocaleDateString().substring(0, 10))) {
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

        {current.schedule ?
          <Row>
            <Col col={12}>
              <Card className="card-user">
                <CardBody>
                  <Table>
                    <thead>
                      <tr>
                        <th>Days</th>
                        <th>Staff on Duty</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.values(current.schedule).map((items, key) => {
                        return (
                          <tr key={key}>
                            <td>{key + 1} - {days[key]}</td>
                            <td>
                              <>
                                {items.map((stf, index) => {
                                  return (
                                    <span key={index}>
                                      {stf.name},
                                    </span>

                                  )
                                })}
                              </>
                            </td >
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            </Col>
          </Row>
          :
          <div style={{ textAlign: "center", fontSize: "25px" }}>
            <div style={{ textAlign: "center", fontSize: "25px" }}>
              No schedule generated for this week yet...
            </div>
          </div>
        }
      </div>
    </>
  );
}

export default Schedules;
