import React, { useReducer, useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../App.js';

const initialState = {
  showWebsite: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { showWebsite: action.payload };
    default:
      return state;
  }
};

const Table = () => {
  const { state } = useContext(userContext);
  const { users } = state;
  const [stateInTable, dispatch] = useReducer(reducer, initialState);
  console.log(stateInTable.showWebsite);
  const rightArrow = <> &rarr; </>;
  const downArrow = <> &darr; </>;

  const showHideEmail = (e) => {
    users.filter((user) => {
      const tempArr = [...stateInTable.showWebsite];
      if (Number(user.id) === Number(e.currentTarget.id)) {
        tempArr[Number(user.id - 1)] = !tempArr[Number(user.id - 1)];
        // setShowWebsite([...tempArr])
        dispatch({ type: 'SUCCESS', payload: [...tempArr] });
      }
    });
  };
  return (
    <table>
      <thead>
        <tr>
          <td>name</td>
          <td>username</td>
          <td>
            email
            <span>
              {stateInTable.showWebsite.includes(true) ? ' & website' : ''}
            </span>
          </td>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => {
          return (
            <tr key={user.id}>
              <td>
                <Link to={`info/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.username}</td>
              <td>
                {user.email}
                <span id={user.id} onClick={showHideEmail}>
                  {stateInTable.showWebsite[user.id - 1]
                    ? rightArrow
                    : downArrow}
                </span>
                {stateInTable.showWebsite[user.id - 1] ? (
                  <span>{user.website}</span>
                ) : (
                  ''
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
