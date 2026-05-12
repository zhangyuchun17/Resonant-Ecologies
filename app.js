// ── Data ─────────────────────────────────────────────────────────────────

const LOCATIONS = [
  {
    id: 'santa-cruz',
    name: 'Santa Cruz River',
    watershed: 'upper santa cruz',
    description: 'The primary artery of the Tucson basin, flowing northward through the valley floor.',
    lat: 32.22,
    lng: -111.00
  },
  {
    id: 'rillito',
    name: 'Rillito River',
    watershed: 'lower rillito river',
    description: 'The main east–west corridor of northern Tucson, draining the Catalina piedmont.',
    lat: 32.285,
    lng: -110.87
  },
  {
    id: 'agua-caliente',
    name: 'Agua Caliente',
    watershed: 'agua caliente wash',
    description: 'A spring-fed system in the northeastern foothills, fed by thermal groundwater.',
    lat: 32.282272176732334,
    lng: -110.73141382413473
  },
  {
    id: 'tanque-verde',
    name: 'Tanque Verde Creek',
    watershed: 'upper tanque verde wash',
    description: 'An intermittent stream descending from the Rincon Mountains to the east.',
    lat: 32.26211062454957,
    lng: -110.82393926090197
  },
  {
    id: 'pantano',
    name: 'Pantano Wash',
    watershed: 'upper pantano wash',
    description: 'A broad ephemeral wash draining the southeastern bajada toward the Rillito.',
    lat: 32.195,
    lng: -110.775
  },
  {
    id: 'biosphere2',
    name: 'Biosphere 2',
    watershed: 'oracle area',
    description: 'A large-scale Earth systems science research facility north of Tucson, housing living ecosystems including a tropical rainforest, savannah, and ocean biome.',
    lat: 32.581882102973815,
    lng: -110.84757005691236
  }
]

// Media paths keyed by location id → category.
// null entry = no media yet; placeholder SVG is shown instead.
const MEDIA = {
  'santa-cruz': {
    air:   { src: 'media/Santa Cruz River/Air/Audio-Visual/scrair1.MOV' },
    earth: { src: 'media/Santa Cruz River/Land/Audio-Visual/santacruzland.mp4' },
    water: { src: 'media/Santa Cruz River/Water/Audio-Visual/scrwater.mp4' }
  },
  'biosphere2': {
    air:   { src: 'media/Biosphere2 Ocean/Air/BiosphereOceanWaveGenerator1.mp4' },
    earth: { src: 'media/Biosphere2 Ocean/Land/Land.mp4' },
    water: { src: 'media/Biosphere2 Ocean/Water/coral sounds biopshere.mp4' }
  },
  'pantano': {
    air:   { src: 'media/Pantano Wash/Air/pantanoultrasound2_1.mp4' },
    earth: { src: 'media/Pantano Wash/Land/pantanoearth1.mp4' },
    water: null
  }
}

const CATEGORIES = ['air', 'earth', 'water']

