import { FC } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

// constants
const labelColor: string = "#023e8a";
const mapBackgroundColor: string = "#ffcad4";
const mapStrokeColor: string = "#f4acb7";
// map json
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const markers = [
  {
    markerOffset: 15,
    name: "New Jersey (HQ)",
    coordinates: [-74.6122, 40.2904],
  },
  { markerOffset: -30, name: "Chicago", coordinates: [-87.6298, 41.8781] },
  { markerOffset: 25, name: "Tulsa", coordinates: [-95.9928, 36.154] },
  { markerOffset: 30, name: "Miami", coordinates: [-80.1918, 25.7617] },
  { markerOffset: -20, name: "Los Angeles", coordinates: [-118.2426, 34.0549] },
];

const NorthAmeraMapChart: FC = () => {
  return (
    <ComposableMap projection="geoAlbersUsa" className="w-100">
      <Geographies geography={geoUrl}>
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

export default NorthAmeraMapChart;
