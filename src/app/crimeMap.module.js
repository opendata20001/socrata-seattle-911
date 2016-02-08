angular.module('seahawk.crime-map', ['seahawk.crimeData'])
  .directive('crimeMap', ['crimeData', function(DataService) {
    return {
      scope: {},
      link: function(scope, element) {
        L.Icon.Default.imagePath = 'assets/images';
        var map = L.map(element[0], {
          scrollWheelZoom: false,
          maxBounds: [
            [47, -122.2],
            [48, -122.5]
          ],
          minZoom: 13
        }).setView([47.595, -122.3321654], 14);
        L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        }).addTo(map);

        var icon = L.icon({
          iconUrl: "assets/images/seahawks.png",
          iconSize: [140, 62]
        });

        L.marker([47.595, -122.3321654], {
          icon: icon
        }).addTo(map);

        var MyControl = L.Control.extend({
          options: {
            position: 'topright'
          },

          onAdd: function (map) {
            // create the control container with a particular class name
            var container = L.DomUtil.create('div', 'crime-sidebar');

            $(container).html($('#sidebar-tpl').html());

            return container;
          }
        });

        map.addControl(new MyControl());
        var contentCompile = _.template($('#popup-tpl').text());

        DataService()
          .then(function(data) {
            var markers = L.markerClusterGroup();

            data.features.forEach(function(feature) {
              var parsedDate = moment(feature.properties.event_clearance_date, 'YYYY-MM-DDTHH:mm:ss');
              feature.properties.event_clearance_date = parsedDate.format("MMM Do, YYYY [at] h:mma");

              feature.properties.event_clearance_description = feature.properties.event_clearance_description.toLowerCase();

              var marker = L.marker(feature.geometry.coordinates.reverse());

              marker.bindPopup(contentCompile(feature.properties));
              markers.addLayer(marker);
            });

            map.addLayer(markers);
          }, function() {
            console.log('ERROR');
          });
      }
    };
  }]);