import React, { useState, useEffect } from "react";
import axios from "axios";
import { user } from "data/api";
import { BsArrowBarLeft, BsPlusSquareFill, BsEye } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
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

function Clients() {
  const [clients, setClients] = useState([]);
  const [mode, setMode] = useState('all');
  const [current, setCurrent] = useState({});
  const [pagination, setPagination] = useState({ current: 1 });
  const [search, setSearch] = useState('');
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });

  function getAge(dateString) {
    var ageInMilliseconds = new Date() - new Date(dateString);
    return Math.floor(ageInMilliseconds / 1000 / 60 / 60 / 24 / 365); // convert to years
  }

  useEffect(
    () => {
      async function fetchClients() {
        await axios.get(user.showUsers + "/client", { params: { ...pagination, search } }).then((response) => {
          if (response.data.status === true) {
            setClients(response.data.data);
            if (pagination.current === 1) setPagination({ ...pagination, count: response.data.count });
          }
          else {
            setNotificationDetails({ msg: "Error Loading Clients, Please Referesh The Page", type: "danger" });
            setNotificationStatus(true);
          }
        })
      }
      fetchClients();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  async function addClient(e) {
    e.preventDefault();
    await axios.post(user.addUser, { ...current, role: "client" }).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Client Added Successfully.", type: "success" });
        setClients([...clients, res.data.data]);
        setPagination({ ...pagination, count: pagination.count + 1 })
        setCurrent({});
        e.target.reset();
      }
      else {
        setNotificationDetails({ msg: "Error adding client, ensure all fields are present.", type: "danger" });
      }
      setNotificationStatus(true);
    }).catch((error) => {
      if (error.response) {
        setNotificationDetails({ msg: error.response.data.msg || "Error adding client, ensure all fields are present", type: "danger" });
        setNotificationStatus(true);
      } else {
        setNotificationDetails({ msg: "Network Error!", type: "danger" });
        setNotificationStatus(true);
      }

    });
  }

  async function updateClient(e) {
    e.preventDefault();
    await axios.patch(user.updateUser + "/" + current._id, current).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Clients Updated Successfully.", type: "success" });
      }
      else {
        setNotificationDetails({ msg: "Error updating Client.", type: "danger" });
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
  function getColor(status) {
    let temp = "orange";
    if (status === "active") { temp = "#2ED47A"; }
    if (status === "in-active") { temp = "red"; }
    if (status === "on-leave") { temp = "orange"; }
    return temp;
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
                  <BsPlusSquareFill size={20} style={{ marginRight: "10px" }} />   Add Client
                </button>
              </Col>
            </Row>
            <Card>
              <CardBody>

                <Table responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {clients.map((items, key) => {
                      return (
                        <tr key={key}>
                          <td>{items.first_name + " " + items.last_name}</td>
                          <td>{items.email}</td>
                          <td>
                            <div style={{ backgroundColor: getColor(items.status), textAlign: "center", borderRadius: "15px", padding: "3px" }}>
                              {items.status}
                            </div>
                          </td>
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
                  <Col><CardTitle tag="h5">Add Client</CardTitle></Col>
                  <Col md={3}>
                    <button onClick={() => { setMode("all"); setCurrent({}) }} className="btn" style={{ width: "100%", marginTop: "20px", marginBottom: "20px" }}>
                      <BsArrowBarLeft size={20} />   Back to Clients
                    </button>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Form onSubmit={(e) => addClient(e)}>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={current.first_name}
                          placeholder="John"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, first_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={current.last_name}
                          placeholder="Doe"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, last_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          defaultValue={current.email}
                          onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                          placeholder="Email: ena@gmail.com"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exal1">
                          Phone
                        </label>
                        <Input
                          placeholder="Phone"
                          type="text"
                          defaultValue={current.phone}
                          onChange={(e) => setCurrent({ ...current, phone: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Date of Birth</label>
                        <Input
                          defaultValue={current.dob}
                          type="date"
                          onChange={(e) => setCurrent({ ...current, dob: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6" className="pl-1">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          placeholder="Home Address"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, address: e.target.value })}
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <hr></hr>
                  <h6> Medical</h6>

                  <Row>
                  <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Blood Group</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, blood_group: e.target.value } })}
                        >
                          <option disabled selected>Select Relative...</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+","O-"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Genotype</label>
                        <Input
                          placeholder="Genotype"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, genotype: e.target.value } })}
                        >
                          <option disabled selected>Select Genotype...</option>
                          {["AA", "AS", "AC", "SS","SC"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="example">
                          Allergies?
                        </label>
                        <Input
                          placeholder="Allergies"
                          type="text"
                          defaultValue={current?.Medical?.allergy}
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, allergy: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col  md="12">
                      <FormGroup>
                        <label htmlFor="exampleInpu">
                          Others
                        </label>
                        <Input
                          placeholder="Other Info"
                          type="text"
                          defaultValue={current?.Medical?.others}
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, others: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr></hr>
                  <h6> Next of Kin</h6>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue={current?.NextOfKin?.name}
                          placeholder="John"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, name: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue={current?.NextOfKin?.phone}
                          placeholder="090..."
                          type="text"
                          onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, phone: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={current?.NextOfKin?.address}
                          placeholder="98 Ahmadu Zubairu Way"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, address: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Relationship</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, relationship: e.target.value } })}
                        >
                          <option disabled selected>Select Relative...</option>
                          {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative", "Friend"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr></hr>
                  <h6> Emergency Contact</h6>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <Input
                          defaultValue={current?.EmergencyContact?.name}
                          placeholder="John Doe"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, name: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue={current?.EmergencyContact?.phone}
                          placeholder="090....."
                          type="text"
                          onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, phone: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={current?.EmergencyContact?.address}
                          placeholder="98 Ahmadu Zubairu Way"
                          type="text"
                          onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, address: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="3">
                      <FormGroup>
                        <label>Relationship</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, relationship: e.target.value } })}
                        >
                          <option disabled selected>Select Relative...</option>
                          {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Password</label>
                        <Input
                          defaultValue={current.password}
                          placeholder="*****"
                          type="password"
                          onChange={(e) => setCurrent({ ...current, password: e.target.value })}
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
                      >
                        Add Client
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
              <BsArrowBarLeft size={20} /> Back to Clients
            </button>

            <Row>
              <Col md={8}>
                <Card className="card-user">
                  <div style={{ textAlign: "center" }}>
                    <h4 style={{ marginTop: "10px" }}>{current.first_name + " " + current.last_name}</h4>
                    <FaUserCircle size={100} />
                    <h5 style={{ marginTop: "10px" }}>{getAge(current.dob) + " Years Old"}</h5>
                  </div>

                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>First Name</label>
                            <Input
                              defaultValue={current.first_name}
                              placeholder="John"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, first_name: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Last Name</label>
                            <Input
                              defaultValue={current.last_name}
                              placeholder="Doe"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, last_name: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Email</label>
                            <Input
                              defaultValue={current.email}
                              onChange={(e) => setCurrent({ ...current, email: e.target.value })}
                              placeholder="Email: ena@gmail.com"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">
                              Phone
                            </label>
                            <Input
                              placeholder="Phone"
                              type="text"
                              defaultValue={current.phone}
                              onChange={(e) => setCurrent({ ...current, phone: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Date of Birth</label>
                            <Input
                              defaultValue={current.dob}
                              type="date"
                              onChange={(e) => setCurrent({ ...current, dob: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="6" className="pl-1">
                          <FormGroup>
                            <label>Status</label>
                            <Input
                              placeholder="Status"
                              type="select"
                              onChange={(e) => setCurrent({ ...current, status: e.target.value })}
                            >
                              <option>{current.status}</option>
                              {["active", 'suspended', "on-leave", "suspended", "in-active"].map((stat, key) => {
                                return (
                                  <>{current.status !== stat ? <option>{stat}</option> : null}</>
                                )
                              })}


                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue={current.address}
                              placeholder="Home Address"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, address: e.target.value })}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <hr></hr>
                  <h6> Medical</h6>

                  <Row>
                  <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Blood Group</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, blood_group: e.target.value } })}
                        >
                          <option disabled selected>{current?.Medical?.blood_group||"Select Blood Group..."}</option>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+","O-"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Genotype</label>
                        <Input
                          placeholder="Genotype"
                          type="select"
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, genotype: e.target.value } })}
                        >
                          <option disabled selected>{current?.Medical?.genotype||"Select Genotype..."}</option>
                          {["AA", "AS", "AC", "SS","SC"].map((stat, key) => {
                            return (
                              <option key={key}>{stat}</option>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>

                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exaple">
                          Allergies?
                        </label>
                        <Input
                          placeholder="Allergies"
                          type="text"
                          defaultValue={current?.Medical?.allergy}
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, allergy: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col  md="12">
                      <FormGroup>
                        <label htmlFor="exampleInpu">
                          Others
                        </label>
                        <Input
                          placeholder="Other Info"
                          type="text"
                          defaultValue={current?.Medical?.others}
                          onChange={(e) => setCurrent({ ...current, Medical: { ...current.Medical, others: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                      <hr></hr>
                      <h6> Next of Kin</h6>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Name</label>
                            <Input
                              defaultValue={current?.NextOfKin?.name}
                              placeholder="John"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, name: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Phone</label>
                            <Input
                              defaultValue={current?.NextOfKin?.phone}
                              placeholder="090..."
                              type="text"
                              onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, phone: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue={current?.NextOfKin?.address}
                              placeholder="98 Ahmadu Zubairu Way"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, address: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3" className="pl-1">
                          <FormGroup>
                            <label>Relationship</label>
                            <Input
                              placeholder="Relationship"
                              type="select"
                              onChange={(e) => setCurrent({ ...current, NextOfKin: { ...current.NextOfKin, relationship: e.target.value } })}
                            >
                              <option>{current?.NextOfKin?.relationship || "Select Relationship..."}</option>
                              {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative", "friend"].map((stat, key) => {
                                return (
                                  <>{current?.NextOfKin?.relationship !== stat ? <option>{stat}</option> : null}</>
                                )
                              })}


                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <hr></hr>
                      <h6> Emergency Contact</h6>
                      <Row>
                        <Col className="pr-1" md="3">
                          <FormGroup>
                            <label>Name</label>
                            <Input
                              defaultValue={current?.EmergencyContact?.name}
                              placeholder="John Doe"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, name: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Phone</label>
                            <Input
                              defaultValue={current?.EmergencyContact?.phone}
                              placeholder="090....."
                              type="text"
                              onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, phone: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue={current?.EmergencyContact?.address}
                              placeholder="98 Ahmadu Zubairu Way"
                              type="text"
                              onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, address: e.target.value } })}
                            />
                          </FormGroup>
                        </Col>
                        <Col md="3" className="pl-1">
                          <FormGroup>
                            <label>Relationship</label>
                            <Input
                              placeholder="Relationship"
                              type="select"
                              onChange={(e) => setCurrent({ ...current, EmergencyContact: { ...current.EmergencyContact, relationship: e.target.value } })}
                            >
                              <option>{current?.EmergencyContact?.relationship || "Select Relationship"}</option>
                              {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative", "Friend"].map((stat, key) => {
                                return (
                                  <>{current?.EmergencyContact?.relationship !== stat ? <option>{stat}</option> : null}</>
                                )
                              })}


                            </Input>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Password</label>
                            <Input
                              placeholder="*****"
                              type="password"
                              onChange={(e) => setCurrent({ ...current, password: e.target.value })}
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
                            onClick={updateClient}
                          >
                            update Details
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col md={4}>
                <Card className="card-user">
                  <div style={{ textAlign: "center" }}>
                    <h4 style={{ marginTop: "10px" }}>Elderly Monitoring Contract</h4>

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

export default Clients;
