// ── Data ─────────────────────────────────────────────────────────────────

const LOCATIONS = [
  {
    id: 'santa-cruz',
    name: 'Santa Cruz River',
    watershed: 'upper santa cruz',
    description: 'The primary artery of the Tucson basin, flowing northward through the valley floor.',
    subtitle: 'upper santa cruz · tumacácori region',
    body: [
      'Near Tumacácori, the Santa Cruz River carried one of the strongest visible water presences across the project sites. Moving water, surrounding vegetation, sediment, insects, and shifting currents produced a layered sonic environment shaped by continuous flow and ecological movement near the U.S.–Mexico border region.',
      'The audiovisual forms developed from this site became fluid and expansive. Water recordings generated flowing horizontal systems shaped by current and hydrological rhythm, air recordings produced expanding circular movements responding to environmental density and spatial motion, and land recordings transformed into resonant vibrating structures shaped by material contact and river textures. Together, the forms reflect the river as a space of movement, transition, and ecological continuity.'
    ],
    lat: 31.570294,
    lng: -111.045606
  },
  {
    id: 'rillito',
    name: 'Rillito River',
    watershed: 'lower rillito river',
    description: 'The main east–west corridor of northern Tucson, draining the Catalina piedmont.',
    labelPos: 'above',
    subtitle: 'rillito river wash · tucson region',
    body: [
      'At the Rillito River, the absence of visible water became the central condition shaping the recordings. The dry wash carried wind movement, low infrastructural vibration, nocturnal ecological activity, and long stretches of suspended quietness across the exposed riverbed landscape.',
      'Unlike the denser aquatic recordings collected at other sites, the audiovisual forms developed from Rillito remained minimal and restrained. Sparse circular systems, drifting movement, and intermittent pulses emerged from ultrasonic and environmental recordings, reflecting fragmented ecological rhythms and the residual presence of an intermittent desert river system. Land recordings produced grounded resonant forms shaped by low-frequency vibration and dry material contact across the wash environment.'
    ],
    lat: 32.274889,
    lng: -110.904717
  },
  {
    id: 'agua-caliente',
    name: 'Agua Caliente',
    watershed: 'agua caliente wash',
    description: 'A spring-fed system in the northeastern foothills, fed by thermal groundwater.',
    subtitle: 'agua caliente park · tucson region',
    body: [
      'At Agua Caliente, the recordings centered around spring water, biological activity, and the continuous movement of sound through water, trees, and surrounding organic material. The site carried a dense ecological presence where aquatic movement, resonance, and environmental activity remained in constant interaction.',
      'The resulting audiovisual forms became fluid, organic, and continuously shifting. Water recordings generated flowing horizontal systems shaped by turbulence and hydrological motion, land recordings transformed into morphing resonant structures responding to organic vibration and living material textures, and air recordings produced slowly drifting circular forms shaped by ecological density, movement, and sonic activity throughout the landscape.'
    ],
    lat: 32.281074,
    lng: -110.730507
  },
  {
    id: 'pantano',
    name: 'Pantano Wash',
    watershed: 'upper pantano wash',
    description: 'A broad ephemeral wash draining the southeastern bajada toward the Rillito.',
    labelPos: 'left',
    subtitle: '',
    body: [
      'Recorded beneath the bridge corridors and pathways of Pantano Wash, this site focused on the relationship between urban infrastructure, ecological activity, and the absence of visible water within the wash system. Traffic vibration, bat activity, passing bicycles, metallic resonance, and concrete surfaces shaped the recordings collected beneath the bridge structures.',
      'The audiovisual forms developed from Pantano became fractured, sparse, and infrastructural. Ultrasonic and air recordings generated intermittent pulses and isolated circular systems responding to nocturnal movement beneath the bridge environment, while land recordings transformed into vibrating geometric structures shaped by metallic resonance and low structural frequencies. In the absence of visible water, faint drifting line systems emerged as residual traces of latent hydrological presence within the dry urban wash.'
    ],
    lat: 32.240540,
    lng: -110.841439
  },
  {
    id: 'biosphere2',
    name: 'Biosphere 2 Ocean',
    watershed: 'oracle area',
    description: 'A large-scale Earth systems science research facility north of Tucson, housing living ecosystems including a tropical rainforest, savannah, and ocean biome.',
    subtitle: 'biosphere 2 · oracle region',
    body: [
      'At Biosphere 2, the recordings focused on human-built ecological systems, contained aquatic environments, and the resonant structures supporting simulated forms of environmental life. Using hydrophones, air recordings, and contact microphones attached to surrounding architectural and material surfaces, I recorded circulating water systems, aquatic movement, coral growth environments, mechanical resonance, and low structural vibrations moving throughout the site.',
      'Unlike the river and wash recordings collected across Southern Arizona, the audiovisual forms developed from Biosphere 2 became more rhythmic, repetitive, and structurally controlled. Water recordings generated oscillating flow systems shaped by circulation and contained aquatic movement, air recordings produced geometric pulse structures responding to enclosed environmental activity, and land recordings transformed into slow resonant forms resembling mechanical heartbeats moving through the architecture of the human-built ocean system. Together, the forms reflect the tension between ecological life, simulation, technological control, and environmental containment.'
    ],
    lat: 32.5784467,
    lng: -110.8513627
  }
]

