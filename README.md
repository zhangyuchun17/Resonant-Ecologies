# Resonant Ecologies

A hydro-acoustic investigation of desert water systems in the Santa Cruz watershed, southern Arizona.

This interactive web application visualizes the hydrological and acoustic landscapes of five recording sites across the Tucson basin and border region, integrating watershed geospatial data with site-specific audiovisual content.

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
├── style.css               # All styles
├── app.js                  # Map, animations, overlays, and interactions
├── README.md               # This file
│
├── data/                   # GeoJSON data files
│   ├── waterway_filtered.geojson              # Filtered rivers and streams
│   ├── santa_cruz_watershed_complete.geojson  # Santa Cruz watershed boundary (HUC8)
│   ├── rillito_system_watersheds.geojson      # Rillito sub-watersheds (HUC12)
│   └── water_area_polygon.geojson             # Water area polygons
│
├── media/                  # Video files organized by location and category
│   ├── Agua Caliente/
│   │   ├── Air/    aguacalienteair_air_processed.mp4
│   │   ├── Land/   aguacalinteland2.mp4
│   │   └── Water/  aguacaliente_water_processed.mp4
│   ├── Biosphere2 Ocean/
│   │   ├── Air/    BiosphereOceanWaveGenerator1.mp4
│   │   ├── Land/   Land.mp4
│   │   └── Water/  coral sounds biopshere.mp4
│   ├── Pantano Wash/
│   │   ├── Air/    pantanoultrasound2_1.mp4
│   │   ├── Land/   pantanoearth1.mp4
│   │   └── Water/  pantano_water_memory_.mp4
│   ├── Rillito River/
│   │   ├── Air/    rillito_air_ultrasonic_processed.mp4
│   │   ├── Land/   rillito_land_processed.mp4
│   │   └── Water/  rillito_water_memory.mp4
│   └── Santa Cruz River/
│       ├── Air/    scrair1.mp4
│       ├── Land/   santacruzland.mp4
│       └── Water/  scrwater.mp4
│
└── scripts/                # PowerShell scripts for data preprocessing
    ├── filter_watershed.ps1
    ├── inspect_properties.ps1
    └── inspect_water_areas.ps1
```

## How It Works

### User Interface
- **Intro screen**: Frosted glass panel with project title, description, and language toggle (EN / SP / TR). Clicking *enter* transitions to the map.
- **Navigation**: Top-right links — *Project* returns to the intro screen; *People* opens the author bios card.
- **Map view**: Interactive MapLibre GL map showing watershed boundaries, waterways, and five location markers. An animated zoom plays on first entry.
- **Location overlay**: Clicking a location marker opens a panel with site description and a three-column video grid (Air / Land / Water).
- **Detail view**: Clicking the arrow on any video card expands it to a full-screen background with editorial text.

### Recording Sites
| Location | Watershed | Region |
|---|---|---|
| Santa Cruz River | Upper Santa Cruz | Tumacácori / border region |
| Rillito River | Lower Rillito | Tucson |
| Pantano Wash | Pantano | East Tucson |
| Agua Caliente | Rincon Creek | Tucson foothills |
| Biosphere 2 Ocean | Oracle / Oracle Ridge | Oracle, AZ |

### Media Categories
Each site has three video channels:
- **Air** — atmospheric and ultrasonic recordings
- **Land** — terrestrial and contact-microphone recordings
- **Water** — hydro-acoustic and underwater recordings

## Data Sources

| File | Source | Description |
|---|---|---|
| `waterway_filtered.geojson` | OpenStreetMap (filtered) | Rivers and streams within watershed |
| `santa_cruz_watershed_complete.geojson` | USGS NHD WBD HUC8 | Upper Santa Cruz watershed boundary |
| `rillito_system_watersheds.geojson` | USGS NHD WBD HUC12 | Rillito sub-watersheds |
| `water_area_polygon.geojson` | Local data | Water area polygons |

The `scripts/` directory contains PowerShell scripts used during data preprocessing: filtering OSM waterways, spatial clipping to watershed boundaries, and data inspection.

## Technical Details

### Libraries
- **MapLibre GL** — open-source map rendering
- **IBM Plex Mono** — typeface via Google Fonts
- **Vanilla JavaScript** — no framework dependencies

### Architecture
- Single-page, no build step — `index.html` + `style.css` + `app.js`
- All geodata loaded as static GeoJSON from `data/`
- All media served directly from `media/`
- Locations and media paths defined in the `LOCATIONS` and `MEDIA` objects in `app.js`

### Design System
- Monochromatic palette (white `#f8f8f8` → black `#1a1a1a`)
- Frosted glass via CSS `backdrop-filter: blur()`
- Custom scroll indicator (thin line + dot) replacing browser scrollbars
- Responsive layout with mobile breakpoints at 768 px

## License

This project is part of an academic research initiative. Please contact the authors for usage permissions.
