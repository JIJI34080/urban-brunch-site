# URBAN BRUNCH

Site vitrine multilingue pour le restaurant URBAN BRUNCH, construit avec Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, next-intl, framer-motion et Nodemailer.

## 🚀 Prise en main

```bash
npm install
npm run dev
```

L'application est servie sur http://localhost:3000. Le middleware redirige automatiquement vers la locale par défaut (`/fr-CH`).

### Variables d'environnement

Créer un fichier `.env.local` à la racine avec les clés suivantes :

```
NEXT_PUBLIC_ADMIN_KEY=motdepasse-securise
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=compte@example.com
SMTP_PASS=super-secret
```

- `NEXT_PUBLIC_ADMIN_KEY` protège l'accès à `/admin`.
- Les clés SMTP alimentent les actions serveur de contact et réservation.

### Commandes utiles

| Commande | Description |
| --- | --- |
| `npm run dev` | Démarrage local en mode développement |
| `npm run build` | Construction de l'application |
| `npm run start` | Lancement en production locale |
| `npm run lint` | Vérification lint Next.js |
| `npm run format` | Formatage avec Prettier |

> 💡 Assurez-vous d'exécuter `npm install` avant les commandes de lint ou de build afin que toutes les dépendances soient disponibles.

## 📁 Structure principale

- `app/` – Routes Next.js App Router (pages localisées, admin, sitemap, robots)
- `components/` – Composants UI (navbar, hero, menu, formulaires, etc.)
- `data/` – Données JSON (menu, horaires)
- `locales/` – Traductions next-intl pour fr-CH, de-CH, it-CH, rm-CH et en
- `lib/` – Outils (i18n, horaires, utils Tailwind, édition admin)

## 🌍 Internationalisation

- next-intl avec détection `Accept-Language`
- Prefixe de locale obligatoire (`/[locale]/...`)
- Sélecteur de langue et cookie de préférence dans la navbar

## ✉️ Formulaires & Emailing

Les formulaires de contact et de réservation utilisent des server actions validées par Zod et envoient des emails avec Nodemailer. En environnement de développement, si les variables SMTP sont absentes, les envois sont ignorés et un warning est affiché côté serveur.

## 🧑‍💻 Admin mini-CMS

- Accès via `/admin`
- Authentification simple par mot de passe (env `NEXT_PUBLIC_ADMIN_KEY`)
- Édition des fichiers JSON (`data/` et `locales/`)
- Validation JSON avant sauvegarde

## 🗺 Déploiement sur Vercel

1. Connecter le dépôt à Vercel
2. Définir les variables d'environnement dans les settings du projet
3. Déployer – la configuration App Router génère automatiquement sitemap et robots

## 🛠 Outils & Styles

- Tailwind CSS + shadcn/ui (boutons, cartes, formulaires)
- Palette personnalisée : beige (#E7D9C9), cream (#F6EFE9), terracotta (#CB7A5C), wood (#8A5A44), noir (#111111)
- Animations framer-motion pour les entrées de sections et la carte des menus

## 📄 Licence

MIT