// Media paths keyed by location id → category.
// null entry = no media yet; placeholder SVG is shown instead.
const MEDIA = {
  'santa-cruz': {
    air:   { src: 'media/Santa Cruz River/Air/scrair1.mp4' },
    land: { src: 'media/Santa Cruz River/Land/santacruzland.mp4' },
    water: { src: 'media/Santa Cruz River/Water/scrwater.mp4' }
  },
  'rillito': {
    air:   { src: 'media/Rillito River/Air/rillito_air_ultrasonic_processed.mp4' },
    land: { src: 'media/Rillito River/Land/rillito_land_processed.mp4' },
    water: { src: 'media/Rillito River/Water/rillito_water_memory.mp4' }
  },
  'agua-caliente': {
    air:   { src: 'media/Agua Caliente/Air/aguacalienteair_air_processed.mp4' },
    land: { src: 'media/Agua Caliente/Land/aguacalinteland2.mp4' },
    water: { src: 'media/Agua Caliente/Water/aguacaliente_water_processed.mp4' }
  },
  'pantano': {
    air:   { src: 'media/Pantano Wash/Air/pantanoultrasound2_1.mp4' },
    land: { src: 'media/Pantano Wash/Land/pantanoearth1.mp4' },
    water: { src: 'media/Pantano Wash/Water/pantano_water_memory_.mp4' }
  },
  'biosphere2': {
    air:   { src: 'media/Biosphere2 Ocean/Air/BiosphereOceanWaveGenerator1.mp4' },
    land: { src: 'media/Biosphere2 Ocean/Land/Land.mp4' },
    water: { src: 'media/Biosphere2 Ocean/Water/coral sounds biopshere.mp4' }
  }
}

const CATEGORIES = ['air', 'land', 'water']

const BORDER_COORDS = [
  [-111.30, 31.329], [-111.10, 31.332], [-110.934, 31.333],
  [-110.75, 31.333], [-110.45, 31.333], [-110.33, 31.333]
]

const COPY = {
  en: {
    subtitle: 'Resonant Ecologies is a practice-led audiovisual research project that uses field recording, contact microphones, hydrophones, embodied listening, and moving image to investigate environmental resonance across arid landscapes in Southern Arizona. Through site-responsive sound collection and experimental visual translation, the project transforms ecological vibrations, material textures, water presence, and atmospheric conditions into abstract audiovisual motion systems. Rather than functioning as documentary representation, the work approaches artmaking itself as a method of inquiry, using sound, rhythm, geometry, and movement to examine relationships between landscape, perception, ecology, and human intervention.',
    enter: 'enter'
  },
  es: {
    subtitle: 'Resonant Ecologies es un proyecto de investigación audiovisual basado en la práctica que utiliza grabaciones de campo, micrófonos de contacto, hidrófonos, escucha corporalizada e imagen en movimiento para investigar la resonancia ambiental en paisajes áridos del sur de Arizona. A través de la recolección sonora específica de cada sitio y la traducción visual experimental, el proyecto transforma vibraciones ecológicas, texturas materiales, presencia de agua y condiciones atmosféricas en sistemas audiovisuales abstractos de movimiento. En lugar de funcionar como una representación documental, la obra aborda la creación artística como un método de investigación, utilizando sonido, ritmo, geometría y movimiento para examinar las relaciones entre paisaje, percepción, ecología e intervención humana dentro de entornos desérticos.',
    enter: 'entrar'
  },
  tr: {
    subtitle: 'Resonant Ecologies, Güney Arizona\'nın kurak coğrafyalarında çevresel rezonansı araştırmak amacıyla saha kayıtları, kontak mikrofonları, hidrofona dayalı kayıtlar, bedensel dinleme pratikleri ve hareketli görüntüyü kullanan pratiğe dayalı bir görsel-işitsel araştırma projesidir. Mekâna özgü ses toplama süreçleri ve deneysel görsel çeviri yöntemleri aracılığıyla proje; ekolojik titreşimleri, maddesel dokuları, su varlığını ve atmosferik koşulları soyut görsel-işitsel hareket sistemlerine dönüştürür. Belgesel temsil biçiminden ziyade, çalışma sanat üretimini bir araştırma yöntemi olarak ele alır; ses, ritim, geometri ve hareket aracılığıyla peyzaj, algı, ekoloji ve insan müdahalesi arasındaki ilişkileri çöl çevreleri içerisinde incelemeyi amaçlar.',
    enter: 'gir'
  }
}

// ── SVG assets ────────────────────────────────────────────────────────────

const VIDEO_PLACEHOLDER_SVG = `<svg viewBox="0 0 32 18" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
  <rect width="32" height="18" fill="#f0f0f0"/>
  <line x1="0" y1="0" x2="32" y2="18" stroke="#e6e6e6" stroke-width="0.5"/>
  <line x1="32" y1="0" x2="0" y2="18" stroke="#e6e6e6" stroke-width="0.5"/>
</svg>`

const PLAY_ICON_SVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <circle cx="16" cy="16" r="13.5" fill="rgba(248,248,248,0.90)" stroke="#c0c0c0" stroke-width="0.6"/>
  <polygon points="13,10.5 13,21.5 23,16" fill="#606060"/>
</svg>`

const PAUSE_ICON_SVG = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" width="40" height="40">
  <circle cx="16" cy="16" r="13.5" fill="rgba(248,248,248,0.90)" stroke="#c0c0c0" stroke-width="0.6"/>
  <rect x="10.5" y="10.5" width="4" height="11" rx="0.5" fill="#606060"/>
  <rect x="17.5" y="10.5" width="4" height="11" rx="0.5" fill="#606060"/>
</svg>`

// ── State ─────────────────────────────────────────────────────────────────

let currentLang = 'en'
let map = null
let animationStarted = false
let currentGridVideo = null  // tracks the currently active grid video

