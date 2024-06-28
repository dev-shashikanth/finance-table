// src/App.tsx
import React from 'react';
import './index.css';
import TableComponent from './components/TableComponent';

const App: React.FC = () => {
  return (
    <div className="App p-4">
      <TableComponent />
    </div>
  );
};

export default App;
