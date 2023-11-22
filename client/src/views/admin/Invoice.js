import React, { useState, useEffect } from "react";
import axios from "axios";
import { invoice_api, user } from "../../data/api";
import { BsArrowBarLeft, BsPlusSquareFill, BsEye } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
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

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [mode, setMode] = useState('all');
  const [current, setCurrent] = useState({ email: "", description: '', amount: '' });
  const [userFound, setUserFound] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [search, setSearch] = useState('');

  async function fetchUser() {
    await axios.get(user.showUserByEmail + "/" + current.email).then((response) => {
      if (response.data.status === true) {
        setUserFound(response.data.data);
        setNotificationDetails({ msg: "User found successfully", type: "success" });
        setNotificationStatus(true);
      }
      else {
        setNotificationDetails({ msg: "Error finding user, Please Referesh The Page", type: "danger" });
        setNotificationStatus(true);
      }
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

  useEffect(
    () => {
      async function fetchInvoices() {
        await axios.get(invoice_api.showInvoices, { params: { ...pagination, search } }).then((response) => {
          if (response.data.status === true) {
            setInvoices(response.data.data);
            if (pagination.current === 1) setPagination({ ...pagination, count: response.data.count });
          }
          else {
            setNotificationDetails({ msg: "Error Loading Invoices, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchInvoices();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  async function addInvoice(e) {
    e.preventDefault();

    await axios.post(invoice_api.addInvoice, current).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Invoice Added Successfully.", type: "success" });
        setInvoices([...invoices, res.data.data]);
        setPagination({ ...pagination, count: pagination.count + 1 });
        setCurrent({});
        e.target.reset();
      }
      else {
        setNotificationDetails({ msg: "Error Adding Invoice, ensure all fields are filled.", type: "danger" });
      }
      setNotificationStatus(true);
    }).catch((error) => {
      if (error.response) {
        setNotificationDetails({ msg: error.response.data.message, type: "danger" });
        setNotificationStatus(true);
      } else {
        setNotificationDetails({ msg: "Network Error!", type: "danger" });
        setNotificationStatus(true);
      }

    });

  }

  // async function updateInvoice(e) {
  //   e.preventDefault();
  //   await axios.patch(invoice_api.updateInvoice + "/" + current._id, current).then((res) => {
  //     if (res.data.status) {
  //       setNotificationDetails({ msg: "Invoice Updated Successfully.", type: "success" });
  //     }
  //     else {
  //       setNotificationDetails({ msg: "Error updating Invoice.", type: "danger" });
  //     }
  //     setNotificationStatus(true);
  //   }).catch((error) => {
  //     if (error.response) {
  //       setNotificationDetails({ msg: error.response.data.message, type: "danger" });
  //       setNotificationStatus(true);
  //     } else {
  //       setNotificationDetails({ msg: "Network Error!", type: "danger" });
  //       setNotificationStatus(true);
  //     }

  //   });
  // }

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
                <Button onClick={() => { setMode("add"); setCurrent({}) }} className="btn" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
                  <BsPlusSquareFill size={20} style={{ marginRight: "10px" }} />   Add Invoice
                </Button>
              </Col>
            </Row>
            <Card>
              <CardBody>

                <Table responsive>
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((items, key) => {
                      return (
                        <tr key={key}>
                          <td>{items.email}</td>
                          <td>{new Date(items.date_created).toLocaleDateString() + " " + new Date(items.date_created).toLocaleTimeString()}</td>
                          <td>{items.amount}</td>
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
                  <Col><CardTitle tag="h5">Send Invoice</CardTitle></Col>
                  <Col md={3}>
                    <button onClick={() => { setMode("all"); setCurrent({}) }} className="btn" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
                      <BsArrowBarLeft size={20} />   Back to Invoices
                    </button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => { addInvoice(e) }}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          defaultValue={current.email}
                          placeholder="abdul@gmail.com"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Fetch Details</label>
                        <br />
                        <Button style={{ marginTop: "-2px" }} onClick={fetchUser}>Find User</Button>
                      </FormGroup>
                    </Col>
                    {Object.keys(userFound).length > 0 ?
                      <Row style={{ marginTop: "-30px" }}>
                        <Col><h4>Name: {userFound.first_name + " " + userFound.last_name}</h4></Col>
                        <Col><h4>Role: {userFound.role}</h4></Col>
                      </Row> : null
                    }

                  </Row>

                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Amount</label>
                        <Input
                          defaultValue={current.amount}
                          onChange={(e) => setCurrent({ ...current, amount: e.target.value })}
                          placeholder="0.00"
                          type="number"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="12">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Description
                        </label>
                        <Input
                          placeholder="This is an invoice for..."
                          type="textarea"
                          defaultValue={current.description}
                          onChange={(e) => setCurrent({ ...current, description: e.target.value })}
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
                        disabled={Object.keys(userFound).length > 0 ? false : true}
                      >
                        Send Invoice
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
              <BsArrowBarLeft size={20} /> Back to Invoices
            </button>

            <Row>
              <Col col={12}>
                <Card className="card-user">
                  <Row>
                    <Col md={9} style={{ padding: "20px" }}>
                      <img src={logo} alt="cms logo" />
                      <h3 style={{ paddingLeft: "10px" }}> <FaFileInvoice size={30} /> INVOICE</h3>
                    </Col>
                    <Col style={{ padding: "10px" }}>
                      <h4 style={{ marginTop: "10px", marginRight: "10px" }}>Elderly Care Management System</h4>
                    </Col>

                  </Row>

                  <CardBody>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Email</th>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{current.email}</td>
                          <td>{new Date(current.date_created).toLocaleDateString()}</td>
                          <td>{current.amount}</td>
                          <td>{current.description}</td>
                        </tr>
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

export default Invoices;
