import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody,Button, Card, CardText, CardTitle,Col, Row, Label} from 'reactstrap';
import { Control, Form, Errors} from 'react-redux-form';
import Header from  './HeaderComponent';
import AccountDetail from './AccountDetail';
import Footer from './FooterComponent';
import axios from 'axios';

const required = (val) => val && val.length;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isSignUpOpen: false,
            isLogInOpen: false,
            isLogedIn: false,
            isSearchOpen: false,
            isAddOpen:false,
            isUpdateOpen:false,
            username:'',
            physicallychallenged: "",
            bloodgroup: "",
            skindiseases: "",
            bp: "",
            sugar: "",
            asthma: "",
            heartproblems: "",
            surgeries: "",
            hereditaryproblems: "",
            cancers: "",
            aids: "",
            senseorgansproblems: "",
            name: "",
            adharno: "",
            mobileno: "",
            emgcntno:"",
            born:"",
            gender: "",
            height: "",
            weight: "",
        }

        this.toggleSignUpModal = this.toggleSignUpModal.bind(this);
        this.toggleLogInModal = this.toggleLogInModal.bind(this);
        this.toggleSearchModal = this.toggleSearchModal.bind(this);
        this.toggleAddModal = this.toggleAddModal.bind(this);
        this.toggleUpdateModal = this.toggleUpdateModal.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleAddSubmit = this.handleAddSubmit.bind(this);
        this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    }

    handleUpdateSubmit(values){
        axios.put('http://localhost:5000/people/update/', {
            physicallychallenged: values.physicallychallenged.toString(),
            skindiseases: values.skindiseases.toString(),
            bp: values.bp.toString(),
            sugar: values.sugar.toString(),
            asthma: values.asthma.toString(),
            heartproblems: values.heartproblems.toString(),
            surgeries: values.surgeries.toString(),
            hereditaryproblems: values.hereditaryproblems.toString(),
            cancers: values.cancers.toString(),
            aids: values.aids.toString(),
            senseorgansproblems: values.senseorgansproblems.toString(),
            adharno: values.adharno.toString(),
            mobileno: values.mobileno.toString(),
            emgcntno: values.emgcntno.toString(),
            height: values.height.toString(),
            weight: values.weight.toString(),
        })
        .then(response => {
            console.log(response);
            if(response.data.success){
                alert(response.data.info);
                this.toggleUpdateModal();
            }
            else{
                alert(response.data.info);
            }            
        })
        .catch(error => {console.log(error);})
    }

    handleAddSubmit(values){
        axios.post('http://localhost:5000/people/add/', {
            physicallychallenged: values.physicallychallenged.toString(),
            bloodgroup: values.bloodgroup.toString(),
            skindiseases: values.skindiseases.toString(),
            bp: values.bp.toString(),
            sugar: values.sugar.toString(),
            asthma: values.asthma.toString(),
            heartproblems: values.heartproblems.toString(),
            surgeries: values.surgeries.toString(),
            hereditaryproblems: values.hereditaryproblems.toString(),
            cancers: values.cancers.toString(),
            aids: values.aids.toString(),
            senseorgansproblems: values.senseorgansproblems.toString(),
            name: values.name.toString(),
            adharno: values.adharno.toString(),
            mobileno: values.mobileno.toString(),
            emgcntno: values.emgcntno.toString(),
            born: values.born.toString(),
            gender: values.gender.toString(),
            height: values.height.toString(),
            weight: values.weight.toString(),
        })
        .then(response => {
            if(response.data.success){
                alert(response.data.info);
                this.toggleAddModal()
            }
            else{
                alert(response.data.info);
            }
        })
        .catch(error => {console.log(error);})
    }


    handleSearch(values){
        console.log(values.adharno);
        axios.post('http://localhost:5000/people/search/', {
            adharno: values.adharno
        })
        .then(response => {
            if(!response.data.success && !this.state.isLogedIn){
                alert(response.data.info);
            }
            else if(!response.data.success && this.state.isLogedIn){
                this.toggleAddModal();
            }
            else if(response.data.success){
                this.setState({
                    physicallychallenged: response.data.person.physicallychallenged.toString(),
                    bloodgroup: response.data.person.bloodgroup.toString(),
                    skindiseases: response.data.person.skindiseases.toString(),
                    bp: response.data.person.bp.toString(),
                    sugar: response.data.person.sugar.toString(),
                    asthma: response.data.person.asthma.toString(),
                    heartproblems: response.data.person.heartproblems.toString(),
                    surgeries: response.data.person.surgeries.toString(),
                    hereditaryproblems: response.data.person.hereditaryproblems.toString(),
                    cancers: response.data.person.cancers.toString(),
                    aids: response.data.person.aids.toString(),
                    senseorgansproblems: response.data.person.senseorgansproblems.toString(),
                    name: response.data.person.name.toString(),
                    adharno: response.data.person.adharno.toString(),
                    mobileno: response.data.person.mobileno.toString(),
                    emgcntno: response.data.person.emgcntno.toString(),
                    born: response.data.person.born.toString(),
                    gender: response.data.person.gender.toString(),
                    height: response.data.person.height.toString(),
                    weight: response.data.person.weight.toString(),
                })
                if(!this.state.isLogedIn){
                    this.toggleSearchModal();
                }
                else if(this.state.isLogedIn){
                    this.toggleUpdateModal();
                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    handleLogOut(){
        this.setState({
            isLogedIn: false,
            username:''
        }) 
        window.location.reload(false);
    }

    toggleSignUpModal(){
        this.setState({
            isSignUpOpen: !this.state.isSignUpOpen
        })
    }

    toggleSearchModal(){
        this.setState({
            isSearchOpen: !this.state.isSearchOpen
        })
    }
    toggleAddModal(){
        this.setState({
            isAddOpen: !this.state.isAddOpen
        })
    }

    toggleUpdateModal(){
        this.setState({
            isUpdateOpen: !this.state.isUpdateOpen
        })
    }

    handleSignUpSubmit(values){
        axios.post('http://localhost:5000/users/signup',{
            username:values.username,
            password:values.password
        })
        .then((response) => {
            if(!response.data.success){
                alert(response.data.info)
            }
            else{
                this.toggleSignUpModal();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    toggleLogInModal(){
        this.setState({
            isLogInOpen: !this.state.isLogInOpen
        })
    }

    handleLogInSubmit(values){
        axios.post('http://localhost:5000/users/login', {
            username:values.username,
            password:values.password
        })
        .then((response) => {
            if(!response.data.success){
                alert(response.data.info)
            }
            else{
                this.setState({
                    isLogedIn: true,
                    username:response.data.user.username
                })
                this.toggleLogInModal();
            }
        })
        .catch((error) => {
            console.log(error);
        })
    }

    render(){
        return(
          <div>

            <Header />

            <Modal isOpen={this.state.isUpdateOpen} toggle={this.toggleUpdateModal} contentClassName="modalData">
                <ModalHeader toggle={this.toggleUpdateModal} className = "modalHeader">
                    <h3>{this.state.name}{this.state.adharno}</h3>
                    <p><b>Emergency Contact : </b>{this.state.emgcntno}</p>
                    <p><b>Mobile Number : </b>{this.state.mobileno}</p>
                    <p><b>Born On : </b>{this.state.born}</p>
                    <p><b>Gender : </b>{this.state.gender}</p>
                    <p><b>Height : </b>{this.state.height}</p>
                    <p><b>Weight : </b>{this.state.weight}</p>
                    <p><b>Blood Group: </b>{this.state.bloodgroup}</p>
                </ModalHeader>
                <ModalBody>
                    <p><b>Blood Pressure : </b>{this.state.bp}</p>
                    <br />
                    <p><b>Sugar Level : </b>{this.state.sugar}</p>
                    <br />
                    <p><b>Heart Problems : </b>{this.state.heartproblems}</p>
                    <br />
                    <p><b>Asthma : </b>{this.state.asthma}</p>
                    <br />
                    <p><b>Surgeries : </b>{this.state.surgeries}</p>
                    <br />
                    <p><b>Skin Diseases: </b>{this.state.skindiseases}</p>
                    <br />
                    <p><b>Cancer Problems : </b>{this.state.cancers}</p>
                    <br />
                    <p><b>physically challenged Problems : </b>{this.state.physicallychallenged}</p>
                    <br />
                    <p><b>Sense Organs Problems : </b>{this.state.senseorgansproblems}</p>
                    <br />
                    <p><b>Hereditary Problems : </b>{this.state.hereditaryproblems}</p>
                    <br />
                    <p><b>Aids : </b>{this.state.aids}</p>
                    <br />
                    <br />
                    <h3 className='modalHeader'>Updating Section</h3>
                    <hr />
                    <Form model='update' onSubmit={(values) => this.handleUpdateSubmit(values)}>
                         <Row className="form-group">
                            <Label htmlFor="adharno" md={2}>Adhar No</Label>
                            <Col md={10}>
                                <Control.text model=".adharno" id="adharno" name="adharno"
                                    placeholder="Adhar No"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".adharno"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="mobileno" md={2}>Mobile No</Label>
                            <Col md={10}>
                                <Control.text model=".mobileno" id="mobileno" name="mobileno"
                                    placeholder="Mobile No"
                                    className="form-control"
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="emgcntno" md={2}>Emergency Contact No</Label>
                            <Col md={10}>
                                <Control.text model=".emgcntno" id="emgcntno" name="mobilemgcntno"
                                    placeholder="Contact No"
                                    className="form-control"
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="height" md={2}>Height</Label>
                            <Col md={10}>
                                <Control.text model=".height" id="height" name="height"
                                    placeholder="Feet"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="weight" md={2}>Weight</Label>
                            <Col md={10}>
                                <Control.text model=".weight" id="weight" name="weight"
                                    placeholder="Kgs"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row>
                            <Label className='col ml-5' md={10}><b>If no problems leave the fields Empty. Otherwise enter along with date at end.</b></Label>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="physicallychallenged" md={2}>physically challenged Problems</Label>
                            <Col md={10}>
                                <Control.text model=".physicallychallenged" id="physicallychallenged" name="physicallychallenged"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="skindiseases" md={2}>SKin Diseases</Label>
                            <Col md={10}>
                                <Control.text model=".skindiseases" id="skindiseases" name="skindiseases"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="bp" md={2}>Blood Pressure</Label>
                            <Col md={10}>
                                <Control.text model=".bp" id="bp" name="bp"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="sugar" md={2}>Sugar Level</Label>
                            <Col md={10}>
                                <Control.text model=".sugar" id="sugar" name="sugar"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="asthma" md={2}>Asthma</Label>
                            <Col md={10}>
                                <Control.text model=".asthma" id="asthma" name="asthma"
                                    placeholder="Low/Medium/High"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="heartproblems" md={2}>Heart Problems</Label>
                            <Col md={10}>
                                <Control.text model=".heartproblems" id="heartproblems" name="heartproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="surgeries" md={2}>Surgeries</Label>
                            <Col md={10}>
                                <Control.text model=".surgeries" id="surgeries" name="surgeries"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="hereditaryproblems" md={2}>Hereditary Problems</Label>
                            <Col md={10}>
                                <Control.text model=".hereditaryproblems" id="hereditaryproblems" name="hereditaryproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="cancers" md={2}>Cancer Problems</Label>
                            <Col md={10}>
                                <Control.text model=".cancers" id="cancers" name="cancers"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="aids" md={2}>Aids</Label>
                            <Col md={10}>
                                <Control.text model=".aids" id="aids" name="aids"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="senseorgansproblems" md={2}>Sense Organs Problems</Label>
                            <Col md={10}>
                                <Control.text model=".senseorgansproblems" id="senseorgansproblems" name="senseorgansproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Update</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen={this.state.isAddOpen} toggle={this.toggleAddModal} contentClassName="modalData">
                <ModalHeader toggle={this.toggleAddModal} className = "modalHeader">
                    <h3>Creating New Record</h3>
                </ModalHeader>
                <ModalBody>
                    <Form model='add' onSubmit={(values) => this.handleAddSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="name" md={2}>Name</Label>
                            <Col md={10}>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Name"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".name"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="adharno" md={2}>Adhar No</Label>
                            <Col md={10}>
                                <Control.text model=".adharno" id="adharno" name="adharno"
                                    placeholder="Adhar No"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".adharno"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="mobileno" md={2}>Mobile No</Label>
                            <Col md={10}>
                                <Control.text model=".mobileno" id="mobileno" name="mobileno"
                                    placeholder="Mobile No"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".mobileno"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="emgcntno" md={2}>Emergency Contact No</Label>
                            <Col md={10}>
                                <Control.text model=".emgcntno" id="emgcntno" name="mobilemgcntno"
                                    placeholder="Contact No"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".emgcntno"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="born" md={2}>BOD</Label>
                            <Col md={10}>
                                <Control.text model=".born" id="born" name="born"
                                    placeholder="dd-mm-yyyy suggested"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".born"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="gender" md={2}>Gender</Label>
                            <Col md={10}>
                                <Control.text model=".gender" id="gender" name="gender"
                                    placeholder="M/F/Other"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".gender"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="bloodgroup" md={2}>Blood Group</Label>
                            <Col md={10}>
                                <Control.text model=".bloodgroup" id="bloodgroup" name="bloodgroup"
                                    placeholder="B+ format"
                                    className="form-control"
                                    validators={{
                                        required
                                    }}
                                    />
                                    <Errors
                                        className="text-danger"
                                        model=".gender"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                        }}
                                     />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="height" md={2}>Height</Label>
                            <Col md={10}>
                                <Control.text model=".height" id="height" name="height"
                                    placeholder="Feet"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="weight" md={2}>Weight</Label>
                            <Col md={10}>
                                <Control.text model=".weight" id="weight" name="weight"
                                    placeholder="Kgs"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row>
                            <Label className='col ml-5' md={10}><b>If no problems leave the fields Empty. Otherwise enter along with date at end.</b></Label>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="physicallychallenged" md={2}>physically challenged Problems</Label>
                            <Col md={10}>
                                <Control.text model=".physicallychallenged" id="physicallychallenged" name="physicallychallenged"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="skindiseases" md={2}>SKin Diseases</Label>
                            <Col md={10}>
                                <Control.text model=".skindiseases" id="skindiseases" name="skindiseases"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="bp" md={2}>Blood Pressure</Label>
                            <Col md={10}>
                                <Control.text model=".bp" id="bp" name="bp"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="sugar" md={2}>Sugar Level</Label>
                            <Col md={10}>
                                <Control.text model=".sugar" id="sugar" name="sugar"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="asthma" md={2}>Asthma</Label>
                            <Col md={10}>
                                <Control.text model=".asthma" id="asthma" name="asthma"
                                    placeholder="Low/Medium/High"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="heartproblems" md={2}>Heart Problems</Label>
                            <Col md={10}>
                                <Control.text model=".heartproblems" id="heartproblems" name="heartproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="surgeries" md={2}>Surgeries</Label>
                            <Col md={10}>
                                <Control.text model=".surgeries" id="surgeries" name="surgeries"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="hereditaryproblems" md={2}>Hereditary Problems</Label>
                            <Col md={10}>
                                <Control.text model=".hereditaryproblems" id="hereditaryproblems" name="hereditaryproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="cancers" md={2}>Cancer Problems</Label>
                            <Col md={10}>
                                <Control.text model=".cancers" id="cancers" name="cancers"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="aids" md={2}>Aids</Label>
                            <Col md={10}>
                                <Control.text model=".aids" id="aids" name="aids"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="senseorgansproblems" md={2}>Sense Organs Problems</Label>
                            <Col md={10}>
                                <Control.text model=".senseorgansproblems" id="senseorgansproblems" name="senseorgansproblems"
                                    placeholder=""
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Add</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal  isOpen = {this.state.isSearchOpen} toggle = {this.toggleSearchModal} contentClassName="modalData">
                <ModalHeader toggle={this.toggleSearchModal} className = "modalHeader">
                    <h3>{this.state.name} -{this.state.adharno}</h3>
                    <p><b>Emergency Contact : </b>{this.state.emgcntno}</p>
                    <p><b>Mobile Number : </b>{this.state.mobileno}</p>
                    <p><b>Born On : </b>{this.state.born}</p>
                    <p><b>Gender : </b>{this.state.gender}</p>
                    <p><b>Height : </b>{this.state.height}</p>
                    <p><b>Weight : </b>{this.state.weight}</p>
                    <p><b>Blood Group: </b>{this.state.bloodgroup}</p>
                </ModalHeader>
                <ModalBody>
                    <p><b>Blood Pressure : </b>{this.state.bp}</p>
                    <br />
                    <p><b>Sugar Level : </b>{this.state.sugar}</p>
                    <br />
                    <p><b>Heart Problems : </b>{this.state.heartproblems}</p>
                    <br />
                    <p><b>Asthma : </b>{this.state.asthma}</p>
                    <br />
                    <p><b>Surgeries : </b>{this.state.surgeries}</p>
                    <br />
                    <p><b>Skin Diseases: </b>{this.state.skindiseases}</p>
                    <br />
                    <p><b>Cancer Problems : </b>{this.state.cancers}</p>
                    <br />
                    <p><b>physically challenged Problems : </b>{this.state.physicallychallenged}</p>
                    <br />
                    <p><b>Sense Organs Problems : </b>{this.state.senseorgansproblems}</p>
                    <br />
                    <p><b>Hereditary Problems : </b>{this.state.hereditaryproblems}</p>
                    <br />
                    <p><b>Aids : </b>{this.state.aids}</p>
                    <br />
                    <br />
                </ModalBody>
            </Modal>
            
            <Modal isOpen = {this.state.isSignUpOpen} toggle={this.toggleSignUpModal}>
                <ModalHeader toggle={this.toggleSignUpModal}><h3 className='modalHeader'>Exigency Report </h3><p className='modalHeader'>Sign-UP</p></ModalHeader>
                <ModalBody>
                <Form model='signup' onSubmit={(values) => this.handleSignUpSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username" md={2}>UserName</Label>
                            <Col md={10}>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Password" md={2}>UserName</Label>
                            <Col md={10}>
                                <Control.password model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Sign-Up</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Modal isOpen = {this.state.isLogInOpen} toggle={this.toggleLogInModal}>
                <ModalHeader toggle={this.toggleLogInModal}><h3 className='modalHeader'>Exigency Report </h3><p className='modalHeader'>Log-In</p></ModalHeader>
                <ModalBody>
                <Form model='login' onSubmit={(values) => this.handleLogInSubmit(values)}>
                        <Row className="form-group">
                            <Label htmlFor="username" md={2}>UserName</Label>
                            <Col md={10}>
                                <Control.text model=".username" id="username" name="username"
                                    placeholder="User Name"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="Password" md={2}>UserName</Label>
                            <Col md={10}>
                                <Control.password model=".password" id="password" name="password"
                                    placeholder="Password"
                                    className="form-control"/>
                            </Col>
                        </Row>
                        <Button type="submit" className='modalButton'>Log-In</Button>
                    </Form>
                </ModalBody>
            </Modal>

            <Navbar expand="lg" className='Nav sm-12'>
              <Navbar.Brand href="/" className='NavBrand'>+Exigency Report</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <AccountDetail isLogedIn={this.state.isLogedIn} username={this.state.username} handleLogOut={this.handleLogOut}
                 toggleLogInModal={this.toggleLogInModal} toggleSignUpModal={this.toggleSignUpModal} />
              </Navbar.Collapse>
            </Navbar>

            <div className="search">
                <Form model='search' onSubmit={(values) => this.handleSearch(values)}>
                    <Row className="form-group">
                        <Col md={10}>
                            <Control.text model=".adharno" id="adharno" name="adharno"
                                placeholder="Adhar Number .."
                                className="form-control"/>
                        </Col>
                        <Col md={2}>
                            <Button type='submit' className='SubmitButton'>Search</Button>
                        </Col>
                    </Row>
                </Form>
            </div>

            <div className='detail'>
            <Card body>
              <CardTitle>+Exigency Report</CardTitle>
              <CardText>
                Focuses on increasing the efficiency of treating the patients in emergency conditions by maintaining the health data of every individual in online through a web portal.<br /><br />
                At Present the hospitals and the docotors are giving the hard copies of the patients health data or storing on their own computers/online databases.<br /><br />
                So, By maintaining the health data of the patient in a common web portal for all the hospitals any doctor can treat the patient immediately by knowing the previous health data such as does the patient has any heart/BP/hereditary problems in case of emergency situations. <br /><br />The health data was only maintained by authorized hospitals only by providing sign-in for every individual hospital.
              </CardText>
            </Card>
            </div>

            <Footer/>

          </div>
        );
    }
}




export default Main;