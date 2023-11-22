import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import Notifications from "components/Notification/Notification";
import { user } from '../../data/api';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

function User() {
  const { userDetail, setUserDetail } = useAuth();
  const [profile, setProfile] = useState(userDetail);
  const [notificationStatus, setNotificationStatus] = useState(false)
  const [notificationDetails, setNotificationDetails] = useState({ msg: "", type: "" });

  async function editProfile(e) {
    e.preventDefault();
    await axios.patch(user.updateUser + "/" + profile._id, profile).then((res) => {
      if (res.data.status) {
        setNotificationDetails({ msg: "Profile Updated Successfully", type: "success", change: res.data.change });
        setUserDetail(profile);
      }
      else {
        setNotificationDetails({ msg: "Error Updating Profile", type: "Danger" });
      }
      setNotificationStatus(true);
    });
  }
  return (
    <>
      {notificationStatus ? <Notifications details={notificationDetails} /> : null}
      <div className="content">
        <Row>
          <Col md="4">
            <Card className="card-user">
              <div className="image">

              </div>
              <CardBody style={{ minHeight: "unset", textAlign: "center" }}>
                <div className="author" style={{ textAlign: "center" }}>
                  <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    <FaUserCircle size={100} />
                    <h5 className="title">{profile.first_name + " " + profile.last_name}</h5>
                  </a>
                  <p className="description">@{profile.email}</p>
                </div>
              </CardBody>

            </Card>
          </Col>
          <Col md="8">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Edit Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          defaultValue={profile.email}
                          onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Phone
                        </label>
                        <Input placeholder="Phone" type="text" defaultValue={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label>
                        <Input
                          defaultValue={profile.first_name}
                          placeholder="John"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <Input
                          defaultValue={profile.last_name}
                          placeholder="John Doe"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, last_name: e.target.value })}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={profile.address}
                          placeholder="Home Address"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, address: e.target.value })}
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
                          defaultValue={profile?.NextOfKin?.name}
                          placeholder="John"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, NextOfKin: { ...profile.NextOfKin, name: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue={profile?.NextOfKin?.phone}
                          placeholder="090..."
                          type="text"
                          onChange={(e) => setProfile({ ...profile, NextOfKin: { ...profile.NextOfKin, phone: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={profile?.NextOfKin?.address}
                          placeholder="98 Ahmadu Zubairu Way"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, NextOfKin: { ...profile.NextOfKin, address: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" className="pl-1">
                      <FormGroup>
                        <label>Relationship</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setProfile({ ...profile, NextOfKin: { ...profile.NextOfKin, relationship: e.target.value } })}
                        >
                          <option>{profile?.NextOfKin?.relationship || "Select Relationship..."}</option>
                          {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative", "friend"].map((stat, key) => {
                            return (
                              <>{profile?.NextOfKin?.relationship !== stat ? <option>{stat}</option> : null}</>
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
                          defaultValue={profile?.EmergencyContact?.name}
                          placeholder="John Doe"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, EmergencyContact: { ...profile.EmergencyContact, name: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          defaultValue={profile?.EmergencyContact?.phone}
                          placeholder="090....."
                          type="text"
                          onChange={(e) => setProfile({ ...profile, EmergencyContact: { ...profile.EmergencyContact, phone: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <Input
                          defaultValue={profile?.EmergencyContact?.address}
                          placeholder="98 Ahmadu Zubairu Way"
                          type="text"
                          onChange={(e) => setProfile({ ...profile, EmergencyContact: { ...profile.EmergencyContact, address: e.target.value } })}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3" className="pl-1">
                      <FormGroup>
                        <label>Relationship</label>
                        <Input
                          placeholder="Relationship"
                          type="select"
                          onChange={(e) => setProfile({ ...profile, EmergencyContact: { ...profile.EmergencyContact, relationship: e.target.value } })}
                        >
                          <option>{profile?.EmergencyContact?.relationship || "Select Relationship"}</option>
                          {["Father", "Mother", "Brother", "Sister", "Cousin", "Relative", "Friend"].map((stat, key) => {
                            return (
                              <>{profile?.EmergencyContact?.relationship !== stat ? <option>{stat}</option> : null}</>
                            )
                          })}


                        </Input>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        type="submit"
                        onClick={(e) => editProfile(e)}
                      >
                        Update Profile
                      </Button>
                    </div>
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default User;