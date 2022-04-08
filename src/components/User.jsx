import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CForm, CFormLabel, CFormInput, CFormText, CButton, CContainer } from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

const headers = {
  Authorization: 'Bearer 48f3b6aac5b097baec03ea1c6df126808e0ece2c01d9057ef4f8fd47bb81d1f0',
  'Content-Type': 'application/json',
};

const User = () => {
  const [user, setUser] = useState({
    id: '',
    email: '',
    name: '',
    gender: '',
    status: '',
  });
  const { id } = useParams();

  const getUserById = async (id) => {
    const response = await axios.get(`https://gorest.co.in/public/v2/users/${id}`);
    return response.data;
  };

  const handleChange = (event) => {
    const value = event.target.value;
    setUser({
      ...user,
      [event.target.id]: value,
      [event.target.name]: value,
      [event.target.email]: value,
      [event.target.gender]: value,
      [event.target.status]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status,
    };
    console.log(`Data - ${JSON.stringify(userData)}`);
    axios
      .post(`https://gorest.co.in/public/v2/users`, JSON.stringify(userData), { headers })
      .then((response) => {
        console.log(response.status);
        console.log(response.data);
      });
  };

  useEffect(() => {
    if (id !== undefined) {
      getUserById(id)
        .then((data) => {
          setUser(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
      {id === undefined ? <h1>Add new user</h1> : <h1>Edit user</h1>}
      {/* <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="enter an email"
          value={user.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="enter a name"
          value={user.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="gender"
          placeholder="enter a gender"
          value={user.gender}
          onChange={handleChange}
        />
        <input
          type="text"
          name="status"
          placeholder="enter a status"
          value={user.status}
          onChange={handleChange}
        />
        <button type="submit">{id === undefined ? 'Add' : 'Edit'}</button>
      </form> */}
      <CContainer sm>
        <CForm onSubmit={handleSubmit}>
          <div className="mb-3">
            <CFormLabel htmlFor="inputID">User ID</CFormLabel>
            {/* <CFormInput type="text" name="id" id="inputID" value={user.id} disabled /> */}
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="inputEmail">Email address</CFormLabel>
            <CFormInput
              type="email"
              name="email"
              id="inputEmail"
              value={user.email}
              aria-describedby="emailHelp"
              onChange={handleChange}
            />
            <CFormText id="emailHelp">Enter email.</CFormText>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="inputName">Name</CFormLabel>
            <CFormInput
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              id="inputName"
              aria-describedby="namelHelp"
            />
            <CFormText id="nameHelp">Enter name.</CFormText>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="inputName">Gender</CFormLabel>
            <CFormInput
              type="text"
              name="gender"
              value={user.gender}
              onChange={handleChange}
              id="inputName"
              aria-describedby="genderlHelp"
            />
            <CFormText id="genderHelp">Enter gender.</CFormText>
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="inputStatus">Status</CFormLabel>
            <CFormInput
              type="text"
              name="status"
              value={user.status}
              onChange={handleChange}
              id="inputStatus"
              aria-describedby="statusHelp"
            />
            <CFormText id="statusHelp">Enter status.</CFormText>
          </div>
          <CButton type="submit" color="primary">
            {id === undefined ? 'Add' : 'Edit'}
          </CButton>
        </CForm>
      </CContainer>
    </>
  );
};

export default User;
