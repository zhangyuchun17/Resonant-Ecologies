# Resonant Ecologies

A hydro-acoustic investigation of desert water systems in the Santa Cruz watershed, southern Arizona.

This interactive web application visualizes the hydrological and acoustic landscapes of five recording sites across the Tucson basin and border region, integrating watershed geospatial data with site-specific audiovisual content.

## Getting Started

### Prerequisites

- A modern web browser: Chrome, Firefox, Safari, or Edge
- VS Code with the Live Server extension, recommended for development

### Running the Application

1. Open the project in VS Code.
2. Right-click `index.html`.
3. Select `Open with Live Server`.

No build process or Node.js installation is required.

## Project Structure

```text
Resonant Ecologies/
|-- index.html              # Main HTML structure
|-- style.css               # Layout, visual system, responsive behavior
|-- app.js                  # Map, overlays, media, and interactions
|-- README.md               # This file
|-- data/                   # GeoJSON data files
|   |-- waterway_filtered.geojson
|   |-- santa_cruz_watershed_complete.geojson
|   |-- rillito_system_watersheds.geojson
|   `-- water_area_polygon.geojson
|-- media/                  # Video, detail images, and poster thumbnails
|   |-- Agua Caliente/
|   |-- Biosphere2 Ocean/
|   |-- Pantano Wash/
|   |-- Rillito River/
|   |-- Santa Cruz River/
|   `-- posters/            # Generated video poster thumbnails for mobile previews
`-- scripts/                # PowerShell scripts for data preprocessing
```

## How It Works

### User Interface

- **Intro / Project screen**: Frosted glass panel with project title, description, language toggle, and enter button.
- **Navigation**: Top-right `Project` returns to the intro screen; `People` opens author bios.
- **Map view**: MapLibre GL map with watershed boundaries, waterways, and five location markers.
- **Location overlay**: Clicking a marker opens a site panel with description text and Air / Land / Water media cards.
- **Detail view**: Clicking a media card detail link opens a full-screen audiovisual detail view with editorial text and image/video content.

### Mobile Interaction Notes

The mobile interface uses fixed full-screen overlays, so scroll handling is implemented carefully:

- Intro / Project, Location, and People panels use internal scroll containers instead of body scrolling.
- Touch-scroll fallback handlers in `app.js` convert vertical touch movement into `scrollTop` when mobile browsers fail to reconnect native scrolling after overlay transitions.
- Location and People scroll indicators are hidden on mobile to reduce visual clutter.
- Opening a Location panel temporarily disables map gestures so the map does not steal touch events from the panel.
- Opening a Detail view keeps the originating Location panel alive underneath it; closing Detail returns to that same Location panel instead of rebuilding it.

### Detail Return Flow

The intended navigation path is:

```text
Map -> Location panel -> Air/Land/Water Detail -> back to the same Location panel
```

`app.js` tracks the source location with `returnLocationId`. This preserves user context and avoids mobile scroll-state loss caused by destroying and recreating fixed scroll panels.

### Recording Sites

| Location | Watershed | Region |
|---|---|---|
| Santa Cruz River | Upper Santa Cruz | Tumacacori / border region |
| Rillito River | Lower Rillito | Tucson |
| Pantano Wash | Pantano | East Tucson |
| Agua Caliente | Rincon Creek | Tucson foothills |
| Biosphere 2 Ocean | Oracle / Oracle Ridge | Oracle, AZ |

### Media Categories

Each site has three video channels:

- **Air**: atmospheric and ultrasonic recordings
- **Land**: terrestrial and contact-microphone recordings
- **Water**: hydro-acoustic and underwater recordings

### Video Posters

Mobile browsers often do not draw the first frame of an unplayed video, which can make media cards appear as gray blocks. To avoid that, each Air / Land / Water video has a generated poster image in `media/posters/`, and the corresponding poster path is defined in the `MEDIA` object in `app.js`.

The current poster set includes 15 JPG files:

- `agua-caliente-air.jpg`, `agua-caliente-land.jpg`, `agua-caliente-water.jpg`
- `biosphere2-air.jpg`, `biosphere2-land.jpg`, `biosphere2-water.jpg`
- `pantano-air.jpg`, `pantano-land.jpg`, `pantano-water.jpg`
- `rillito-air.jpg`, `rillito-land.jpg`, `rillito-water.jpg`
- `santa-cruz-air.jpg`, `santa-cruz-land.jpg`, `santa-cruz-water.jpg`

If a source video changes, regenerate its poster and update the matching `poster` value in `MEDIA`.

Example command:

```powershell
ffmpeg -y -ss 0.1 -i "media/Pantano Wash/Land/pantanoearth1.mp4" -frames:v 1 -vf "scale=640:-1" -q:v 3 "media/posters/pantano-land.jpg"
```

## Data Sources

| File | Source | Description |
|---|---|---|
| `waterway_filtered.geojson` | OpenStreetMap, filtered | Rivers and streams within the watershed |
| `santa_cruz_watershed_complete.geojson` | USGS NHD WBD HUC8 | Upper Santa Cruz watershed boundary |
| `rillito_system_watersheds.geojson` | USGS NHD WBD HUC12 | Rillito sub-watersheds |
| `water_area_polygon.geojson` | Local data | Water area polygons |

The `scripts/` directory contains PowerShell scripts used during data preprocessing: filtering OSM waterways, spatial clipping to watershed boundaries, and data inspection.

## Technical Details

### Libraries

- **MapLibre GL**: open-source map rendering
- **IBM Plex Mono**: typeface via Google Fonts
- **Vanilla JavaScript**: no framework dependencies

### Architecture

- Single-page static app: `index.html` + `style.css` + `app.js`
- No build step and no package manager required
- Static GeoJSON loaded from `data/`
- Media served directly from `media/`
- Locations, media paths, and poster paths defined in `LOCATIONS` and `MEDIA` in `app.js`

### Responsive Design

- Mobile breakpoint at `768px`
- Mobile overlays use internal scroll containers
- Detail controls use fixed-size circular buttons for consistent alignment on mobile
- Location video cards use generated poster images for stable previews before playback

## License

This project is part of an academic research initiative. Please contact the authors for usage permissions.