// ── Map ───────────────────────────────────────────────────────────────────

function getLocationBounds() {
  const lats = LOCATIONS.map(l => l.lat)
  const lngs = LOCATIONS.map(l => l.lng)
  return [
    [Math.min(...lngs) - 0, Math.min(...lats) - 0],
    [Math.max(...lngs) + 0, Math.max(...lats) + 0]
  ]
}

function getInitialBounds() {
  const lats = LOCATIONS.map(l => l.lat)
  const lngs = LOCATIONS.map(l => l.lng)
  const borderLats = BORDER_COORDS.map(c => c[1])
  const borderLngs = BORDER_COORDS.map(c => c[0])
  const south = Math.min(...borderLats) - 0.25
  const north = Math.max(...lats) + 0.35
  const west  = Math.min(...lngs, ...borderLngs) - 0.2
  const east  = Math.max(...lngs, ...borderLngs) + 0.2
  return [[west, south], [east, north]]
}

function getZoomedInPadding() {
  const w = window.innerWidth
  if (w >= 1024) return { top: 40, bottom: 40, left: 60, right: 60 }
  if (w >= 768)  return { top: 30, bottom: 30, left: 45, right: 45 }
  return                 { top: 20, bottom: 20, left: 25, right: 25 }
}

function getResponsivePadding() {
  const w = window.innerWidth
  if (w >= 1024) return { top: 80, bottom: 80, left: 320, right: 80 }
  if (w >= 768)  return { top: 60, bottom: 60, left: 200, right: 60 }
  return                 { top: 40, bottom: 40, left: 40,  right: 40 }
}

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {},
      layers: [{ id: 'bg', type: 'background', paint: { 'background-color': '#ffffff' } }]
    },
    bounds: getInitialBounds(),
    fitBoundsOptions: { padding: getResponsivePadding() },
    maxBounds: [[-118, 28], [-104, 36]],
    minZoom: 8,
    attributionControl: false,
    pitchWithRotate: false
  })

  map.dragPan.disable()
  map.scrollZoom.disable()
  map.doubleClickZoom.disable()
  map.touchZoomRotate.disable()
  map.keyboard.disable()

  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right')

  map.on('load', () => {

    // ── Sources ──
    map.addSource('sc-watershed', {
      type: 'geojson',
      data: 'data/santa_cruz_watershed_complete.geojson'
    })
    map.addSource('rillito-watersheds', {
      type: 'geojson',
      data: 'data/rillito_system_watersheds.geojson'
    })
    map.addSource('water-areas', {
      type: 'geojson',
      data: 'data/water_area_polygon.geojson'
    })
    map.addSource('waterways', {
      type: 'geojson',
      data: 'data/waterway_filtered.geojson'
    })
    map.addSource('border', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
          type: 'Feature',
          properties: {},
          geometry: { type: 'LineString', coordinates: BORDER_COORDS }
        }]
      }
    })

    map.addLayer({
      id: 'sc-fill',
      type: 'fill',
      source: 'sc-watershed',
      paint: { 'fill-color': '#e8e8e8', 'fill-opacity': 1 }
    })

    map.addLayer({
      id: 'rillito-fill',
      type: 'fill',
      source: 'rillito-watersheds',
      layout: { visibility: 'none' },
      paint: { 'fill-color': '#f5f5f5', 'fill-opacity': 0 }
    })

    map.addLayer({
      id: 'border-line',
      type: 'line',
      source: 'border',
      paint: {
        'line-color': '#1a1a1a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 6, 0.5, 12, 1],
        'line-dasharray': [3, 4]
      }
    })

    map.addLayer({
      id: 'water-areas-layer',
      type: 'fill',
      source: 'water-areas',
      layout: { visibility: 'none' },
      paint: { 'fill-color': '#000000', 'fill-opacity': 0 }
    })

    map.addLayer({
      id: 'waterways-river-sc',
      type: 'line',
      source: 'waterways',
      filter: ['all',
        ['==', ['get', 'waterway'], 'river'],
        ['>', ['index-of', 'Santa Cruz', ['coalesce', ['get', 'name'], '']], -1]
      ],
      layout: { visibility: 'none' },
      paint: {
        'line-color': '#1a1a1a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 7, 1, 10, 2.5, 13, 4],
        'line-opacity': ['interpolate', ['linear'], ['zoom'], 7, 0, 8, 1]
      }
    })

    map.addLayer({
      id: 'waterways-river-other',
      type: 'line',
      source: 'waterways',
      filter: ['all',
        ['==', ['get', 'waterway'], 'river'],
        ['!', ['>', ['index-of', 'Santa Cruz', ['coalesce', ['get', 'name'], '']], -1]]
      ],
      layout: { visibility: 'none' },
      paint: {
        'line-color': '#1a1a1a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 8.5, 0.8, 10, 2, 13, 3.5],
        'line-opacity': 0
      }
    })

    const siteNameFilter = ['any',
      ['>', ['index-of', 'Santa Cruz',    ['coalesce', ['get', 'name'], '']], -1],
      ['>', ['index-of', 'Rillito',       ['coalesce', ['get', 'name'], '']], -1],
      ['>', ['index-of', 'Agua Caliente', ['coalesce', ['get', 'name'], '']], -1],
      ['>', ['index-of', 'Pantano',       ['coalesce', ['get', 'name'], '']], -1]
    ]
    map.addLayer({
      id: 'waterways-stream-site',
      type: 'line',
      source: 'waterways',
      filter: ['all', ['==', ['get', 'waterway'], 'stream'], siteNameFilter],
      layout: { visibility: 'none' },
      paint: {
        'line-color': '#1a1a1a',
        'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.5, 13, 1.5],
        'line-opacity': 0
      }
    })

    map.addLayer({
      id: 'waterways-stream-other',
      type: 'line',
      source: 'waterways',
      filter: ['all', ['==', ['get', 'waterway'], 'stream'], ['!', siteNameFilter]],
      layout: { visibility: 'none' },
      paint: {
        'line-color': '#aaaaaa',
        'line-width': ['interpolate', ['linear'], ['zoom'], 10, 0.3, 13, 1],
        'line-opacity': 0
      }
    })

    ;[
      { text: 'US',     lng: -110.75, lat: 31.46 },
      { text: 'MEXICO', lng: -110.75, lat: 31.22 }
    ].forEach(({ text, lng, lat }) => {
      const el = document.createElement('div')
      el.className = 'border-label'
      el.textContent = text
      new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([lng, lat])
        .addTo(map)
    })

    map.on('zoom', () => {
      const z = map.getZoom()
      const opacity = Math.max(0, Math.min(1, (z - 8.5) / 1.5))
      document.querySelectorAll('.border-label').forEach(el => {
        el.style.opacity = opacity
      })
    })

    const anchorMap = { right: 'left', left: 'right', above: 'bottom' }
    LOCATIONS.forEach(loc => {
      const pos = loc.labelPos || 'right'
      const el = document.createElement('div')
      el.className = 'location-label' + (pos !== 'right' ? ` label-${pos}` : '')
      el.style.opacity = '0'
      const markerHTML = `<span class="location-marker"><span class="marker-ring"></span><span class="marker-ring"></span></span>`
      if (pos === 'above') {
        el.innerHTML = `<span class="label-text">${loc.name.toLowerCase()}</span>${markerHTML}`
      } else {
        el.innerHTML = `${markerHTML}<span class="label-text">${loc.name.toLowerCase()}</span>`
      }
      el.dataset.locId = loc.id
      el.addEventListener('click', () => openLocation(loc.id))
      new maplibregl.Marker({ element: el, anchor: anchorMap[pos] })
        .setLngLat([loc.lng, loc.lat])
        .addTo(map)
    })
  })
}

