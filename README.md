# Seattle 911 Responses

## Description

This map shows all 911 responses within 1 mile of the Seattle Seahawks stadium, CenturyLink Field since January 1st, 2016.

Data is hosted on [Seattle's Socrata OpenData platform](https://data.seattle.gov/Public-Safety/Seattle-Police-Department-911-Incident-Response/3k2p-39jp).

## Libraries Used

- [Angular](https://angularjs.org/): Powerful SPA framework
- [Leaflet](http://leafletjs.com): Slippy map library
- [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster): Easy marker clustering for Leaflet maps
- [Moment.js](http://momentjs.com/): Date formatting
- [LoDash](https://lodash.com/): General purpose functional programming library

## Build Tools Used

- [Gulp-Angular Yeoman Generator](https://github.com/Swiip/generator-gulp-angular): Basic scaffolding for build tools
- [Gulp](http://gulpjs.com/): CLI build toolkit

## Further Iterations

During today's work, I experimented with several options for displaying the crime data on the map. Given more time, I would have looked at the following additions to the map.

- Quick filtering on categories. Likely would have used [crossfilter.js](http://square.github.io/crossfilter/) as the datastore to prevent repeat hits to the API.
- Options to look at prior years data via quick links in info panel.
- In addition to the clustered point view, provide a heatmap overlay via [heatmap.js](http://www.patrick-wied.at/static/heatmapjs/).