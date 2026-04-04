# Gemini Image Editing API

API Node.js / Express qui utilise **Google Gemini 2.5 Flash Image** pour modifier des images via un prompt en langage naturel.

## Fonctionnement

Envoyez une URL d'image + un prompt → Gemini retourne l'image modifiée en binaire.

## Endpoints

### `GET /`
Page de documentation interactive avec testeur en direct.

### `GET /api/nanobanana`
Endpoint principal de modification d'image.

**Paramètres :**
| Paramètre   | Type   | Requis | Description |
|-------------|--------|--------|-------------|
| `prompt`    | string | ✅ Oui  | Instruction en langage naturel |
| `image_url` | string | ✅ Oui  | URL publique de l'image source |

**Exemple :**
```
GET /api/nanobanana?prompt=Changer en rouge tous les vêtements&image_url=https://example.com/photo.jpg
```

**Réponse :** Image binaire PNG/JPEG (Content-Type: image/png ou image/jpeg)

### `GET /api/healthz`
Health check → `{ "status": "ok" }`

## Variables d'environnement requises

```env
PORT=3000
AI_INTEGRATIONS_GEMINI_BASE_URL=https://...
AI_INTEGRATIONS_GEMINI_API_KEY=your_key
```

## Installation

```bash
npm install
npm run build
npm start
```

## Exemples de prompts

- `"Changer en rouge tous les vêtements"`
- `"Replace background with a tropical beach"`
- `"Transform into vibrant pop-art style with bold colors"`
- `"Make this person wear a blue denim mini skirt"`
- `"Add sunglasses and a red hat"`

## Stack technique

- **Runtime :** Node.js + TypeScript
- **Framework :** Express 5
- **IA :** Google Gemini 2.5 Flash Image (`@google/genai`)
- **Build :** esbuild
- **Logs :** pino