// ── Fade-in helper ────────────────────────────────────────────────────────

function fadeIn(layerId, property, targetValue, durationMs) {
  map.setLayoutProperty(layerId, 'visibility', 'visible')
  map.setPaintProperty(layerId, property, 0)
  const start = performance.now()
  function tick(now) {
    const t = Math.min((now - start) / durationMs, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    map.setPaintProperty(layerId, property, eased * targetValue)
    if (t < 1) requestAnimationFrame(tick)
  }
  requestAnimationFrame(tick)
}

// ── Animation ─────────────────────────────────────────────────────────────

function startAnimation() {
  if (animationStarted) return
  animationStarted = true

  map.dragPan.enable()
  map.scrollZoom.enable()
  map.doubleClickZoom.enable()
  map.touchZoomRotate.enable()
  map.keyboard.enable()

  map.setLayoutProperty('waterways-river-sc', 'visibility', 'visible')

  map.fitBounds(getLocationBounds(), {
    padding: getZoomedInPadding(),
    duration: 7000,
    essential: true
  })

  setTimeout(() => {
    fadeIn('rillito-fill',         'fill-opacity',  0.9, 1800)
    fadeIn('water-areas-layer',    'fill-opacity',  1.0, 1800)
    fadeIn('waterways-river-other','line-opacity',  1.0, 1800)
  }, 2500)

  setTimeout(() => {
    fadeIn('waterways-stream-site',  'line-opacity', 1.0, 1800)
    fadeIn('waterways-stream-other', 'line-opacity', 1.0, 1800)
  }, 4500)

  map.once('moveend', () => {
    document.querySelectorAll('.location-label').forEach(el => {
      el.style.transition = 'opacity 1.6s ease'
      el.style.opacity = '1'
    })
    document.querySelectorAll('.map-hint, .map-ack').forEach(el => el.style.display = '')
  })
}

// ── Intro ─────────────────────────────────────────────────────────────────

function updateCopy() {
  const t = COPY[currentLang]
  document.getElementById('subtitle-text').textContent = t.subtitle
  document.getElementById('enter-btn').textContent = t.enter
}

function initIntro() {
  updateCopy()

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      currentLang = btn.dataset.lang
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'))
      btn.classList.add('active')
      updateCopy()
    })
  })

const projectLink = document.getElementById('project-link')
    const peopleLink = document.getElementById('people-link')
    projectLink.style.display = 'none'
    peopleLink.style.display = 'none'
    document.querySelectorAll('.map-title, .map-hint, .map-ack').forEach(el => el.style.display = 'none')

    document.getElementById('enter-btn').addEventListener('click', () => {
      const intro = document.getElementById('intro')
      intro.style.opacity = '0'
      intro.style.pointerEvents = 'none'
      setTimeout(() => { intro.style.display = 'none' }, 600)
      projectLink.style.display = ''
      peopleLink.style.display = ''
      document.querySelector('.map-title').style.display = ''

      if (map.loaded()) {
        startAnimation()
      } else {
        map.once('load', startAnimation)
      }
    })

    projectLink.addEventListener('click', () => {
      showIntro()
    })

    peopleLink.addEventListener('click', () => {
      openPeople()
    })
}

// ── Location overlay ──────────────────────────────────────────────────────

