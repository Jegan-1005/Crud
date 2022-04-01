import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
const Update = () => {
  const initialValues = {
    name: "",
    age: "",
    id: "",
  };
  const history = useHistory();
  const params = useParams();
  const [formValue, setFormValue] = useState(initialValues);
  // const [error, setErrors] = useState("");
  const { name, age, id } = formValue;

  const handleChange = (e) => {
    const { id, value } = e.target;
    let formData = {
      ...formValue,
      ...{
        [id]: value,
      },
    };
    setFormValue(formData);
    console.log(formData, "kkkkkkkkkkk");
  };

  const getData = () => {
    axios
      .post("http://localhost:1005/editUser", { id: params.userId })
      .then((response) => {
        if (response && response.data && response.data.status == true) {
          setFormValue(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error, "errrrr");
      });
  };

  const handleSubmit = () => {
    let data = {
      name: name,
      age: age,
      Id: id,
      id: params.userId,
    };

    axios
      .post("http://localhost:1005/update", data)
      .then((response) => {
        if (response && response.data && response.data.status == true) {
          history.push("/employee");
        }
      })
      .catch((error) => {
        console.log(error, "err");
      });
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(formValue, "formformform");
  return (
    <>
      <h1 className="text-center">Update User</h1>
      <div className="App">
        <div className="information">
          <label>Name:</label>
          <input type="text" id="name" value={name} onChange={handleChange} />
          <br />
          {/* <span style={{ color: "red" }}>{error && error.name} </span> */}
          <label>Age:</label>
          <input type="number" id="age" value={age} onChange={handleChange} />
          {/* <span style={{ color: "red" }}>{error && error.age} </span> */}
          <br />
          <label>Employee ID:</label>
          <input type="number" id="id" value={id} onChange={handleChange} />
          {/* <span style={{ color: "red" }}>{error && error.id} </span> */}
          <br />
          <div>
            <button className="btn btn-info" onClick={handleSubmit}>
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Update;
