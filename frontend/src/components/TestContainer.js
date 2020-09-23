import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Layout.css";
import TableHead from "./TableHead";

export default () => {
  const [list, setList] = useState([]);
  const [id, setId] = useState(null);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [country, setcountry] = useState("");
  const [comments, setcomments] = useState("");
  const [countries, setcountries] = useState([]);

  useEffect(() => {
    updateScreen();
  }, []);

  const updateScreen = async () => {
    const res = await axios.get("http://localhost:8080/comments/");
    const countries = await axios.get("https://restcountries.eu/rest/v2/all");

    console.log(res.data);
    console.log(countries);

    setList(res.data);
    setId(null);
    setfirstName("");
    setlastName("");
    setemail("");
    setphone("");
    setaddress("");
    setcountry("");
    setcountries(countries.data);
    setcomments("");
  };

  const onFormSubmit = async (e, id) => {
    e.preventDefault();
    console.log(id);
    if (id === null || id === undefined) {
      await axios.post("http://localhost:8080/comments/", {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        country: country,
        comment: comments,
      });
    } else {
      await axios.put(`http://localhost:8080/comments/`, {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        address: address,
        country: country,
        comment: comments,
      });
    }

    updateScreen();
  };

  const editItem = async (id) => {
    const res = await axios.get(`http://localhost:8080/comments/${id}`);
    setId(res.data.id);
    setfirstName(res.data.firstName);
    setlastName(res.data.lastName);
    setemail(res.data.email);
    setphone(res.data.phone);
    setaddress(res.data.address);
    console.log(res.data.country);
    setcountry(res.data.country);
    //setcountries(res.data.country);
    setcomments(res.data.comment);
  };

  const deleteItem = (id) => {
    axios.delete(`http://localhost:8080/comments/${id}`).then((res) => {
      updateScreen();
    });
  };

  return (
    <div className="container layout-container">
      <div className="row">
        <form
          onSubmit={(e) => {
            onFormSubmit(e, id);
          }}
        >
          <div className="row">
            <div class="input-field col s6">
              <input id="id" type="hidden" value={id} />
              <i class="material-icons prefix">account_circle</i>
              <input
                id="firstName"
                type="text"
                onChange={(e) => {
                  setfirstName(e.target.value);
                }}
                value={firstName}
              />
              <label for="firstName">First Name</label>
            </div>
            <div class="input-field col s6">
              <i class="material-icons prefix">account_circle</i>
              <input
                id="lastName"
                type="text"
                onChange={(e) => {
                  setlastName(e.target.value);
                }}
                value={lastName}
              />
              <label for="lastName">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <i class="material-icons prefix">email</i>
              <input
                id="email"
                type="email"
                class="validate"
                onChange={(e) => {
                  setemail(e.target.value);
                }}
                value={email}
              />
              <label for="email">e-mail</label>
            </div>

            <div class="input-field col s6">
              <i class="material-icons prefix">phone</i>
              <input
                id="phone"
                type="tel"
                onChange={(e) => {
                  setphone(e.target.value);
                }}
                value={phone}
              />
              <label for="phone">Telephone</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s6">
              <i class="material-icons prefix">location_city</i>
              <input
                id="address"
                type="text"
                onChange={(e) => {
                  setaddress(e.target.value);
                }}
                value={address}
              />
              <label for="address">Address</label>
            </div>
            <div className="input-field col s6">
              <select
                id="selectCountries"
                className="browser-default"
                onChange={(e) => {
                  console.log(e.target.value);
                  setcountry(e.target.value);
                }}
              >
                <option value="" disabled selected>
                  Select your country
                </option>
                {countries.map((item) => {
                  return (
                    <option key={item.alpha2Code} value={item.alpha2Code}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className="row">
            <div class="input-field col s12">
              <textarea
                id="comments"
                class="materialize-textarea"
                data-length="120"
                maxLength="120"
                onChange={(e) => {
                  setcomments(e.target.value);
                }}
                value={comments}
              ></textarea>
              <label for="comments">Comments</label>
            </div>
          </div>

          <div className="row">
            <div className="col s3"></div>
            <div className="col s3"></div>
            <div className="col s3"></div>
            <div className="col s3">
              <button
                className="waves-effect waves-light btn right"
                type="submit"
                name="action"
              >
                Enviar<i className="material-icons right">send</i>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="row">
        <div className="col s12">
          <table>
            <TableHead
              columns={[
                "First Name",
                "Last Name",
                "E-mail",
                "Phone",
                "Address",
                "Country",
                "Comment",
                "Edit",
                "Delete",
              ]}
            />
            <tbody>
              {list.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address}</td>
                    <td>{item.country}</td>
                    <td>{item.comment}</td>
                    <td>
                      <button
                        class="waves-effect waves-light btn"
                        onClick={() => {
                          editItem(item.id);
                        }}
                      >
                        <i class="material-icons">edit</i>
                      </button>
                    </td>
                    <td>
                      <button
                        class="waves-effect waves-light btn"
                        onClick={() => {
                          deleteItem(item.id);
                        }}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
