import React , { useState } from 'react'
import './App.css'
import CrudTasks from './CrudTasks'; 
import 'bootstrap/dist/css/bootstrap.css';

function App() {
 

  return (
    <>
      <div className='App'>
        <main className='container mt-4'>
        <CrudTasks/>
        </main>
      </div>
    </>
  )
}

export default App;
