import React, { useState, useEffect } from "react";
import axios from "axios";
import { invoice_api } from "../../data/api";
import { BsArrowBarLeft, BsEye } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import logo from "../../assets/img/logo.png";
import Notifications from "components/Notification/Notification";
import RPagination from "components/Pagination/Pagination";
import { useAuth } from "contexts/AuthContext";

// reactstrap components
import {
  Card,
  CardBody,
  Table,
  Row,
  Col,
  InputGroup, InputGroupAddon, InputGroupText, Input
} from "reactstrap";

function Invoices() {
  const [invoices, setInvoices] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });
  const [mode, setMode] = useState('all');
  const [current, setCurrent] = useState({ email: "" });
  const [pagination, setPagination] = useState({ current: 1 });
  const [search, setSearch] = useState('');
  const { userDetail } = useAuth();

  useEffect(
    () => {
      async function fetchInvoices() {
        await axios.get(invoice_api.showInvoice + "/" + userDetail.email, { params: { ...pagination, search } }).then((response) => {
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

            </Row>
            <Card>
              <CardBody>

                <Table>
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
                    <Table>
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
