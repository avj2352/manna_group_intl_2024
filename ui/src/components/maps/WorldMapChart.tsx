import { FC } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import worldData from "./world.json";

// constants
const labelColor: string = "#023e8a";
const mapStrokeColor: string = "#f4acb7";
const mapBackgroundColor: string = "#ffcad4";

const markers = [
  { markerOffset: 20, name: "USA", coordinates: [-74.6122, 40.2904] },
  { markerOffset: 15, name: "Peru", coordinates: [-74.6122, -10.2904] },
  { markerOffset: 15, name: "Guyana", coordinates: [-51.6122, 1.2904] },
  { markerOffset: 15, name: "Costa Rica", coordinates: [-84.6122, 14.2904] },
  { markerOffset: 15, name: "Phillipines", coordinates: [121.0, 14.2904] },
];

const WorldMapChart: FC = () => {
  return (
    <ComposableMap className="w-100">
      <Geographies geography={worldData}>
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography
              key={geo.rsmKey}
              geography={geo}
              fill={mapBackgroundColor}
              stroke={mapStrokeColor}
            />
          ))
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={[coordinates[0], coordinates[1]]}>
          <g
            fill="none"
            stroke="#FF5533"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            transform="translate(-12, -24)"
          >
            <circle cx="12" cy="10" r="3" />
            <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
          </g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontSize: "20px", fontWeight: "bold", fill: labelColor }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};

export default WorldMapChart;
