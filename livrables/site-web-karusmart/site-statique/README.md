# KARUSMART — site statique

Site vitrine institutionnel pour la micro-ferme expérimentale KARUSMART (INRAE, Guadeloupe). HTML/CSS/JS classique, sans dépendance à Claude Design, page unique (`index.html`).

## Structure

```
index.html            page unique (hero, projet, ferme, partenaires, visiter, contact)
assets/
  style.css            classes réutilisables (boutons, cartes, formulaire)
  contact.js           logique du formulaire de contact
```

## Contenu à valider avant publication

Le contenu texte a été assemblé à partir d'une recherche web (pages publiques INRAE et ADEME sur le dispositif KARUSMART), pas de données internes. Tout est marqué **[à compléter]** ou signalé ici :

- [ ] Chiffres scientifiques (bilan carbone, biodiversité, rendement) — actuellement `[résultat à compléter]`
- [ ] Adresse complète du site et contact référent (section "Visiter, se former, collaborer" et footer)
- [ ] Adresse e-mail de contact réelle (actuellement `contact@karusmart.fr`, à remplacer dans `assets/contact.js`)
- [ ] Logos officiels ADEME / FEDER Guadeloupe / INRAE / UE PTEA (actuellement des blocs "LOGO" grisés)
- [x] Photo hero (vue aérienne des parcelles) intégrée
- [ ] Photo réelle de la haie multifonctionnelle à la place de la zone hachurée "[photo à remplacer]"
- [x] Statut de la certification AB : confirmé obtenue en 2018
- [ ] Schéma des blocs de cultures : remplacer par le plan parcellaire réel si disponible

## Le formulaire de contact

Site 100% statique : au clic sur « Envoyer la demande », le formulaire ouvre le client de messagerie du visiteur avec un message pré-rempli (voir `assets/contact.js`).

**Alternative si hébergement Netlify** : Netlify Forms capte les formulaires sans code supplémentaire (`data-netlify="true"` sur la balise `<form>`).

**Alternative universelle** : [Formspree](https://formspree.io) (gratuit jusqu'à 50 messages/mois).

## Publier le site en ligne

- **Netlify** (gratuit) : glisser-déposer le dossier `site-statique/` sur [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages** (gratuit) : pousser ce dossier dans un dépôt GitHub, activer Pages
- **Hébergeur INRAE / classique** : envoyer le contenu du dossier par FTP

Aucun build serveur nécessaire : fichiers HTML/CSS/JS prêts à servir tels quels.
