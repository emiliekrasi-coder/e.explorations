---
name: morning
description: Routine matin slack/calendrier/confluence
---

# Skill : /morningroutine — Briefing du matin

Lance 4 agents **en parallèle** (un seul message, 4 tool calls Agent simultanés), puis synthétise leurs résultats en un briefing structuré.

---

## Agent 1 — Slack

Calcule le timestamp Unix de référence selon le jour de la semaine :
- **Si aujourd'hui est lundi** : utilise le vendredi précédent à 18h00 CEST (UTC+2)
- **Sinon** : utilise hier à 18h00 CEST (UTC+2)

**Canaux :**
- `#lbc-contact-private` → ID : `G01832RHJMV`
- `#cognition-lbc-adlife` → ID : `C07RT0NJLDS`
- `#lbc-ux-team` → cherche l'ID avec `slack_search_channels` si inconnu
- `#lbc-ux-ai` → cherche l'ID avec `slack_search_channels` si inconnu
- `#chanui` → cherche l'ID avec `slack_search_channels` si inconnu

**DMs :**
- Sarah Bouin → ID : `U09358UUMPS`
- Pauline Minary → ID : `U03CS5DCGE8`
- Paulina Barbier → cherche l'ID avec `slack_search_users`

Utilise `slack_read_channel` avec `oldest=<timestamp>`, `limit=50`, `response_format=concise`. Pour les DMs, utilise l'`user_id` comme `channel_id`.

**Filtrage :**
- Ignore les bots, Slackbot, sondages du vendredi, rappels ADP/Capex/télétravail
- Ignore les annonces récurrentes automatiques
- Signale les messages inhabituellement longs (>5 lignes) comme signaux faibles potentiels
- Note les sujets qui reviennent sans résolution

---

## Agent 2 — Gmail

Calcule la date de référence selon le jour de la semaine :
- **Si aujourd'hui est lundi** : date de référence = vendredi précédent à 18h00 CEST
- **Sinon** : date de référence = hier à 18h00 CEST

Cherche les emails reçus depuis cette date dans la boîte `emilie.krasi@adevinta.com` avec `search_gmail_messages` :
- `query` : `after:<timestamp_unix> in:inbox`
- `max_results` : 50

Pour chaque email potentiellement pertinent, lis son contenu avec `get_gmail_message_content`.

**Filtrage — ignorer :**
- Notifications automatiques (GitHub, Jira, CI/CD, monitoring, alertes système)
- Newsletters récurrentes sans lien avec le design, l'UX, les événements design, ou les projets d'Emilie
- Notifications de calendrier (invitations automatiques sans corps de message)
- Emails de type "no-reply" sans contenu actionnable

**Filtrage — garder :**
- Emails de collègues (PMs, designers, devs, managers)
- Newsletters ou digests liés au design, UX, produit, événements design
- Emails mentionnant les projets : Nouvelle notification vendeur, Nouvel inbox, Dépôt 1 clic
- Emails nécessitant une réponse ou une action d'Emilie
- Résultats d'études, feedbacks utilisateurs, partages de docs

**Retourne :**
- Résumé par email pertinent (sujet, expéditeur si humain ou source identifiable, date)
- Actions attendues explicites ou implicites
- Signalement des emails sans réponse qui semblent en attendre une

---

## Agent 3 — Google Calendar

Récupère les événements d'aujourd'hui pour `emilie.krasi@adevinta.com` avec `get_events` :
- `time_min` : aujourd'hui à 00:00:00+02:00
- `time_max` : aujourd'hui à 23:59:59+02:00
- `detailed: true`, `max_results: 25`

Retourne : titre, horaire, lieu, participants (prénom nom), description, statut de réponse d'Emilie. Identifie les conflits horaires et les events sans réponse (needsAction).

---

## Agent 3 — Confluence

Cherche les pages modifiées hier et aujourd'hui dans les espaces **FTCT** (Contact) et **LFA** (LBC FT Ads), axées design/produit/UX.

Utilise curl avec le token Bearer :

```bash
curl -s -H "Authorization: Bearer NTIxMjg2OTc3NzQ2OnJx9BhiHmTgmB48CPgyDrIIAZIC" \
"https://confluence.ets.mpi-internal.com/rest/api/content/search?cql=space%3D<SPACE>%20AND%20type%3Dpage%20AND%20lastModified%3E%3D%22<HIER>%22%20ORDER%20BY%20lastModified%20DESC&limit=15&expand=version" \
| python3 -c "import sys,json; r=json.load(sys.stdin); [print(p['id'],'|',p['title'],'|',p.get('version',{}).get('when','?')[:16]) for p in r.get('results',[])]"
```

Lis le contenu des pages pertinentes avec `mcp__confluence__confluence_get_page`.

**Garde :** specs UX, parcours utilisateur, maquettes, user stories, tests utilisateurs, décisions produit/design, points "TBD - UX"
**Ignore :** bugs, infra, déploiement, monitoring, runbooks techniques

---

## Format du briefing final

### 5 points résumé
Bullet points synthétiques sur l'essentiel des 4 sources croisées (Slack, Gmail, Calendrier, Confluence).

### 3 priorités du jour
Ce qu'Emilie doit traiter en premier, basé sur les réunions du jour + les sujets ouverts détectés.

### Points d'attention
- Conflits horaires dans l'agenda
- Events sans réponse (needsAction)
- Sujets urgents ou bloquants

### Signaux faibles
- Messages inhabituellement longs
- Sujets qui reviennent sans résolution d'une session à l'autre
- Actions attendues côté design non encore prises
- Liens partagés sans contexte écrit

---

## Contexte permanent

**Emilie Krasi** — UX Designer chez Leboncoin, équipes Connect, Adlife, Cognition
**Email Google :** `emilie.krasi@adevinta.com`
**Email Drive :** `emilie.krasi@leboncoin.fr`
**Projets :** Nouvelle notification vendeur · Nouvel inbox · Dépôt 1 clic
**Fichier Figma principal :** Unichat (`bahp6rY4H7gjoy8yrfF1AH`)
**Confluence :** FTCT (Contact) · ADCOG (Cognition) · LFA (LBC FT Ads)
**Token Confluence :** `NTIxMjg2OTc3NzQ2OnJx9BhiHmTgmB48CPgyDrIIAZIC`
