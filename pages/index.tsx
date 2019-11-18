import React, { useState, useMemo, useEffect } from 'react';
import { Gql, Zeus, User } from '../src/generated/graphql-zeus';

interface IProps {}

const Home: React.FC<IProps> = () => {
  const [users, setUsers] = useState<User[]>([]);

  // CALL GRAPHQL QUERY
  const findUsers = async () => {
    const { findUser } = await Gql.Query({
      findUser: [
        {
          lastName: '환'
        },
        {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          name: true
        }
      ]
    });

    return findUser;
  };

  // SET STATE USERS
  useEffect(() => {
    findUsers().then(value => {
      setUsers(value);
    });
  }, []);

  return (
    <div>
      {users &&
        users.map((value, index) => (
          <>
            <div>ID: {value.id}</div>
            <div>FIRST NAME: {value.firstName}</div>
            <div>LAST NAME: {value.lastName}</div>
            <div>EMAIL: {value.email}</div>
            <div>NAME: {value.name}</div>
            <hr />
          </>
        ))}
    </div>
  );
};

export default Home;
