// Fully commented on https://www.bricks-platform.com/BlogPost/Creating%20a%20Simple%20Map%20with%20OpenLayers%20and%20React

import { useEffect, useMemo, useRef, useState } from "react";
import TileLayer from "ol/layer/Tile";
// import { OSM } from 'ol/source';
import { Map, View } from "ol/index";
// import proj4 from "proj4";
import { fromLonLat, get as getProjection } from "ol/proj";
import { defaults } from "ol/control/defaults";
// Import - Import for Controls
// import ScaleLineControl from 'ol/control/ScaleLine';
// import FullScreenControl from 'ol/control/FullScreen';

// Import - Import for function that creates cordinates
// import { createStringXY } from 'ol/coordinate';

import XYZ from "ol/source/XYZ";
// import VectorLayer from 'ol/layer/Vector';
// import SourceLayer from 'ol/source/Vector'
// import TileGrid from "ol/tilegrid/TileGrid";

import "./index.css";
import Attribution from "ol/control/Attribution";

function App() {
  const mapTargetElement = useRef<HTMLDivElement>(null);
  const apikey = "454c6d4b534c40fbb29b2a0845e32a55";
  const [map, setMap] = useState<Map>();

  useEffect(() => {
    const basemapAPI = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/basemap/wgs84/{z}/{x}/{y}.png";
    const labelAPI = "https://mapapi.geodata.gov.hk/gs/api/v1.0.0/xyz/label/hk/en/wgs84/{z}/{x}/{y}.png";
    const attributionInfo =
      '<a href="https://api.portal.hkmapservice.gov.hk/disclaimer" target="_blank" class="copyrightDiv">&copy; Map infortmation from Lands Department</a><div style="width:28px;height:28px;display:inline-flex;background:url(https://api.hkmapservice.gov.hk/mapapi/landsdlogo.jpg);background-size:28px;"></div>';

    const sourceLayer = new XYZ({
      url: basemapAPI,
      attributions: attributionInfo,
    });
    const labelLayer = new XYZ({url: labelAPI});
    const thismap = new Map({
      controls: defaults({ attribution: false }).extend([new Attribution({ collapsible: false })]),
      layers: [new TileLayer({ source: sourceLayer }),new TileLayer({source: labelLayer})],
      
      view: new View({
        center: fromLonLat([114.20847, 22.29227]),
        zoom: 17,
        minZoom: 10,
        maxZoom: 20,
      }),
    });

    thismap.setTarget(mapTargetElement.current || "");
    setMap(thismap);

    return () => thismap.setTarget("");
  }, []);

  return (
    <div
      id="map"
      ref={mapTargetElement}
      className="map"
      style={{
        width: "1200px",
        height: "500px",
        position: "relative",
      }}
    ></div>
  );
}
export default App;
