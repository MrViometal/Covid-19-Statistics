import React from 'react';
import './App.css';

//Libraries
import { csv } from 'd3';

//functions
import {
  JsonFormatter,
  JsondydxFormatter,
  JsonlogFormatter,
  filterUniqueItems,
} from './functions';

//Components
import { Pane } from 'evergreen-ui';
import DropDownMenu from './components/dropdownmenu';
import Slider from './components/customSlider';
import Chart from './components/customChart';
import Radio from './components/customRadio';
import RGLMap from './components/Map';
import data from './disposables/data.json';

function App() {
  const [csvData, setcsvData] = React.useState(null);
  const [rawData, setRawData] = React.useState(null);

  const TurnCSVintoSmthUseful = () => {
    let rawData = csv('time_series_covid19_deaths_global.csv').then((data) => {
      setcsvData(data);
      {
        console.log(
          'log',
          JsonlogFormatter(data),
          'diff',
          JsondydxFormatter(data)
        );
      }
      setRawData(JsonFormatter(data));
      return JsonFormatter(data);
    });
    return rawData;
  };

  React.useEffect(() => {
    TurnCSVintoSmthUseful();
  }, []);

  return (
    <div>
      <DropDownMenu items={filterUniqueItems(rawData)} />
    </div>
  );
}
export default App;
