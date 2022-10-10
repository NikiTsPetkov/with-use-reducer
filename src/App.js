import React, { useEffect, createContext, useReducer } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import Table from './pages/Table';
import About from './pages/About';
import Info from './pages/Info';
import './style.css';

const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return { users: action.payload };
    case 'ERROR':
      return state;
  }
};

export const userContext = createContext();
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );
        const data = await response.json();
        dispatch({ type: 'SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'ERROR' });
      }
    };
    getUsers();
  }, []);
  return (
    <BrowserRouter>
      <userContext.Provider value={{ state }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Table />} />
            <Route path="info/:id" element={<Info />} />
            <Route path="about" element={<About />} />
          </Route>
        </Routes>
      </userContext.Provider>
    </BrowserRouter>
  );
}
