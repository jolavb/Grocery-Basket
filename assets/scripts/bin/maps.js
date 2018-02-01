const loadGoogleMapsAPI = require('load-google-maps-api')
const GeoJSON = require('geojson')

const init = function (gmap, data) {

  const image = 'https://cdn0.iconfinder.com/data/icons/shopping-vol-1-2/128/P-1-09-128.png'

  const icon = {
    url: 'https://cdn0.iconfinder.com/data/icons/shopping-vol-1-2/128/P-1-09-128.png',
    scaledSize: new gmap.Size(40, 40),
    origin: new gmap.Point(0,0), // origin
    anchor: new gmap.Point(0, 0)
  }

  const center = {lat: 42.35, lng: -71.12}
  const map = new gmap.Map(document.getElementById('map'), {
    zoom: 12,
    center: center
  })

  function bindInfoWindow (marker, store) {
    const contentString = store
    marker.addListener('click', function () {
      infowindow.setContent(contentString)
      infowindow.open(map, marker)
    })
  }



  const infowindow = new google.maps.InfoWindow({
    content: null
  })


  data.features.forEach(function (store) {
    const coords = store.geometry.coordinates
    const latLng = new gmap.LatLng(coords[1], coords[0])
    const marker = new gmap.Marker({
      position: latLng,
      map: map,
      icon: icon
    })
    const html = '<h4 class= "store-title">' + store.properties.name + '</h4> <p class= "store-loc">' +
    store.properties.location + '</p>'
    bindInfoWindow(marker, html)
  })
}

const loadMap = function (data) {
  console.log(process.env.GOOGLE_MAPS_KEY)
  const geoData = GeoJSON.parse(data.stores, {Point: ['lat', 'lng']})
  const options = { key: process.env.GOOGLE_MAPS_KEY }

  loadGoogleMapsAPI(options)
    .then(function (map) { init(map, geoData) })
    .catch(console.error)
}



module.exports = {
  loadMap
}