const COPY = {
  en: {
    subtitle: 'text placeholder text placeholder text placeholder\ntext placeholder text placeholder',
    method: 'text placeholder',
    enter: 'enter'
  },
  es: {
    subtitle: 'marcador de posición de texto marcador de posición de texto\nmarcador de posición de texto marcador de posición',
    method: 'marcador de posición de texto',
    enter: 'entrar'
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

function initMap() {
  map = new maplibregl.Map({
    container: 'map',
    style: {
      version: 8,
      sources: {},
      layers: [{ id: 'bg', type: 'background', paint: { 'background-color': '#ffffff' } }]
    },
    center: [-110.87, 32.0],
    zoom: 7.5,
    maxBounds: [[-112.2, 30.2], [-109.4, 33.8]],
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
          geometry: {
            type: 'LineString',
            coordinates: [
              [-111.30, 31.329], [-111.10, 31.332], [-110.934, 31.333],
              [-110.75, 31.333], [-110.45, 31.333], [-110.33, 31.333]
            ]
          }
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
      ['>', ['index-of', 'Tanque Verde',  ['coalesce', ['get', 'name'], '']], -1],
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

    LOCATIONS.forEach(loc => {
      const el = document.createElement('div')
      el.className = 'location-label'
      el.style.opacity = '0'
      el.innerHTML = `<span class="label-dot"></span><span class="label-text">${loc.name.toLowerCase()}</span>`
      el.addEventListener('click', () => openLocation(loc.id))
      new maplibregl.Marker({ element: el, anchor: 'left' })
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

  map.flyTo({
    center: [-110.87, 32.39],
    zoom: 10.0,
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
    const hint = document.createElement('p')
    hint.className = 'map-hint'
    hint.textContent = 'select a watercourse'
    document.body.appendChild(hint)
  })
}

// ── Intro ─────────────────────────────────────────────────────────────────

function updateCopy() {
  const t = COPY[currentLang]
  document.getElementById('subtitle-text').textContent = t.subtitle
  document.getElementById('method-text').textContent = t.method
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

const aboutLink = document.getElementById('about-link')
    aboutLink.style.display = 'none'

    document.getElementById('enter-btn').addEventListener('click', () => {
      const intro = document.getElementById('intro')
      intro.style.opacity = '0'
      intro.style.pointerEvents = 'none'
      setTimeout(() => { intro.style.display = 'none' }, 600)
      aboutLink.style.display = ''

      if (map.loaded()) {
        startAnimation()
      } else {
        map.once('load', startAnimation)
      }
    })

    aboutLink.addEventListener('click', () => {
      showIntro()
  })
}

// ── Location overlay ──────────────────────────────────────────────────────

function openLocation(id) {
  const loc = LOCATIONS.find(l => l.id === id)
  if (!loc) return

  document.getElementById('ov-watershed').textContent = loc.watershed
  document.getElementById('ov-name').textContent = loc.name
  document.getElementById('ov-desc').textContent = loc.description

  buildVideoGrid(loc.id, loc.name)

  document.getElementById('location-overlay').classList.add('open')
}

function closeOverlay() {
  const overlay = document.getElementById('location-overlay')
  overlay.classList.remove('open')
  overlay.querySelectorAll('video').forEach(v => { v.pause(); v.muted = true })
  currentGridVideo = null
}

function showIntro() {
  const intro = document.getElementById('intro')
  const aboutLink = document.getElementById('about-link')
  const detailView = document.getElementById('detail-view')
  const detailControls = document.getElementById('detail-top-controls')
  const locationOverlay = document.getElementById('location-overlay')

  intro.style.display = ''
  intro.style.opacity = '1'
  intro.style.pointerEvents = 'auto'
  aboutLink.style.display = 'none'

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
  detailSpan.textContent = 'detail →'
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

const TEXT_PH = 'text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder'

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
  para1.textContent = TEXT_PH

  const imgGrid = document.createElement('div')
  imgGrid.className = 'detail-img-grid'
  ;[0, 1].forEach(() => {
    const ph = document.createElement('div')
    ph.className = 'detail-img-ph'
    ph.innerHTML = IMG_PLACEHOLDER_SVG
    imgGrid.appendChild(ph)
  })

  const caption = document.createElement('p')
  caption.className = 'detail-caption'
  caption.textContent = '[ image placeholder ]'

  const para2 = document.createElement('p')
  para2.className = 'detail-para'
  para2.textContent = TEXT_PH

  content.append(cat, loc, hr, para1, imgGrid, caption, para2)

  document.getElementById('detail-view').classList.add('open')
  document.getElementById('detail-top-controls').classList.add('visible')
}

function closeDetail() {
  document.getElementById('detail-view').classList.remove('open')
  document.getElementById('detail-top-controls').classList.remove('visible')

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
document.getElementById('detail-close-btn').addEventListener('click', closeDetail)

document.getElementById('location-overlay').addEventListener('click', e => {
  if (e.target.id === 'location-overlay') closeOverlay()
})

document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return
  if (document.getElementById('detail-view').classList.contains('open')) {
    closeDetail()
  } else {
    closeOverlay()
  }
})

// ── Boot ──────────────────────────────────────────────────────────────────

initMap()
initIntro()
