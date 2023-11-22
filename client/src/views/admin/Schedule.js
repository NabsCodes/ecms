import React, { useState, useEffect } from "react";
import axios from "axios";
import { schedule } from "data/api";
import { BsArrowBarLeft, BsPlusSquareFill, BsEye } from "react-icons/bs";
import Notifications from "components/Notification/Notification";
import RPagination from "components/Pagination/Pagination";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  InputGroup, InputGroupAddon, InputGroupText, Input, Form, FormGroup, Button
} from "reactstrap";

function Schedules() {
  const [schedules, setSchedules] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [mode, setMode] = useState('all');
  const [current, setCurrent] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [search, setSearch] = useState('');
  const [date, setDate] = useState({});
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(
    () => {
      async function fetchSchedules() {
        await axios.get(schedule.showAllSchedules, { params: { ...pagination, search } }).then((response) => {
          if (response.data.status === true) {
            setSchedules(response.data.data);
            if ((response.data.data).length > 0) {
              let temp = new Date(response.data.data[0].end_date);
              temp = temp.setDate(temp.getDate() + 1);
              getFirstAndLast(temp);
            }

            if (pagination.current === 1) setPagination({ ...pagination, count: response.data.count });
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
    [search]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  function getFirstAndLast(f) {

    let wDate = new Date();

    if (f) {
      wDate = new Date(f);
    }
    let dDay = wDate.getDay() > 0 ? wDate.getDay() : 7;
    let first = wDate.getDate() - dDay + 1;
    let firstDayWeek = new Date(wDate.setDate(first));
    let lastDayWeek = new Date(wDate.setDate(firstDayWeek.getDate() + 6));

    var firstJanuary = new Date(wDate.getFullYear(), 0, 1);
    var dayNr = Math.ceil((wDate - firstJanuary) / (24 * 60 * 60 * 1000));
    var week = Math.ceil((dayNr + firstJanuary.getDay()) / 7);

    setDate({ first: firstDayWeek.toISOString().split('T')[0], last: lastDayWeek.toISOString().split('T')[0], week });
  };



  async function addSchedule(e) {
    e.preventDefault();
    await axios.post(schedule.addSchedule, date).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Schedule Generated Successfully.", type: "success" });
        if (Object.keys(res.data.data).length) {
          setSchedules([res.data.data, ...schedules]);
          setPagination({ ...pagination, count: pagination.count + 1 });
        }

      }
      else {
        setNotificationDetails({ msg: "Error Adding Schedule.", type: "danger" });
      }
      setNotificationStatus(true);
    }).catch((error) => {
      if (error.response) {
        setNotificationDetails({ msg: error.response.data.msg, type: "danger" });
        setNotificationStatus(true);
      } else {
        setNotificationDetails({ msg: "Network Error!", type: "danger" });
        setNotificationStatus(true);
      }

    });
  }


  return (
    <>
      {notificationStatus === true ? <Notifications details={notificationDetails} /> : null}
      <div className="content">
        {mode === "all" ?
          <>
            <Row style={{ marginTop: "-30px" }}>
              <Col style={{ padding: "20px" }}><h5>Total: {pagination.count || 0}</h5></Col>
              <Col style={{ paddingTop: "22px" }}>
                <InputGroup style={{ borderColor: "#ccc" }}>
                  <Input placeholder="Search..." onChange={(e) => { setSearch(e.target.value) }} />
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                      <i className="nc-icon nc-zoom-split" />
                    </InputGroupText>
                  </InputGroupAddon>
                </InputGroup>
              </Col>
              <Col md={3}>
                <button onClick={() => { setMode("add"); setCurrent({}) }} className="btn" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
                  <BsPlusSquareFill size={20} style={{ marginRight: "10px" }} />   Add Schedule
                </button>
              </Col>
            </Row>
            <Card>
              <CardBody>

                <Table responsive>
                  <thead>
                    <tr>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Week</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedules.map((items, key) => {
                      return (
                        <tr key={key}>
                          <td>{items.start_date}</td>
                          <td>{items.end_date}</td>
                          <td>{items.week}</td>
                          <td>
                            <button onClick={() => { setMode("view"); setCurrent(items) }} className="btn" style={{ margin: "0px", padding: "5px" }}>
                              <BsEye size={20} /> View
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            <RPagination pagination={pagination} setPagination={setPagination} />
          </>
          : null
        }

        {mode === "add" ?
          <>
            <Card className="card-user">
              <CardHeader>
                <Row style={{ marginBottom: "-20px" }}>
                  <Col><CardTitle tag="h5">Generate Schedule</CardTitle></Col>
                  <Col md={3}>
                    <button onClick={() => { setMode("all"); setCurrent({}) }} className="btn" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
                      <BsArrowBarLeft size={20} />   Back to Schedules
                    </button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Start Date</label>
                        <Input
                          value={date.first}
                          type="date"
                          onChange={(e) => getFirstAndLast(e.target.value)}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>End Date</label>
                        <Input
                          value={date.last}
                          type="date"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Week</label>
                        <Input
                          value={date.week}
                          type="text"
                          disabled={true}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={addSchedule}
                      >
                        Generate Schedule
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </>
          : null
        }

        {mode === "view" ?
          <>
            <button onClick={() => { setMode("all"); setCurrent({}) }} className="btn" style={{ margin: "0px", padding: "10px", marginBottom: "15px" }}>
              <BsArrowBarLeft size={20} /> Back to Views
            </button>

            <Row>
              <Col col={12}>
                <Card className="card-user">
                  <CardBody>
                    <Table responsive>
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
                                        {stf.name},<br />
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
          </>
          : null
        }

      </div>
    </>
  );
}

export default Schedules;
