# Resonant Ecologies

A hydro-acoustic investigation of desert water systems in the Santa Cruz watershed, southern Arizona.

This interactive web application visualizes the hydrological and acoustic landscapes of key watercourses in the Tucson basin, integrating geospatial data with multimedia content.

## Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code with Live Server extension (recommended for development)

### Running the Application
1. Open the project in VS Code
2. Right-click on `index.html` and select "Open with Live Server"
3. The application will open in your default browser

No build process or Node.js installation required.

## Project Structure

```
Resonant Ecologies/
├── index.html              # Main HTML structure
├── style.css               # CSS styles
├── app.js                  # JavaScript logic for map, animations, and interactions
├── README.md               # This file
│
├── data/                   # GeoJSON data files
│   ├── waterway_filtered.geojson          # Filtered waterways (rivers and streams)
│   ├── santa_cruz_watershed_complete.geojson  # Santa Cruz watershed boundary
│   ├── rillito_system_watersheds.geojson      # Rillito sub-watersheds
│   └── water_area_polygon.geojson             # Water area polygons
│
├── media/                  # Multimedia content organized by location
│   ├── Santa Cruz River/
│   │   ├── Air/
│   │   ├── Land/
│   │   └── Water/
│   └── Biosphere2 Ocean/
│       ├── Air/
│       ├── Land/
│       └── Water/
│
└── scripts/                # PowerShell scripts for data preprocessing
    ├── filter_watershed.ps1
    ├── inspect_properties.ps1
    └── inspect_water_areas.ps1
```

## How It Works

### User Interface
- **Intro Screen**: A frosted glass overlay with project title, description, and language toggle (English/Spanish)
- **Map View**: Interactive map using MapLibre GL showing watershed boundaries and waterways
- **Location Panels**: Clickable watercourse labels open side panels with media content

### Map Features
- Regional overview of the Santa Cruz watershed
- Animated zoom from regional to local scale
- Progressive reveal of sub-watersheds and waterways during animation
- Watercourse labels with hover and click interactions

### Media Integration
Each location supports three categories of media:
- **Air**: Atmospheric sounds and visuals
- **Land**: Terrestrial recordings and footage
- **Water**: Hydro-acoustic data and underwater recordings

## Adding Content

### Media Files
1. Place media files in the appropriate `media/[Location]/[Category]/` directory
2. Supported formats: MP4 for video, MOV for video, other formats as needed
3. Update the `MEDIA` object in `app.js` with the file paths

### Locations
To add new watercourse locations:
1. Add a new object to the `LOCATIONS` array in `app.js`
2. Include coordinates, name, watershed, and description
3. Add corresponding media entries to the `MEDIA` object

## Data Sources

| File | Source | Description | Size |
|------|--------|-------------|------|
| `waterway_filtered.geojson` | OpenStreetMap (filtered) | Rivers and streams within watershed | 4.5 MB |
| `santa_cruz_watershed_complete.geojson` | USGS NHD WBD HUC8 | Upper Santa Cruz watershed boundary | 582 KB |
| `rillito_system_watersheds.geojson` | USGS NHD WBD HUC12 | Rillito sub-watersheds | 420 KB |
| `water_area_polygon.geojson` | Local data | Water area polygons | 941 KB |

### Data Processing
The `scripts/` directory contains PowerShell scripts used for preprocessing:
- Filtering OpenStreetMap data to include only rivers and streams
- Spatial clipping to watershed boundaries
- Data inspection and validation

## Technical Details

### Libraries and Frameworks
- **MapLibre GL**: Open-source map rendering library
- **Google Fonts**: IBM Plex Mono typeface
- **Vanilla JavaScript**: No framework dependencies

### Map Configuration
- Custom style with background and layered GeoJSON sources
- Zoom-based opacity and width expressions for visual hierarchy
- Disabled user interactions (pan, zoom) during intro animation
- Custom markers for location labels and border annotations

### Design System
- Monochromatic color palette (black, white, grays)
- Frosted glass effects using CSS `backdrop-filter`
- Responsive layout with mobile considerations
- Smooth animations and transitions

## Development Notes

- The application is designed to run entirely in the browser
- All data is loaded as static GeoJSON files
- Media files are served directly from the local server
- No server-side processing or database required

## License

This project is part of an academic research initiative. Please contact the authors for usage permissions.

## Contact

For questions or contributions, please refer to the project documentation or contact the development team.
