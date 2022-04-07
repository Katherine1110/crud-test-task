import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const User = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();

  const getUserById = async (id) => {
    const response = await axios.get(`https://gorest.co.in/public/v2/users/${id}`);
    return response.data;
  };

  useEffect(() => {
    getUserById(id)
      .then((data) => {
        setUser(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <>
      <h1>User</h1>
      <ul>
        <li key={id}>
          <div>{user.id}</div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          <div>{user.gender}</div>
          <div>{user.status}</div>
        </li>
      </ul>
    </>
  );
};

export default User;
