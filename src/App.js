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
import DropDownMenu from './components/dropdownmenu';
import Slider from './components/customSlider';
import Chart from './components/customChart';
import Radio from './components/customRadio';
import RGLMap from './components/Map';
import { Pane, Spinner } from 'evergreen-ui';
import data from './disposables/data.json';

function App() {
  const [csvData, setcsvData] = React.useState(null);
  const [rawData, setRawData] = React.useState(null);
  const [baseChartData, setBaseChartData] = React.useState(null);
  const [filteredChartData, setFilteredChartData] = React.useState(null);

  const [maxSlider, setMaxSlider] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(null);
  /* ***************************************************************** */

  //When Drop down menu is selected
  const onCountrySelect = (country) => {
    if (country) {
      let data = rawData.filter((obj) => {
        return obj.id === country;
      });
      setBaseChartData(data);
      setFilteredChartData(data);
      setSliderValue(0);
    }
  };

  //dynamically set range of slider
  const maxSliderCounter = (data) => {
    let result = data[0].data.length;
    setMaxSlider(result);
  };

  //when slider value changes
  const onSliderChange = (value) => {
    setSliderValue(value);
    let newObj = {};
    newObj.id = baseChartData[0].id;
    newObj.Lat = baseChartData[0].Lat;
    newObj.Long = baseChartData[0].Long;
    newObj.data = baseChartData[0].data.slice(value);
    setFilteredChartData([newObj]);
    console.log(newObj);
  };

  //handle When Radio buttons change
  const handleRadioSelected = (value) => {
    if (value == 'log') {
      let currentData = JsonlogFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setFilteredChartData(currentData);
      setSliderValue(0);
    } else if (value == 'dydx') {
      let currentData = JsondydxFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setSliderValue(0);

      setFilteredChartData(currentData);
    } else if (value == 'raw') {
      let currentData = JsonFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setFilteredChartData(currentData);
      setSliderValue(0);
    }
  };

  //basic on mount world data filter for first time
  const filterWorldData = (data) => {
    let result = data.filter((obj) => obj.id === 'WORLD');
    setBaseChartData(result);
    return result;
  };

  //Turn CSV into JSON and setChartData with it
  const TurnCSVintoSmthUseful = () => {
    let rawData = csv('time_series_covid19_deaths_global.csv').then((data) => {
      setcsvData(data);
      const raw = JsonFormatter(data);
      maxSliderCounter(raw);
      setRawData(raw);
      setBaseChartData(filterWorldData(raw));
      setFilteredChartData(filterWorldData(raw));

      return JsonFormatter(data);
    });
    return rawData;
  };

  /* ***************************************************************** */

  React.useEffect(() => {
    TurnCSVintoSmthUseful();
  }, []);

  return (
    <div>
      <DropDownMenu
        items={filterUniqueItems(rawData)}
        select={onCountrySelect}
      />

      <Radio radioSelected={handleRadioSelected} />

      <Pane style={{ width: 1250, height: 400, marginLeft: 10 }}>
        {filteredChartData ? <Chart data={filteredChartData} /> : <Spinner />}
      </Pane>

      {filteredChartData && (
        <Slider
          select={onSliderChange}
          max={maxSlider}
          value={sliderValue}
          date={filteredChartData[0].data[0].x}
        />
      )}
    </div>
  );
}
export default App;