function openLocation(id) {
  const loc = LOCATIONS.find(l => l.id === id)
  if (!loc) return

  document.getElementById('ov-watershed').textContent = loc.watershed
  document.getElementById('ov-name').textContent = loc.name
  document.getElementById('ov-desc').textContent = loc.description

  const subtitleEl = document.getElementById('ov-subtitle')
  subtitleEl.textContent = loc.subtitle || ''
  subtitleEl.style.display = loc.subtitle ? '' : 'none'

  const bodyEl = document.getElementById('ov-body')
  bodyEl.innerHTML = (loc.body || []).map(p => `<p>${p}</p>`).join('')

  buildVideoGrid(loc.id, loc.name)

  document.querySelectorAll('.location-label').forEach(el => el.classList.remove('active'))
  document.querySelector(`.location-label[data-loc-id="${id}"]`)?.classList.add('active')

  document.getElementById('location-overlay').classList.add('open')
  document.getElementById('overlay-scroll').scrollTop = 0
  requestAnimationFrame(() => {
    refreshScrollIndicator('overlay-scroll', 'overlay-indicator')
    updateOverlayDot()
  })
}

function closeOverlay() {
  const overlay = document.getElementById('location-overlay')
  overlay.classList.remove('open')
  overlay.querySelectorAll('video').forEach(v => { v.pause(); v.muted = true })
  currentGridVideo = null
  document.querySelectorAll('.location-label').forEach(el => el.classList.remove('active'))
}

function openPeople() {
  document.getElementById('people-overlay').classList.add('open')
  requestAnimationFrame(() => {
    refreshScrollIndicator('people-scroll', 'people-indicator')
    updatePeopleDot()
  })
}

function closePeople() {
  document.getElementById('people-overlay').classList.remove('open')
}

function refreshScrollIndicator(scrollElId, indicatorId) {
  const scrollEl = document.getElementById(scrollElId)
  const indicator = document.getElementById(indicatorId)
  if (!scrollEl || !indicator) return
  const overflows = scrollEl.scrollHeight > scrollEl.clientHeight + 2
  indicator.classList.toggle('scroll-indicator--hidden', !overflows)
}

function updateScrollDot(scrollElId, indicatorId, dotId) {
  const scrollEl = document.getElementById(scrollElId)
  const indicator = document.getElementById(indicatorId)
  const dot = document.getElementById(dotId)
  if (!scrollEl || !indicator || !dot) return
  const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight
  const ratio = maxScroll > 0 ? scrollEl.scrollTop / maxScroll : 0
  const trackH = indicator.offsetHeight
  const dotH = dot.offsetHeight
  dot.style.top = (ratio * (trackH - dotH)) + 'px'
}

function updatePeopleDot()  { updateScrollDot('people-scroll',  'people-indicator',  'people-dot')  }
function updateOverlayDot() { updateScrollDot('overlay-scroll', 'overlay-indicator', 'overlay-dot') }
function updateDetailDot()  { updateScrollDot('detail-overlay', 'detail-indicator',  'detail-dot')  }

document.getElementById('people-scroll').addEventListener('scroll', updatePeopleDot)
document.getElementById('overlay-scroll').addEventListener('scroll', updateOverlayDot)
document.getElementById('detail-overlay').addEventListener('scroll', updateDetailDot)

function showIntro() {
  const intro = document.getElementById('intro')
  const projectLink = document.getElementById('project-link')
  const peopleLink = document.getElementById('people-link')
  const detailView = document.getElementById('detail-view')
  const detailControls = document.getElementById('detail-top-controls')
  const locationOverlay = document.getElementById('location-overlay')

  intro.style.display = ''
  intro.style.opacity = '1'
  intro.style.pointerEvents = 'auto'
  projectLink.style.display = 'none'
  peopleLink.style.display = 'none'
  document.querySelectorAll('.map-title, .map-hint, .map-ack').forEach(el => el.style.display = 'none')
  closePeople()

  locationOverlay.classList.remove('open')
  detailView.classList.remove('open')
  detailControls.classList.remove('visible')

  const detailVid = document.querySelector('#detail-video-bg video')
  if (detailVid) detailVid.pause()

  if (currentGridVideo) {
    currentGridVideo.muted = true
    currentGridVideo.pause()
  }
}

// ── Video grid ────────────────────────────────────────────────────────────

function buildVideoGrid(locationId, locName) {
  const grid = document.getElementById('video-grid')
  grid.innerHTML = ''

  const locationMedia = MEDIA[locationId] || {}
  const cards = []

  CATEGORIES.forEach(category => {
    const media = locationMedia[category] || null
    const card = buildVideoCard(locName, category, media)
    grid.appendChild(card)
    cards.push(card)
  })

  // Wire click-to-play with cross-card awareness
  cards.forEach(card => {
    const wrapper = card.querySelector('.video-wrapper')
    const video = card.querySelector('video')
    const iconEl = card.querySelector('.overlay-icon')

    wrapper.addEventListener('click', () => {
      if (!video) {
        openDetail(locName, card.dataset.category, null, 0)
        return
      }

      const isActive = card.classList.contains('active')

      if (isActive) {
        if (video.paused) {
          video.muted = false
          video.play().catch(() => {})
          iconEl.innerHTML = PAUSE_ICON_SVG
        } else {
          video.pause()
          iconEl.innerHTML = PLAY_ICON_SVG
        }
      } else {
        // Deactivate all cards
        cards.forEach(c => {
          c.classList.remove('active')
          c.classList.remove('inactive-neighbor')
          const v = c.querySelector('video')
          if (v) { v.pause(); v.muted = true }
          const oi = c.querySelector('.overlay-icon')
          if (oi) oi.innerHTML = PLAY_ICON_SVG
        })
        currentGridVideo = null
        // Activate this card
        card.classList.add('active')
        cards.forEach(c => { if (c !== card) c.classList.add('inactive-neighbor') })
        video.muted = false
        video.play().catch(() => {})
        iconEl.innerHTML = PAUSE_ICON_SVG
        currentGridVideo = video
      }
    })
  })
}

