import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  CTable,
  CTableCaption,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import '@coreui/coreui/dist/css/coreui.min.css';
import Buttons from './Buttons';
import Users from './User';
import User from './User';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('https://gorest.co.in/public/v2/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <CTable caption="top" responsive="sm">
        <CTableCaption>List of users</CTableCaption>

        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">ID</CTableHeaderCell>
            <CTableHeaderCell scope="col">Name</CTableHeaderCell>
            <CTableHeaderCell scope="col">Email</CTableHeaderCell>
            <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
            <CTableHeaderCell scope="col">Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {users.map((user) => (
            <CTableRow>
              <CTableHeaderCell scope="row">{user.id}</CTableHeaderCell>
              <CTableDataCell>{user.name}</CTableDataCell>
              <CTableDataCell>{user.email}</CTableDataCell>
              <CTableDataCell>{user.gender}</CTableDataCell>
              <CTableDataCell>{user.status}</CTableDataCell>
              {/* <Buttons id={user.id} /> */}
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </>
  );
};

export default UsersList;

{
  /* <ul>
  {users.map((user) => (
    <li key={user.id}>
      <div>{user.id}</div>
      <div>{user.name}</div>
      <div>{user.email}</div>
      <div>{user.gender}</div>
      <div>{user.status}</div>
    </li>
  ))}
</ul>; */
}
