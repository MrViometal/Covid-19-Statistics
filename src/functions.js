/*   App data manipulation Functions   */

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

//parse data dy/dx format
export const JsondydxFormatter = (data) => {
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
        /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{2}$/.test(key)
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
export const JsonlogFormatter = (data) => {
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
        newObj.data.push({ x: key, y: Math.log(obj[key]) });
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
        if (key == 'id') {
          items.push(item[key]);
        }
      });
      uniqueItems = Array.from(new Set(items));
    });
  return uniqueItems;
};

/*   Map data manipulation Functions   */

//sum function to be used internally
export const sum = (array, key) => {
  let sum = array.reduce((a, b) => a + (Number(b[key]) || 0), 0);
  return sum;
};

//to produce sum of cases in an entry
export const sumOfCasesValues = (rawData) => {
  let result = rawData.map((obj) => {
    let newObj = {};
    newObj.id = obj.id;
    newObj.Lat = obj.Lat;
    newObj.Long = obj.Long;
    newObj.CasesSum = sum(obj.data, 'y');
    return newObj;
  });
  return result;
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
  summedArrayOfObjects.map((obj) => {
    let newObj = {};
    newObj.type = 'Feature';
    newObj.properties = {
      id: obj.id + obj.Lat,
      mag: obj.CasesSum,
      time: '0',
      felt: null,
      tsunami: 0,
    };
    newObj.geometry = {
      type: 'Point',
      coordinates: [Number(obj.Long), Number(obj.Lat), 0.0],
    };
    result.features.push(newObj);
  });
  return result;
};