// ── Video card ────────────────────────────────────────────────────────────

function buildVideoCard(locName, category, media) {
  const card = document.createElement('div')
  card.className = 'video-card'
  card.dataset.category = category

  // 16:9 video wrapper
  const wrapper = document.createElement('div')
  wrapper.className = 'video-wrapper'

  if (media && media.src) {
    const video = document.createElement('video')
    video.src = media.src
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.preload = 'metadata'
    wrapper.appendChild(video)
  } else {
    const ph = document.createElement('div')
    ph.className = 'video-placeholder'
    ph.innerHTML = VIDEO_PLACEHOLDER_SVG
    wrapper.appendChild(ph)
  }

  // Play/pause icon overlay — appears on hover (idle) or always when active
  const overlay = document.createElement('div')
  overlay.className = 'video-overlay'
  const iconEl = document.createElement('div')
  iconEl.className = 'overlay-icon'
  iconEl.innerHTML = PLAY_ICON_SVG
  overlay.appendChild(iconEl)
  wrapper.appendChild(overlay)

  card.appendChild(wrapper)

  // Category label + detail link
  const meta = document.createElement('div')
  meta.className = 'card-meta'

  const catSpan = document.createElement('span')
  catSpan.className = 'card-category'
  catSpan.textContent = category

  const detailSpan = document.createElement('span')
  detailSpan.className = 'card-detail-link'
  detailSpan.textContent = 'Detail →'
  detailSpan.addEventListener('click', e => {
    e.stopPropagation()
    const gridVideo = card.querySelector('video')
    const startTime = gridVideo ? gridVideo.currentTime : 0
    openDetail(locName, category, media ? media.src : null, startTime)
  })

  meta.appendChild(catSpan)
  meta.appendChild(detailSpan)
  card.appendChild(meta)

  return card
}

// ── Detail view ───────────────────────────────────────────────────────────

const IMG_PLACEHOLDER_SVG = `<svg viewBox="0 0 3 2" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
  <rect width="3" height="2" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.18)" stroke-width="0.025"/>
  <line x1="0" y1="0" x2="3" y2="2" stroke="rgba(255,255,255,0.09)" stroke-width="0.025"/>
  <line x1="3" y1="0" x2="0" y2="2" stroke="rgba(255,255,255,0.09)" stroke-width="0.025"/>
  <rect x="1.28" y="0.82" width="0.44" height="0.36" rx="0.04" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.028"/>
  <circle cx="1.5" cy="1" r="0.11" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="0.028"/>
</svg>`

const DETAIL_CONTENT = {
  'Agua Caliente': {
    air: {
      text: 'Air recordings captured birds, insects, and continuous ecological activity surrounding the spring-fed environment. These sounds generated slowly shifting circular forms that expand, drift, and overlap, reflecting the site\'s biological density and constant movement.',
      img: 'media/Agua Caliente/Air/Details/AguaAir.jpg'
    },
    land: {
      text: 'Contact microphones attached to trees and surrounding materials revealed subtle internal vibrations moving through living surfaces. These recordings became morphing resonant forms whose movement reflects growth, flexibility, and organic response.',
      img: 'media/Agua Caliente/Land/Details/AguaLand.jpg'
    },
    water: {
      text: 'Hydrophone recordings captured submerged movement, turbulence, and the layered textures of spring water. The visual translation uses flowing line systems, distortion, and rhythmic motion to reflect the site\'s active hydrological presence.',
      img: null
    }
  },
  'Biosphere 2 Ocean': {
    air: {
      text: 'Air recordings documented the sounds of enclosed ecological systems, circulation, and human-designed environmental conditions. These sounds generated structured geometric forms whose movement reflects repetition, containment, and environmental control.',
      img: 'media/Biosphere2 Ocean/Air/Details/biosphereAir.jpg'
    },
    land: {
      text: 'Contact microphone recordings captured low resonant vibrations traveling through the architecture supporting the ocean system. The resulting forms move through slow rhythmic pulses, resembling a mechanical heartbeat circulating through the built environment.',
      img: 'media/Biosphere2 Ocean/Land/Details/BiosphereLand.jpg'
    },
    water: {
      text: 'Hydrophone recordings captured circulating water systems and aquatic activity within the ocean environment. These recordings generated oscillating visual structures shaped by repetition, flow, and contained movement, reflecting the relationship between ecological life and technological design.',
      img: 'media/Biosphere2 Ocean/Water/Details/BisophereWater.jpg'
    }
  },
  'Pantano Wash': {
    air: {
      text: 'Recorded beneath a bridge corridor, the air recordings captured bat activity, passing bicycles, distant traffic, and the layered sounds of urban movement. These recordings generated sparse pulses and circular forms that appear intermittently across the visual field, reflecting the fragmented ecological activity of the site.',
      img: null
    },
    land: {
      text: 'Contact microphones attached to metal infrastructure revealed low structural vibrations traveling through the bridge environment. The visual translations became vibrating geometric structures shaped by resonance, pressure, and repeated infrastructural movement.',
      img: null
    },
    water: {
      text: 'Although surface water was absent during recording, the wash remains defined by seasonal flow. This absence was translated into faint drifting line systems that move slowly across the screen, suggesting latent hydrological presence and the memory of water within the dry wash.',
      img: null
    }
  },
  'Rillito River': {
    air: {
      text: 'The air recordings captured wind movement and intermittent ecological activity across the open riverbed. These sounds generated sparse circular systems and drifting pulses, emphasizing openness, distance, and the fragmented rhythms of the dry wash.',
      img: 'media/Rillito River/Air/Details/RillitoAir.jpg'
    },
    land: {
      text: 'Contact microphone recordings revealed low-frequency vibrations traveling through the landscape and surrounding structures. The resulting forms remain grounded and restrained, responding slowly to shifts in resonance and material contact.',
      img: 'media/Rillito River/Land/Details/RillitoLand.jpg'
    },
    water: {
      text: 'No visible water was present during recording. Rather than representing flow directly, the visual system responds to absence through faint linear movement and suspended motion, reflecting the residual presence of an intermittent river system.',
      img: 'media/Rillito River/Water/Details/RillitoWater.jpg'
    }
  },
  'Santa Cruz River': {
    air: {
      text: 'The air recordings captured wind movement, insects, and the shifting sonic textures surrounding the river corridor. In the visual translation, these sounds became expanding circular forms that respond to changes in density, movement, and spatial rhythm, reflecting the river\'s continuous interaction with its surrounding environment.',
      img: 'media/Santa Cruz River/Air/Details/SantaCruzAir.jpg'
    },
    land: {
      text: 'Contact microphone recordings collected from river materials revealed subtle vibrations traveling through wood, sediment, and physical surfaces. These recordings were translated into resonant geometric structures that expand and contract through vibration, emphasizing the material presence of the river landscape.',
      img: 'media/Santa Cruz River/Land/Details/santacruzland.jpg'
    },
    water: {
      text: 'Hydrophone recordings captured the movement of flowing water beneath the surface. The resulting visual system uses layered horizontal motion and rhythmic expansion to reflect current, flow, and the continuous movement of water through the river system.',
      video: 'media/Santa Cruz River/Water/Details/SantaCruzWater2.mp4'
    }
  }
}

