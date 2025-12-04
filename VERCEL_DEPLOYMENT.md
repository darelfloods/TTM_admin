# Guide de Déploiement sur Vercel - TocTocMedoc Admin

## 🚀 Configuration Vercel

### Étape 1 : Configurer les Variables d'Environnement

Dans votre projet Vercel, allez dans **Settings → Environment Variables** et ajoutez :

| Variable | Valeur | Environnement |
|----------|--------|---------------|
| `VITE_API_BASE_URL` | `https://api-ttm.onrender.com` | Production, Preview, Development |

### Étape 2 : Redéployer l'Application

Après avoir ajouté la variable d'environnement :

1. Allez dans l'onglet **Deployments**
2. Cliquez sur les trois points (...) du dernier déploiement
3. Sélectionnez **Redeploy**
4. Cochez **Use existing Build Cache** (optionnel)
5. Cliquez sur **Redeploy**

### Étape 3 : Vérifier la Configuration CORS sur Render

Assurez-vous que votre API sur Render autorise les requêtes depuis :
- `https://ttm-admin-eta.vercel.app`
- `https://*.vercel.app` (pour les previews)

Dans votre backend FastAPI, la configuration CORS devrait ressembler à :

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ttm-admin-eta.vercel.app",
        "https://*.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📋 Fichiers de Configuration Créés

- **`vercel.json`** : Configure le routing SPA pour Vue Router
- **`.env`** : Variables d'environnement pour le développement local
- **`.env.production`** : Variables d'environnement pour la production (référence)

## 🔍 Vérification Post-Déploiement

1. Ouvrez la console du navigateur sur https://ttm-admin-eta.vercel.app
2. Vérifiez que les requêtes partent vers `https://api-ttm.onrender.com`
3. Vérifiez qu'il n'y a pas d'erreurs CORS
4. Testez la connexion avec vos identifiants

## ⚠️ Problèmes Courants

### Erreur 404 sur les routes
✅ **Résolu** : Le fichier `vercel.json` redirige toutes les routes vers `index.html`

### Requêtes vers localhost au lieu de Render
✅ **À résoudre** : Configurez `VITE_API_BASE_URL` dans les variables d'environnement Vercel

### Erreur CORS
✅ **À vérifier** : Assurez-vous que l'API Render autorise votre domaine Vercel

### Identifiants incorrects
- Vérifiez que l'API Render est bien démarrée et accessible
- Testez l'endpoint directement : `https://api-ttm.onrender.com/docs`
- Vérifiez les logs de l'API Render pour voir si les requêtes arrivent

## 🔧 Commandes Utiles

```bash
# Développement local
npm run dev

# Build de production (pour tester localement)
npm run build
npm run preview

# Vérifier la configuration
echo $VITE_API_BASE_URL
```

## 📞 Support

Si le problème persiste après avoir suivi ces étapes :
1. Vérifiez les logs Vercel (onglet Deployments → cliquez sur le déploiement → Logs)
2. Vérifiez les logs Render de votre API
3. Utilisez les DevTools du navigateur (F12) pour inspecter les requêtes réseau
