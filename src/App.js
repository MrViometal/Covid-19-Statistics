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
  formMapData,
  sumOfCasesValues,
} from './functions';

//Components
import DropDownMenu from './components/dropdownmenu';
import Slider from './components/customSlider';
import Chart from './components/customChart';
import Radio from './components/customRadio';
import RGLMap from './components/Map';
import { Pane, Spinner } from 'evergreen-ui';

function App() {
  const [csvData, setcsvData] = React.useState(null);
  const [rawData, setRawData] = React.useState(null);
  const [baseChartData, setBaseChartData] = React.useState(null);
  const [filteredChartData, setFilteredChartData] = React.useState(null);

  const [mapData, setMapData] = React.useState(null);

  const [maxSlider, setMaxSlider] = React.useState(null);
  const [sliderValue, setSliderValue] = React.useState(null);

  const [radio, setRadio] = React.useState('raw');
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
      setRadio('raw');
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
    newObj.data = baseChartData[0].data.slice(value);
    setFilteredChartData([newObj]);
    // console.log({ newObj });
  };

  //handle When Radio buttons change
  const handleRadioSelected = (value) => {
    if (value === 'log') {
      let currentData = JsonlogFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setFilteredChartData(currentData);
      setSliderValue(0);
      setRadio('log');
    } else if (value === 'dydx') {
      let currentData = JsondydxFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setFilteredChartData(currentData);
      setSliderValue(0);
      setRadio('dydx');
    } else if (value === 'raw') {
      let currentData = JsonFormatter(csvData).filter(
        (obj) => obj.id === filteredChartData[0].id
      );
      setBaseChartData(currentData);
      setFilteredChartData(currentData);
      setSliderValue(0);
      setRadio('raw');
    }
  };

  //basic on mount world data filter for first time
  const filterWorldData = (data) => {
    let result = data.filter((obj) => obj.id === 'WORLD');
    setBaseChartData(result);
    return result;
  };

  const FormatData = (data) => {
    const raw = JsonFormatter(data);
    maxSliderCounter(raw);
    setRawData(raw);
    setBaseChartData(filterWorldData(raw));
    setFilteredChartData(filterWorldData(raw));
    setMapData(formMapData(sumOfCasesValues(raw)));
  }
  //Turn CSV into JSON and setChartData with it
  const TurnCSVintoSmthUseful = () => {
    csv('time_series_covid19_deaths_global.csv').then((data) => {
      setcsvData(data);
    });
  };

  /* ***************************************************************** */

  React.useEffect(() => {
    TurnCSVintoSmthUseful();
  }, []);

  React.useEffect(() => {
    csvData && FormatData(csvData);
    // console.log('set values')
  }, [csvData])

  return (
    <Pane className='App'>

      <Pane className='App-header'>
        <Pane className='DDM'>
          <DropDownMenu
            items={filterUniqueItems(rawData)}
            select={onCountrySelect}
          />
        </Pane>

        <Pane className='Radio'>
          <Radio
            radioSelected={handleRadioSelected}
            radio={radio}
            className='Radio'
          />
        </Pane>
      </Pane>

      <Pane className='Chart' style={{ height: 500, marginLeft: 10 }} >
        {filteredChartData ? <Chart data={filteredChartData} /> : <Spinner />}
      </Pane>

      <Pane className='Slider'>
        <Slider
          select={onSliderChange}
          max={maxSlider}
          value={sliderValue}
          data={baseChartData} />
      </Pane>
      <Pane className='Map'>  
      </Pane>
     {mapData && <RGLMap data={mapData} />}
    </Pane>
  );
}
export default App;
