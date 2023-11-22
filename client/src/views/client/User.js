import React, { useState } from "react";
import { useAuth } from "contexts/AuthContext";
import Notifications from "components/Notification/Notification";
import { user } from '../../data/api';
import axios from 'axios';
import { FaUserCircle } from "react-icons/fa";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Form,
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
                <CardTitle tag="h5">User Profile</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Email</label>
                        <br />{profile.email}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Phone
                        </label>
                        <br />{profile.phone}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>First Name</label><br />
                        {profile.first_name}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Last Name</label>
                        <br />{profile.last_name}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Address</label>
                        <br />{profile.address}
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr></hr>
                  <h6> Medical</h6>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Genotype</label>
                        <br />{profile?.Medical?.genotype}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Blood Group</label>
                        <br />{profile?.Medical?.blood_group}
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="6">
                      <FormGroup>
                        <label>Allergies</label>
                        <br />{profile?.Medical?.allergy}
                      </FormGroup>
                    </Col>
                    <Col md="12" >
                      <FormGroup>
                        <label>Other Info</label>
                        <br />{profile?.NextOfKin?.other}
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr></hr>
                  <hr></hr>
                  <h6> Next of Kin</h6>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <br />{profile?.NextOfKin?.name}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <br />{profile?.NextOfKin?.phone}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <br />{profile?.NextOfKin?.address}
                      </FormGroup>
                    </Col>
                    <Col md="3" className="pl-1">
                      <FormGroup>
                        <label>Relationship</label>
                        <br />{profile?.NextOfKin?.relationship}
                      </FormGroup>
                    </Col>
                  </Row>
                  <hr></hr>
                  <h6> Emergency Contact</h6>
                  <Row>
                    <Col className="pr-1" md="3">
                      <FormGroup>
                        <label>Name</label>
                        <br />{profile?.EmergencyContact?.name}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Phone</label>
                        <br />{profile?.EmergencyContact?.phone}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Address</label>
                        <br />{profile?.EmergencyContact?.address}
                      </FormGroup>
                    </Col>
                    <Col md="3" className="pl-1">
                      <FormGroup>
                        <label>Relationship</label>
                        <br />{profile?.EmergencyContact?.relationship}
                      </FormGroup>
                    </Col>
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