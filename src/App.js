import React from 'react';
import './App.css';
import { Pane } from 'evergreen-ui';
import DropDownMenu from './components/dropdownmenu';
import Slider from './components/customSlider';
import Chart from './components/customChart';
import data from './disposables/data.json';

function App() {
  return (
    <div>
      <DropDownMenu />
      <Slider />
      <Pane style={{ width: 1300, height: 400 }}>
        <Chart data={data} />
      </Pane>
    </div>
  );
}

export default App;
