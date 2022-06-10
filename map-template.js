export default `
<div>
    <style>
            html, body {
                margin: 0;
            }

            #map {
                height: 100%;
                width: 100%;
            }
            .marker {
                background-color : blue;
                border : 2px solid #000;
                paddding : 20px;
                width : 70px;
                height : 70px;
                border-radius : 50%
            }
            .depo-marker {
                background-color : yellow;
                border : 2px solid #000;
                paddding : 20px;
                width : 70px;
                height : 70px;
                border-radius : 50%
            }
    </style>
    
    <div id='map' class='map'></div>

    <!-- load TomTom Maps Web SDK from CDN -->
    <link rel='stylesheet' type='text/css' href='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps.css'/>
    <script src='https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/maps/maps-web.min.js'></script>
    <script src="https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.13.0/services/services-web.min.js"></script>

    <script>
        // create the map
        tt.setProductInfo('TomTom Maps React Native Demo', '1.0');

        let map = tt.map({
            key: 'I6kBz902v7AXAGvD9J7DNysPz9DkfQMP',
            container: 'map',
            center: [0.1378, 35.3944],
            zoom: 8
        });    
        
        map.on('dragend', function() {
            let center = map.getCenter();
            window.ReactNativeWebView.postMessage(center.lng.toFixed(3) + ", " + center.lat.toFixed(3));
        })
    </script>
</div>
`;
