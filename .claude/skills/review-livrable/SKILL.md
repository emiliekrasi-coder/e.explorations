---
name: review-livrable
description: >-
  Soumet un livrable à trois agents-reviewers et consolide leurs retours.
  Utiliser avec le chemin du document en argument :
  /review-livrable path/to/livrable.md
user_invocable: true
allowed-tools:
  - Read
  - Agent
---

## Processus

1. Lis le livrable passé en argument ($ARGUMENTS)
2. Lis mon CLAUDE.md (contexte, stakeholders, projets en cours)
3. Phase 1 — Questionnement : pose-moi 5 questions de stakeholder
   exigeant. Attends mes réponses avant de continuer.
4. Phase 2 — Review : lance 3 agents en parallèle :
   - Agent `stakeholder` : clarté du problème, ROI, alignement
   - Agent `utilisateur` : vrai problème résolu, cas d'usage oubliés
5. Consolide les 3 retours en un rapport structuré

## Format de sortie

### Forces du livrable
- [force] — Pourquoi : [raisonnement]

### Points à améliorer (par priorité)
1. [point] — Perspective : [agent] — Suggestion : [amélioration]

### Questions non résolues
- [question] — Agent : [qui] — Impact si ignorée : [conséquence]

## Règles
- Commence toujours par le questionnement, jamais par le feedback
- Chaque critique a une suggestion d'amélioration
- Si c'est bon, dis-le
- Cite les passages précis du livrable