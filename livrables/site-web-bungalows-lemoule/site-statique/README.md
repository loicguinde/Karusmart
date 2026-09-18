# Tortue Marine — site statique

Site vitrine pour la location de 3 bungalows meublés à l'Autre Bord, Le Moule (Guadeloupe). HTML/CSS/JS classique, sans dépendance à Claude Design, page unique (`index.html`).

Implémenté à partir du prototype exporté de Claude Design (`Tortue Marine.dc.html`), en respectant sa structure et son système visuel "Classical" (Cormorant Garamond + Lora, boutons contourés, tons chauds près du blanc, accent ocre/or).

## Structure

```
index.html            page unique (hero, atouts, logements, emplacement, tarifs, contact)
assets/
  style.css            tokens et classes réutilisables (boutons, plates, formulaire)
  contact.js           logique du formulaire de contact
```

## Contenu à compléter avant publication

- [ ] Remplacer les zones "PHOTO —" par les vraies photos des 3 bungalows (extérieur, chambre/pièce de vie, jardin, terrasse)
- [ ] Remplacer le schéma d'emplacement indicatif par une vraie carte si besoin
- [ ] Ajouter les tarifs si un jour vous décidez de les afficher (actuellement volontairement absents, sur demande)

## Le formulaire de contact

Site 100% statique : au clic sur « Envoyer ma demande », le formulaire ouvre le client de messagerie du visiteur avec un message pré-rempli, adressé à marine_dagorne@yahoo.fr (voir `assets/contact.js`).

**Alternative si hébergement Netlify** : Netlify Forms capte les formulaires sans code supplémentaire (`data-netlify="true"` sur la balise `<form>`).

**Alternative universelle** : [Formspree](https://formspree.io) (gratuit jusqu'à 50 messages/mois).

## Publier le site en ligne

- **Netlify** (gratuit) : glisser-déposer le dossier `site-statique/` sur [app.netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages** (gratuit) : pousser ce dossier dans un dépôt GitHub, activer Pages

Aucun build serveur nécessaire : fichiers HTML/CSS/JS prêts à servir tels quels.