function openDetail(locName, category, mediaSrc, startTime = 0) {
  if (currentGridVideo) currentGridVideo.pause()

  // ── Video background ──
  const bg = document.getElementById('detail-video-bg')
  bg.innerHTML = ''
  bg.style.background = mediaSrc ? '' : '#111111'

  const playBtn = document.getElementById('detail-play-btn')
  let detailVideo = null

  if (mediaSrc) {
    detailVideo = document.createElement('video')
    detailVideo.src = mediaSrc
    detailVideo.muted = false
    detailVideo.autoplay = true
    detailVideo.loop = true
    detailVideo.playsInline = true
    detailVideo.addEventListener('loadedmetadata', () => {
      detailVideo.currentTime = startTime
    }, { once: true })
    bg.appendChild(detailVideo)

    // Sync button label with actual video state
    const syncBtn = () => { playBtn.textContent = detailVideo.paused ? '▶' : '||' }
    detailVideo.addEventListener('play',  syncBtn)
    detailVideo.addEventListener('pause', syncBtn)
    playBtn.textContent = '||'  // starts autoplaying
    playBtn.style.display = ''
    playBtn.onclick = () => {
      detailVideo.paused ? detailVideo.play().catch(() => {}) : detailVideo.pause()
    }
  } else {
    const ph = document.createElement('div')
    ph.style.cssText = 'position:absolute;inset:0;opacity:0.2'
    ph.innerHTML = VIDEO_PLACEHOLDER_SVG
    bg.appendChild(ph)
    playBtn.style.display = 'none'
    playBtn.onclick = null
  }

  // ── Overlay content ──
  const content = document.getElementById('detail-content')
  content.innerHTML = ''

  const detail = DETAIL_CONTENT[locName]?.[category]

  const cat = document.createElement('p')
  cat.className = 'detail-cat'
  cat.textContent = category

  const loc = document.createElement('h2')
  loc.className = 'detail-loc'
  loc.textContent = locName

  const hr = document.createElement('div')
  hr.className = 'detail-hr'

  const para1 = document.createElement('p')
  para1.className = 'detail-para'
  para1.textContent = detail?.text ?? ''

  const imgWrap = document.createElement('div')
  imgWrap.className = 'detail-img-grid'
  if (detail?.img) {
    const img = document.createElement('img')
    img.src = detail.img
    img.className = 'detail-img'
    img.alt = `${locName} ${category}`
    imgWrap.appendChild(img)
  } else if (detail?.video) {
    const vid = document.createElement('video')
    vid.src = detail.video
    vid.className = 'detail-img'
    vid.muted = true
    vid.autoplay = true
    vid.loop = true
    vid.playsInline = true
    imgWrap.appendChild(vid)
  } else {
    const ph = document.createElement('div')
    ph.className = 'detail-img-ph'
    ph.innerHTML = IMG_PLACEHOLDER_SVG
    imgWrap.appendChild(ph)
  }

  content.append(cat, loc, hr, para1, imgWrap)

  content.classList.add('collapsed')

  document.getElementById('detail-overlay').scrollTop = 0
  document.getElementById('detail-view').classList.add('open')
  document.getElementById('detail-top-controls').classList.add('visible')
  const infoBtn = document.getElementById('detail-info-btn')
  infoBtn.textContent = '≡'
  infoBtn.classList.remove('expanded')
  infoBtn.classList.add('visible')
  requestAnimationFrame(() => {
    refreshScrollIndicator('detail-overlay', 'detail-indicator')
    updateDetailDot()
  })

  setTimeout(() => expandCard(infoBtn, content), 500)
}

