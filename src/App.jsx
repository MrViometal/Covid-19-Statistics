import React, { useReducer } from 'react';
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
  filterWorldData,
  maxSliderCounter,
} from './Utils/functions';

//Components
import DropDownMenu from './components/dropDownMenu.jsx';
import Slider from './components/customSlider.jsx';
import Chart from './components/customChart.jsx';
import Radio from './components/customRadio.jsx';
import RGLMap from './components/Map.jsx';

function dataReducer(state, action) {
  switch (action.type) {
    case 'CSV_TO_JSON':
      return {
        ...state,
        haveData: action.payload ? 'true' : 'false',
        csvData: action.payload,
      };

    case 'FORMAT_DATA':
      const raw = JsonFormatter(state.csvData);
      return {
        ...state,
        rawData: raw,
        baseChartData: filterWorldData(raw),
        filteredChartData: filterWorldData(raw),
        mapData: formMapData(sumOfCasesValues(raw)),
        maxSlider: maxSliderCounter(raw),
      };

    case 'ON_COUNTRY_SELECT':
      return {
        ...state,
        baseChartData: action.payload,
        filteredChartData: action.payload,
        sliderValue: 0,
        radio: 'raw',
      };

    case 'ON_SLIDER_CHANGE':
      return {
        ...state,
        filteredChartData: [action.payload.newObj],
        sliderValue: action.payload.value,
      };

    case 'ON_RADIO_CHANGE':
      return {
        ...state,
        radio: action.payload.value,
        baseChartData: action.payload.FormattedData,
        filteredChartData: action.payload.FormattedData,
        sliderValue: 0,
      };

    default:
      return state;
  }
}

const initialState = {
  haveData: false,
  csvData: null,
  rawData: null,
  baseChartData: null,
  filteredChartData: null,
  mapData: null,
  maxSlider: null,
  sliderValue: 0,
  radio: 'raw',
};

const App = () => {
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const [data, setInitialData] = React.useState(null);
  const {
    csvData,
    rawData,
    baseChartData,
    filteredChartData,
    mapData,
    maxSlider,
    sliderValue,
    radio,
  } = state;

  //When Drop down menu is selected
  const onCountrySelect = (country) => {
    if (country) {
      let data = rawData.filter((obj) => {
        return obj.id === country;
      });
      dispatch({ type: 'ON_COUNTRY_SELECT', payload: data });
    }
  };

  //when slider value changes
  const onSliderChange = (value) => {
    let newObj = {};
    newObj.id = baseChartData[0].id;
    newObj.data = baseChartData[0].data.slice(value);
    dispatch({ type: 'ON_SLIDER_CHANGE', payload: { newObj, value } });
  };

  //handle When Radio buttons change
  const onRadioChange = (value) => {
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
    dispatch({
      type: 'ON_RADIO_CHANGE',
      payload: { value, FormattedData },
    });
  };

  //Turn CSV into JSON and setInitialData with it with an IIFE
  React.useEffect(() => {
    (function hey() {
      csv('time_series_covid19_deaths_global.csv').then((data) => {
        setInitialData(data);
      });
    })();
  }, []);

  //When data promise is resolved, dispatch an action to turn it into JSON
  React.useEffect(() => {
    data && dispatch({ type: 'CSV_TO_JSON', payload: data });
  }, [data]);

  //When data is available in JSON format, dispatch an action to Format it into its desired shapes and set state with it
  React.useEffect(() => {
    !!state.haveData && dispatch({ type: 'FORMAT_DATA' });
    // localStorage.setItem('csvData', JSON.stringify(csvData));
    // !!csvData && dispatch({ type: 'FORMAT_DATA' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.haveData]);

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
            radioSelected={onRadioChange}
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
