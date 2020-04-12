# Demo

This repository contains code for the implementation of a dashboard which imparts critical information quickly to users about the COVID-19 procress. Numbers are shown via a chart with multipe scales, a drop down menu to choose which data to be shown on the chart, a slider to better choose the window of time desired to observe, and a map to show countries infected across the globe.

## 🚀 Quick start

1.  **Install the dependencies.**

    To install the dependencies, run `npm install`. Make sure [npm](https://www.npmjs.com/) is installed.

    ```sh
    # install the dependencies using yarn
    npm install
    ```

2.  **Run in development mode.**

    Once all the dependencies have been installed, run `yarn start` or `yarn develop` to run the site in development mode.

    ```sh
    # or `npm develop`
    npm start
    ```

3.  **Begin development.**

    If run properly, `yarn start` should output a local development server at `http://localhost:3000` (or some other port if `3000` is not available). The site can be viewed on a browser at this address.

## 🧐 What's inside?

The project utilizes ReactJS Framework written in JavaScript and has Material UI, and Evergreen UI libraries for UI components.

    .
    ├── node_modules/
    ├── public
    ├── src/
    ├── .gitignore
    ├── package-lock.json
    ├── package.json
    ├── README.md

1.  **`node_modules/`**: The directory where all of the modules of code that the project depends on (npm packages) are automatically installed.

2.  **`public/`**: The directory where it contains the HTML file so we can tweak it, however we won't, also holds the csv, json, and zip files.

3.  **`src/`**: This directory will contain all of the code related to what's seen on the front-end of the site (what's seen in the browser). The main 'components' folder which contains the component files(Chart, RadioButtons, Slider, DropDownMenu, Map..etc ), the App.js file which is the parent component, the index.js file which is the first component to get called...etc.

4.  **`.gitignore`**: This file tells git which files it should not track / not maintain a version history for.

5.  **`package-lock.json`**: package-lock.json is automatically generated for any operations where npm modifies either the node_modules tree, or package.json . It describes the exact tree that was generated, such that subsequent installs are able to generate identical trees, regardless of intermediate dependency updates.

6.  **`package.json`**: A manifest file for Node.js projects, which includes things like metadata (the project’s name, author, etc). This manifest is how npm knows which packages to install for the project.

7.  **`README.md`**: This file, which containt useful reference information about the project and some documentation about its purpose.

## 🎓 Components and their libraries

This section further talks about the components in bullet points for a better and quicker experience.

- from --> library
- usage --> why is it used
- input --> which component does it take input from
- output --> what kind of output does it give out to other components

1. Chart:
   from: @nivo
   usage: shows data in an elegant and intuitive way
   input: data from App component
   output: none internally

2. RadioButtons:
   from: @material-ui/core
   usage: to alternate between scales (Normal, Logarthmic, Dy/Dx)
   input: none internally
   output: tells App component which button is clicked

3. Slider:
   from: @material-ui/core
   usage: controls the start date of data passed to the Chart
   input: none internally
   output: tells App component its position (value)

4. DropDownMenu
   from: evergreen-ui
   usage: to show different locations that can be chosen to reveal their data accordingly
   input: data of countries to show from App Component
   output: tells App component which country is chosen

5. Map:
   from: React-map-gl
   usage: to show infected locations around the globe
   input: data from App of infected locations
   output: none internally
