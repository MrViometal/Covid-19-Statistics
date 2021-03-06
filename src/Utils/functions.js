//*  App data manipulation Functions   */

//parse normal data
export const JsonFormatter = (data) => {
  const result = data.map((obj) => {
    let newObj = {};
    newObj.id = obj.Place;
    newObj.Lat = obj.Lat;
    newObj.Long = obj.Long;
    newObj.data = [];
    Object.keys(obj).forEach((key) => {
      if (
        /^(0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])[/-]\d{2}$/.test(key)
      ) {
        // if it matches the date format
        newObj.data.push({ x: key, y: obj[key] });
      }
    });
    return newObj;
  });
  return result;
};

//parse data dy/dx format
export const JsonDyDxFormatter = (data) => {
  const result = data.map((obj) => {
    let diff = {};
    diff.id = obj.Place;
    diff.Lat = obj.Lat;
    diff.Long = obj.Long;
    diff.data = [];

    let newObj = {};
    newObj.data = [];

    Object.keys(obj).forEach((key) => {
      if (
        /^(0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])[/-]\d{2}$/.test(key)
      ) {
        // if it matches the date format
        newObj.data.push({ x: key, y: obj[key] });
        diff.data.push({ x: key, y: obj[key] });
      }
    });
    for (let i = 1; i < diff.data.length; i++) {
      if (!isNaN(newObj.data[i - 1]?.y)) {
        diff.data[i].y -= newObj.data[i - 1]?.y;
      }
    }
    return diff;
  });
  return result;
};

//parse data log format
export const JsonLogFormatter = (data) => {
  const result = data.map((obj) => {
    let newObj = {};
    newObj.id = obj.Place;
    newObj.Lat = obj.Lat;
    newObj.Long = obj.Long;
    newObj.data = [];
    Object.keys(obj).forEach((key) => {
      if (
        /^(0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])[/-]\d{2}$/.test(key)
      ) {
        // if it matches the date format

        //if is it not zero
        if (obj[key] === '0') {
          newObj.data.push({ x: key, y: null });
        } else {
          newObj.data.push({ x: key, y: Math.log(obj[key]) });
        }
      }
    });
    return newObj;
  });
  return result;
};

//filter countries from rawData to be sent to drop down menu
export const filterUniqueItems = (array) => {
  let items = [];
  let uniqueItems = [];
  array &&
    array.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key === 'id') {
          items.push(item[key]);
        }
      });
      uniqueItems = Array.from(new Set(items));
    });
  return uniqueItems;
};

//*   Map data manipulation Functions   */

//sum function to be used internally
export const sum = (array, key) => {
  let sum = array.reduce((a, b) => a + (Number(b[key]) || 0), 0);
  return sum;
};

//to produce sum of cases in an entry
export const sumOfCasesValues = (rawData) => {
  return rawData.map((obj) => {
    let newObj = {};
    newObj.id = obj.id;
    newObj.Lat = obj.Lat;
    newObj.Long = obj.Long;
    newObj.CasesSum = [...Array(sum(obj.data, 'y')).keys()];
    return newObj;
  });
};

//to form map data
export const formMapData = (summedArrayOfObjects) => {
  let result = {};
  result.type = 'FeatureCollection';
  result.crs = {
    type: 'name',
    properties: {
      name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
    },
  };
  result.features = [];
  summedArrayOfObjects
    .filter((item) => item.id !== 'WORLD')
    .map((obj) => {
      obj.CasesSum.map((arrayItem) => {
        let newObj = {};
        newObj.type = 'Feature';
        newObj.properties = {
          id: obj.id + '_lat_ ' + obj.Lat + '_long_ ' + obj.Long + arrayItem,
          mag: 1,
          time: '0',
          felt: null,
          tsunami: 0,
        };
        newObj.geometry = {
          type: 'Point',
          coordinates: [Number(obj.Long), Number(obj.Lat), 0.0],
        };
        result.features.push(newObj);
        return null;
      });
      return null;
    });

  return result;
};

//* Helper Functions */

//basic on mount world data filter for first time
export const filterWorldData = (data) => {
  return data.filter((obj) => obj.id === 'WORLD');
};

//dynamically set range of slider
export const maxSliderCounter = (data) => {
  return data[0].data.length;
};