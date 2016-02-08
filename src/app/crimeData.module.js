angular.module('seahawk.crimeData', [])
  .factory('crimeData', ['$http', function($http) {
    return function(options) {
      return $http.get('https://data.seattle.gov/resource/3k2p-39jp.json?$where=within_circle(incident_location, 47.593307, -122.3321654, 1609.344) AND event_clearance_date > \'2016-01-01T00:00:00\'&$limit=5000')
        .then(function(data) {
          return {
            'type': 'FeatureCollection',
            'features': _.map(data.data, function(datum) {
              return {
                'type': 'Feature',
                'properties': _.pick(datum, ['event_clearance_date', 'event_clearance_description', 'general_offense_number', 'hundred_block_location', 'event_clearance_group', 'event_clearance_subgroup']),
                'geometry': {
                  'type': 'Point',
                  'coordinates': [datum.longitude, datum.latitude]
                }
              }
            })
          };
        });
    }
  }]);