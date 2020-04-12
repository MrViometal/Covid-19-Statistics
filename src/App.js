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
  const [rawData, setRawData] = React.useState(null);

  const TurnCSVintoSmthUseful = () => {
    let rawData = csv('time_series_covid19_deaths_global.csv').then((data) => {
      setcsvData(data);
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

//filter countries from rawData to be sent to drop down menu
const filterUniqueItems = (array) => {
  let items = [];
  let uniqueItems = [];
  array &&
    array.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key == 'id') {
          items.push(item[key]);
        }
      });
      uniqueItems = Array.from(new Set(items));
    });
  return uniqueItems;
};
