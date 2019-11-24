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

  // CALL GRAPHQL MUTATION
  const createUser = async () => {
    const { register } = await Gql.Mutation({
      register: [
        {
          firstName: '김',
          lastName: '쿠환',
          email: 'younCCbbdsf231g@naver.com',
          password: '5678'
        },
        {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          email: true
        }
      ]
    });

    findUsers().then(value => {
      setUsers(value);
    });

    return register;
  };

  // SET STATE USERS
  useEffect(() => {
    findUsers().then(value => {
      setUsers(value);
    });
  }, []);

  return (
    <div>
      <div>
        <input type='button' value='사용자생성' onClick={createUser}></input>
      </div>
      <div>
        {users &&
          users.map((value, index) => (
            <div key={value.id}>
              <div>ID: {value.id}</div>
              <div>FIRST NAME: {value.firstName}</div>
              <div>LAST NAME: {value.lastName}</div>
              <div>EMAIL: {value.email}</div>
              <div>NAME: {value.name}</div>
              <hr />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
