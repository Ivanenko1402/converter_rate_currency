import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.scss';
import { useAppDispatch } from './app/hooks';
import { Form } from './components/Form';
import { Header } from './components/Header';
import { setRates } from './features/ratesSlice';

function App() {
  const dispatch = useAppDispatch();

  async function getCurrentRate () {
    const URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    const result = await axios.get(URL);

    try {
      dispatch(setRates(result.data));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getCurrentRate();
  }, [])

  return (
    <div className='page'>
      <div className='page_header'>
        <Header />
      </div>
      <hr />
      <div className='page_form'>
        <Form />
      </div>
    </div>
  );
}

export default App;
