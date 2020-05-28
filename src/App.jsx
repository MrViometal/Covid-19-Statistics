import React from 'react';
import './App.css';

//Libraries
import { csv } from 'd3';
import { Pane } from 'evergreen-ui';

//functions
import {
  JsonFormatter,
  JsonDyDxFormatter,
  JsonLogFormatter,
  filterUniqueItems,
  formMapData,
  sumOfCasesValues,
} from './Utils/functions';

//Components
import DropDownMenu from './components/dropDownMenu.jsx';
import Slider from './components/customSlider.jsx';
import Chart from './components/customChart.jsx';
import Radio from './components/customRadio.jsx';
import RGLMap from './components/Map.jsx';

const App = () => {
  const [csvData, setCsvData] = React.useState(() =>
    JSON.parse(localStorage.getItem('csvData'))
  );
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
    const filterPlaceDataFromCSVFile = csvData.filter(
      (obj) => obj.Place === filteredChartData[0].id
    );

    let FormattedData;

    if (value === 'log')
      FormattedData = JsonLogFormatter(filterPlaceDataFromCSVFile);
    else if (value === 'dydx')
      FormattedData = JsonDyDxFormatter(filterPlaceDataFromCSVFile);
    else if (value === 'raw')
      FormattedData = JsonFormatter(filterPlaceDataFromCSVFile);

    setRadio(value);
    setBaseChartData(FormattedData);
    setFilteredChartData(FormattedData);
    setSliderValue(0);
  };

  //basic on mount world data filter for first time
  const filterWorldData = (data) => {
    let result = data.filter((obj) => obj.id === 'WORLD');
    setBaseChartData(result);
    return result;
  };

  //Turn CSV into JSON and setChartData with it
  React.useEffect(() => {
    const ParseCsvIntoJsonFormatData = () => {
      csv('time_series_covid19_deaths_global.csv').then((data) => {
        setCsvData(data);
        const raw = JsonFormatter(data);
        setRawData(raw);
        setBaseChartData(filterWorldData(raw));
        setFilteredChartData(filterWorldData(raw));
        setMapData(formMapData(sumOfCasesValues(raw)));
        maxSliderCounter(raw);
      });
    };

    ParseCsvIntoJsonFormatData();
  }, []);

  React.useEffect(() => {
    localStorage.setItem('csvData', JSON.stringify(csvData));
  }, [csvData]);

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

      <Pane className='Chart' style={{ height: 500, marginLeft: 10 }}>
        <Chart data={filteredChartData} />
      </Pane>

      <Pane className='Slider'>
        <Slider
          select={onSliderChange}
          max={maxSlider}
          value={sliderValue}
          data={baseChartData}
        />
      </Pane>

      <Pane className='Map'>
        <RGLMap data={mapData} />
      </Pane>
    </Pane>
  );
};
export default App;
