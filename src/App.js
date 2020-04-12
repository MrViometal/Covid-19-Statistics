import React from 'react';
import './App.css';

//Libraries
import { csv } from 'd3';

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

  const TurnCSVintoSmthUseful = () => {
    let rawData = csv('time_series_covid19_deaths_global.csv').then((data) => {
      setcsvData(data);
      return JsonFormatter(data);
    });
    return rawData;
  };

  React.useEffect(() => {
    TurnCSVintoSmthUseful();
  }, []);

  return <div>{console.log(csvData)}</div>;
}

export default App;

//parse normal data
const JsonFormatter = (data) => {
  const result = data.map((obj) => {
    let newObj = {};
    newObj.id = obj.Place;
    newObj.Lat = obj.Lat;
    newObj.Long = obj.Long;
    newObj.data = [];
    Object.keys(obj).forEach((key) => {
      if (
        /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{2}$/.test(key)
      ) {
        // if it matches the date format
        newObj.data.push({ x: key, y: obj[key] });
      }
    });
    return newObj;
  });
  return result;
};
