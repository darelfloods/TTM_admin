// Configuration de l'environnement pour l'admin TocTocMedoc
// On aligne la logique sur le projet Toctoc-M-doc

const ENV = {
  // URL de base de l'API - Backend TTM local pour développement
  API_BASE_URL:
    // Priorité: variable d'environnement > backend local (dev) > backend Render > anciens serveurs
    (import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
    'http://localhost:8000',

  // Liste ordonnée des bases (avec fallback). La première qui répond est utilisée côté appelant si besoin.
  API_BASE_URLS: (() => {
    const list = []
    const norm = (u) => (u ? String(u).replace(/\/+$/g, '') : u)
    const candidates = [
      norm(import.meta.env && import.meta.env.VITE_API_BASE_URL),
      'http://localhost:8000', // Backend local pour développement (priorité)
      'https://api-ttm.onrender.com', // Backend Render en fallback
      norm(import.meta.env && import.meta.env.VITE_API_FALLBACK_BASE_URL),
      'https://51.68.46.67:8000', // Ancien backend hébergé
      'https://vps-b9ccb6e1.vps.ovh.net:8000', // Ancien serveur
    ]
    for (const c of candidates) {
      if (c && !list.includes(c)) list.push(c)
    }
    return list
  })(),
}

if (!ENV.API_BASE_URL) {
  console.warn("VITE_API_BASE_URL n'est pas défini, utilisation de la valeur par défaut")
}

export default ENV





