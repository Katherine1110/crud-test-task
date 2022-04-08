import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  CTable,
  CTableCaption,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CContainer,
  CToast,
  CToastBody,
  CToastClose,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';

import { useParams } from 'react-router-dom';

const headers = {
  Authorization: 'Bearer 48f3b6aac5b097baec03ea1c6df126808e0ece2c01d9057ef4f8fd47bb81d1f0',
  'Content-Type': 'application/json',
};

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  const getAllUsrs = () => {
    axios
      .get('https://gorest.co.in/public/v2/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllUsrs();
  }, []);

  const addNewUser = () => {
    navigate('/add');
  };

  const editUser = (id) => {
    navigate(`edit/${id}`);
  };

  const deleteUser = (id) => {
    navigate(`delete/${id}`);
  };

  const deleUser = async (id) => {
    await axios.delete(`https://gorest.co.in/public/v2/users/${id}`, { headers }).then(() => {
      alert(`User ${id} deleted`);
      getAllUsrs();
    });
  };

  return (
    <>
      <CContainer sm>
        <CTable caption="top" responsive="sm">
          <CTableCaption>
            <CButton color="success" onClick={addNewUser}>
              Add new
            </CButton>
          </CTableCaption>
          <CTableCaption>List of users</CTableCaption>

          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">ID</CTableHeaderCell>
              <CTableHeaderCell scope="col">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col">Email</CTableHeaderCell>
              <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
              <CTableHeaderCell scope="col">Status</CTableHeaderCell>
              <CTableHeaderCell scope="col">Edit User</CTableHeaderCell>
              <CTableHeaderCell scope="col">Delete User</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {users.map((user) => (
              <CTableRow key={user.id}>
                <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
                <CTableDataCell>{user.name}</CTableDataCell>
                <CTableDataCell>{user.email}</CTableDataCell>
                <CTableDataCell>{user.gender}</CTableDataCell>
                <CTableDataCell>{user.status}</CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="warning"
                    onClick={() => {
                      editUser(user.id);
                    }}>
                    Edit User
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="danger"
                    onClick={() => {
                      deleUser(user.id);
                    }}>
                    Delete User
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CContainer>
    </>
  );
};

export default UsersList;