// ── FLIP card expand / collapse ───────────────────────────────────────────

let _cardTransitionHandler = null
let _cardTransitionTarget  = null

function _cancelCardAnim() {
  if (_cardTransitionHandler && _cardTransitionTarget) {
    _cardTransitionTarget.removeEventListener('transitionend', _cardTransitionHandler)
  }
  _cardTransitionHandler = null
  _cardTransitionTarget  = null
}

function _onCardTransitionEnd(content, done) {
  _cancelCardAnim()
  _cardTransitionHandler = (e) => {
    if (e.target !== content || e.propertyName !== 'clip-path') return
    _cancelCardAnim()
    content.style.transition = ''
    content.style.clipPath    = ''
    content.style.transform   = ''
    done()
  }
  _cardTransitionTarget = content
  content.addEventListener('transitionend', _cardTransitionHandler)
}

function expandCard(btn, content) {
  _cancelCardAnim()

  // FIRST: capture button's exact viewport rect
  const btnRect = btn.getBoundingClientRect()

  // Switch to expanded state instantly (visibility: visible) so we can measure it
  content.style.transition = 'none'
  content.classList.remove('collapsed')

  // LAST: force reflow → capture expanded rect
  const cardRect = content.getBoundingClientRect()

  // INVERT: translate card to button's position + clip to button's size
  const dx = btnRect.left - cardRect.left
  const dy = btnRect.top  - cardRect.top
  const r  = Math.max(0, cardRect.right  - btnRect.right)
  const b  = Math.max(0, cardRect.bottom - btnRect.bottom)
  content.style.transform = `translate(${dx}px, ${dy}px)`
  content.style.clipPath  = `inset(0 ${r}px ${b}px 0 round 999px)`

  btn.style.opacity = '0'
  btn.style.pointerEvents = 'none'

  // PLAY: two RAFs — first commits the inverted frame, second starts the transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      _onCardTransitionEnd(content, () => {
        btn.textContent = '—'
        btn.classList.add('expanded')
        btn.style.opacity = ''
        btn.style.pointerEvents = ''
      })
      const ease = '0.55s cubic-bezier(0.4, 0, 0.2, 1)'
      content.style.transition = `clip-path ${ease}, transform ${ease}`
      content.style.clipPath   = 'inset(0 0 0 0 round 20px)'
      content.style.transform  = 'translate(0, 0)'
    })
  })
}

function collapseCard(btn, content) {
  _cancelCardAnim()

  const btnRect  = btn.getBoundingClientRect()
  const cardRect = content.getBoundingClientRect()

  const dx = btnRect.left - cardRect.left
  const dy = btnRect.top  - cardRect.top
  const r  = Math.max(0, cardRect.right  - btnRect.right)
  const b  = Math.max(0, cardRect.bottom - btnRect.bottom)

  btn.style.opacity = '0'
  btn.style.pointerEvents = 'none'

  _onCardTransitionEnd(content, () => {
    content.classList.add('collapsed')
    btn.textContent = '≡'
    btn.classList.remove('expanded')
    btn.style.opacity = ''
    btn.style.pointerEvents = ''
  })
  const ease = '0.45s cubic-bezier(0.4, 0, 0.2, 1)'
  content.style.transition = `clip-path ${ease}, transform ${ease}`
  content.style.clipPath   = `inset(0 ${r}px ${b}px 0 round 999px)`
  content.style.transform  = `translate(${dx}px, ${dy}px)`
}

function closeDetail() {
  _cancelCardAnim()
  document.getElementById('detail-view').classList.remove('open')
  document.getElementById('detail-top-controls').classList.remove('visible')
  const infoBtn = document.getElementById('detail-info-btn')
  infoBtn.classList.remove('visible', 'expanded')
  infoBtn.style.opacity = ''
  infoBtn.style.pointerEvents = ''
  const content = document.getElementById('detail-content')
  content.style.transition = ''
  content.style.clipPath   = ''
  content.style.transform  = ''
  content.classList.add('collapsed')

  const detailVid = document.getElementById('detail-video-bg').querySelector('video')
  if (detailVid) detailVid.pause()

  if (currentGridVideo) {
    currentGridVideo.muted = false
    currentGridVideo.play().catch(() => {})
  }
}

// ── Global events ─────────────────────────────────────────────────────────

document.getElementById('overlay-close-btn').addEventListener('click', closeOverlay)
document.getElementById('detail-close-btn').addEventListener('click', closeDetail)
document.getElementById('people-close-btn').addEventListener('click', closePeople)

document.getElementById('detail-info-btn').addEventListener('click', () => {
  const content = document.getElementById('detail-content')
  const btn = document.getElementById('detail-info-btn')
  if (content.classList.contains('collapsed')) {
    expandCard(btn, content)
  } else {
    collapseCard(btn, content)
  }
})

document.getElementById('location-overlay').addEventListener('click', e => {
  if (e.target.id === 'location-overlay') closeOverlay()
})

document.getElementById('people-overlay').addEventListener('click', e => {
  if (e.target.id === 'people-overlay') closePeople()
})

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  if (document.getElementById('people-overlay').classList.contains('open')) {
    closePeople()
  } else if (document.getElementById('detail-view').classList.contains('open')) {
    closeDetail()
  } else {
    closeOverlay()
  }
})

// ── Boot ──────────────────────────────────────────────────────────────────

initMap()
initIntro()
