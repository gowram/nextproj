import Link from 'next/link'
import axios from 'axios'
import Router from 'next/router'
import { Card, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, Col, FormGroup, Label, Input, FormText, FormFeedback } from 'reactstrap';
export default class EmployeeList extends React.PureComponent {


  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstname: '',
      lastname: '',
      gender: 'male',
      email: '',
      age: '',
      phone: '',
      department: '',
      designation: '',
      salary: ''
    };

    this.openModel = this.openModel.bind(this);
    this.closeModel = this.closeModel.bind(this);
    this.divStyle = { float: 'right', marginTop: '-2.5rem' }
    this.cardStyle = {}
  }


  openModel() {
    this.setState({ modal: true })
  }

  closeModel() {
    this.setState({
      modal: false,
      firstname: '',
      lastname: '',
      gender: 'male',
      email: '',
      age: '',
      phone: '',
      department: '',
      designation: '',
      salary: ''
    })
  }

  update(emp) {
    this.setState({ modal: true, ...emp })
  }

  delete(id) {
    axios.delete(`https://empgene-qpuwizmavx.now.sh/delete/${id}`)
      .then(res => {
        if (res.status === 200 && res.data.ok) {
          document.location.reload()
        }
        else {
          console.log(res);
        }
      })
  }

  handleChange = event => {
    const target = event.target;
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = event => {
    event.preventDefault();
    var person = this.state;
    delete person.modal;

    if (person._id) {
      axios.put(`https://empgene-qpuwizmavx.now.sh/update`, person)
        .then(res => {
          if (res.status === 200) {
            document.location.reload()
          }
          else {
            console.log(res);
          }
        })
    } else {
      axios.post(`https://empgene-qpuwizmavx.now.sh/create`, { person })
        .then(res => {
          if (res.status === 200) {
            this.closeModel();
            document.location.reload();
          }
          else {
            console.log(res);
          }
        })
    }
  }

  render() {
    const { employees } = this.props

    return <div className="list">

      <Card>
        <CardBody>
          <CardTitle>Create New Employee</CardTitle>
          <Button style={this.divStyle} color="success" size="md" onClick={this.openModel}>New</Button>
        </CardBody>
      </Card>

      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <Form >
          <ModalHeader>Create Employee</ModalHeader>
          <ModalBody>

            <FormGroup row>
              <Label for="firstname" sm={4}>First Name</Label>
              <Col sm={8}>
                <Input type="text" name="firstname" id="firstname" value={this.state.firstname} placeholder="enter first name" required onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="lastname" sm={4}>Last Name</Label>
              <Col sm={8}>
                <Input type="text" name="lastname" id="lastname" value={this.state.lastname} placeholder="enter last name" required onChange={this.handleChange} />
                <FormFeedback>last name required!</FormFeedback>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="genderSelect" sm={4}>Gender</Label>
              <Col sm={8}>
                <Input type="select" value={this.state.gender} name="gender" id="genderSelect" required onChange={this.handleChange}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Input>
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="email" sm={4}>Email</Label>
              <Col sm={8}>
                <Input type="email" name="email" id="email" value={this.state.email} placeholder="email@mail.com" required onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="age" sm={4}>Age</Label>
              <Col sm={8}>
                <Input type="number" name="age" id="age" value={this.state.age} onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="phone" sm={4}>Phone</Label>
              <Col sm={8}>
                <Input type="text" name="phone" id="phone" value={this.state.phone} onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="department" sm={4}>Department</Label>
              <Col sm={8}>
                <Input type="text" name="department" id="department" value={this.state.department} onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="designation" sm={4}>Designation</Label>
              <Col sm={8}>
                <Input type="text" name="designation" id="designation" value={this.state.designation} onChange={this.handleChange} />
              </Col>
            </FormGroup>

            <FormGroup row>
              <Label for="salary" sm={4}>Salary</Label>
              <Col sm={8}>
                <Input type="number" name="salary" id="salary" value={this.state.salary} onChange={this.handleChange} />
              </Col>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.closeModel} >Cancel</Button>{' '}
            <Button type="submit" color="primary" onClick={this.handleSubmit}>Save</Button>
          </ModalFooter>
        </Form>
      </Modal>


      {employees.map((emp) => (
        <div className="item" key={emp._id}>
          <h2 className="title">{emp.firstname} - {emp.lastname}</h2>
          <span>{emp.designation} </span>
          <div className="details">
            <a>{emp.email}</a>
          </div>
          <span> {emp.phone}</span>
          <div className="buttons">
            <Button color="info" size="sm" onClick={this.update.bind(this, emp)}>Update</Button>{' '}
            <Button color="danger" size="sm" onClick={this.delete.bind(this, emp._id)}>Remove</Button>
          </div>
        </div>
      ))}

      <style jsx>{`
        .list {
          padding: 1em;
        }
        .title{
          color: indigo;
        }
        .item {
          padding: 1em 0;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .item span {
          font-size: 0.75em;
        }      
        .buttons {
          float: right;
          margin-top: -0.5rem;
        }
        .createbutton {        
          float:right;
        }
        h2 {
          font-size: 1.1em;
          font-weight: 400;
          margin: 0;
          margin-bottom: 0.5em;
        }
        h2 a {
          color: #333;          
          text-decoration: none;
        }
        h2 a:hover {
          text-decoration: underline;
        }
        .details {
          font-size: 0.9em;          
        }
        .details strong {
          margin-right: 1em;
        }
        .details a {
          color: #4871d9;
          text-decoration: none;
          font-size: 0.75em;
        }
      `}</style>

    </div>
  }
}