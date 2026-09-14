# /commit

> Commande pour committer proprement les changements du workspace dans git.

---

## Mission

Quand je lance `/commit`, exécute la séquence suivante :

### Étape 0 : Vérifier que le dépôt git existe

- Si `git status` échoue (pas de dépôt), préviens-moi et demande si je veux que tu lances `git init` avant de continuer. Ne l'initialise pas sans mon accord.

### Étape 1 : État des lieux

- Lance `git status` et `git diff` pour voir ce qui a changé (fichiers modifiés, ajoutés, supprimés)
- Vérifie qu'aucun fichier sensible n'est sur le point d'être commité (notamment tout ce qui est dans `secrets/` hors `.env.example` et `.gitignore` — normalement déjà exclu par le `.gitignore` du dossier)

### Étape 2 : Proposer le message de commit

- Résume les changements en un message de commit clair, en français, au format court :
  ```
  [Résumé court à l'impératif]

  - [Détail 1 si pertinent]
  - [Détail 2 si pertinent]
  ```
- Présente-moi le message et la liste des fichiers concernés avant de committer

### Étape 3 : Committer

Une fois validé :
1. `git add` sur les fichiers concernés (jamais `git add .` aveugle si des fichiers non pertinents traînent)
2. `git commit -m "..."` avec le message validé
3. Confirme le commit (hash court + résumé)

---

## Règles importantes

- Ne jamais committer sans validation explicite du message
- Ne jamais committer de fichier dans `secrets/` autre que `.env.example` et `.gitignore`
- Ne jamais push automatiquement, sauf si je le demande explicitement
- Pas de tirets longs (em dashes) dans les messages de commit
- Communication en français systématique
