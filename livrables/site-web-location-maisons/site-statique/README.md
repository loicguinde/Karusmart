# Kaz Alizé — site statique

Site HTML/CSS/JS classique, sans dépendance à Claude Design. Fonctionne dans n'importe quel navigateur, en local ou une fois hébergé.

## Structure

```
index.html            page d'accueil
contact.html           page contact (formulaire)
maisons/
  flamboyant.html
  zephyr.html
  bananier.html
  caravelle.html
  colibri.html
assets/
  style.css            toute la mise en forme
  contact.js            logique du formulaire de contact
build.js               script qui génère toutes les pages ci-dessus
```

## Modifier le contenu

Tout le texte (noms des maisons, descriptions, tarifs, équipements, téléphone, e-mail) est dans **build.js**, dans le tableau `HOUSES` et les constantes en haut du fichier. Modifier là, puis relancer :

```
node build.js
```

Ça régénère toutes les pages HTML à l'identique. Ne pas éditer `index.html` ou `maisons/*.html` à la main si on compte relancer le script un jour — les modifications seraient écrasées. Si vous préférez éditer le HTML directement à la main sans passer par le script, c'est possible aussi : dans ce cas, oubliez `build.js`.

## Remplacer les photos

Chaque encadré grisé avec un texte du type « PHOTO — Villa Flamboyant (paysage, 1600×1200) » est un espace réservé. Pour le remplacer par une vraie photo :

1. Placer vos images dans un dossier `assets/photos/` (à créer)
2. Dans le fichier HTML concerné (ou dans `build.js` si vous régénérez), remplacer le `<div class="photo-ph">...</div>` par une balise `<img src="assets/photos/nom-du-fichier.jpg" alt="...">`

## Le formulaire de contact

Le site est 100% statique (pas de serveur), donc le formulaire ne peut pas envoyer d'e-mail tout seul. Au clic sur « Envoyer la demande », il ouvre le client de messagerie du visiteur (Outlook, Gmail, etc.) avec un message pré-rempli à partir des champs saisis.

C'est fiable et ne coûte rien, mais ça demande que le visiteur ait un client mail configuré sur son appareil (ce qui n'est pas toujours le cas sur mobile).

**Alternative recommandée si vous hébergez sur Netlify** : Netlify Forms capte les formulaires sans aucun code supplémentaire, il suffit d'ajouter `data-netlify="true"` sur la balise `<form>`. Dites-le-moi si vous choisissez cet hébergement, je l'active.

**Alternative universelle** : un service comme [Formspree](https://formspree.io) (gratuit jusqu'à 50 messages/mois) — il suffit de changer l'action du formulaire vers l'URL qu'ils fournissent.

## Publier le site en ligne

Options simples, du plus facile au plus flexible :

- **Netlify** (gratuit) : glisser-déposer le dossier `site-statique/` sur [app.netlify.com/drop](https://app.netlify.com/drop) — en ligne en 30 secondes
- **GitHub Pages** (gratuit) : pousser ce dossier dans un dépôt GitHub, activer Pages dans les réglages
- **Hébergeur classique** (OVH, o2switch, etc.) : envoyer le contenu du dossier par FTP dans le répertoire web

Dans tous les cas, aucune étape de build côté serveur n'est nécessaire : ce sont des fichiers HTML/CSS/JS prêts à servir tels quels.

## Avant publication

- [ ] Relire tous les textes (ils sont volontairement détaillés mais fictifs par endroits — tarifs, adresses exactes, SIRET à vérifier)
- [ ] Remplacer les photos placeholder par les vraies photos des maisons
- [ ] Décider d'un nom de domaine et le brancher sur l'hébergeur choisi
- [ ] Tester le formulaire de contact sur mobile et desktop
