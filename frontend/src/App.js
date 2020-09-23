import React from "react";
import axios from "axios";
import InputAutocomplete from "./components/InputAutocomplete";
import TableData from "./components/TableData";
import TableHead from "./components/TableHead";
import Button from "./components/Button";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      id: 0,
      name: "",
      email: "",
      password: "",
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/api/").then((res) => {
      console.log("componentDidMount() called");
      console.log(res.data);
      this.setState({
        users: res.data,
        id: 0,
        name: "",
        email: "",
        password: "",
      });
    });
  }

  submit(e, id) {
    e.preventDefault();
    if (id === 0) {
      axios
        .post("http://localhost:8080/api/", {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          this.componentDidMount();
        });
    } else {
      axios
        .put("http://localhost:8080/api/", {
          id: this.state.id,
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
        })
        .then((res) => {
          this.componentDidMount();
        });
    }
  }

  edit = async (id) => {
    axios.get(`http://localhost:8080/api/${id}`).then((res) => {
      this.setState({
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        password: res.data.password,
      });
    });
  };

  delete = async (id) => {
    await axios.delete(`http://localhost:8080/api/${id}`);
    this.componentDidMount();
  };

  updateName = (name) => {
    this.setState({ name: name });
  };

  updateEmail = (email) => {
    this.setState({ email: email });
  };

  updatePassword = (password) => {
    this.setState({ password: password });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col s6">
            <form
              onSubmit={(e) => {
                this.submit(e, this.state.id);
              }}
            >
              <div className="input-field col s12">
                <InputAutocomplete
                  id="inputName"
                  type="text"
                  iconName="person"
                  labelName="Name"
                  updateValue={this.updateName}
                  value={this.state.name}
                />
              </div>
              <div className="input-field col s12">
                <InputAutocomplete
                  id="inputEmail"
                  type="email"
                  iconName="email"
                  labelName="e-mail"
                  updateValue={this.updateEmail}
                  value={this.state.email}
                />
              </div>
              <div className="input-field col s12">
                <InputAutocomplete
                  id="inputPassword"
                  type="password"
                  iconName="vpn_key"
                  labelName="password"
                  updateValue={this.updatePassword}
                  value={this.state.password}
                />
              </div>
              <div class="input-field col s12">
                <Button
                  btnName="Submit"
                  icon="send"
                  btnPosition="right"
                  iconBtnPosition="right"
                />
              </div>
            </form>
          </div>
          <div className="col s6">
            <table>
              <TableHead
                columns={["Name", "Email", "Password", "Edit", "Delete"]}
              />
              <tbody>
                <TableData
                  list={this.state.users}
                  edit={this.edit}
                  delete={this.delete}
                />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
