// Générateur du site statique "Kaz Alizé — Locations Guadeloupe".
// Usage : node build.js
// Régénère toutes les pages HTML à partir des données ci-dessous.
// Modifier le contenu (textes, tarifs, équipements) se fait ICI, puis on relance le script.

const fs = require('fs');
const path = require('path');

const SITE_NAME = 'Kaz Alizé — Locations Guadeloupe';
const PHONE = '+590 690 00 00 00';
const EMAIL = 'bonjour@kazalize.gp';
const TEL_HREF = 'tel:' + PHONE.replace(/[^+0-9]/g, '');
const WA_HREF = 'https://wa.me/' + PHONE.replace(/[^0-9]/g, '');
const MAIL_HREF = 'mailto:' + EMAIL;
const SHOW_PRICES = true;

const HOUSES = [
  {
    id: 'flamboyant',
    name: 'Villa Flamboyant',
    place: 'Sainte-Anne — Grande-Terre',
    blurb: "Une longue maison basse posée sur un jardin de flamboyants, à huit minutes à pied du sable blanc de la Caravelle.",
    summary: '4 chambres · 8 voyageurs · piscine · vue mer',
    desc1: "Les pièces s'ouvrent l'une après l'autre sur une galerie couverte qui fait tout le côté sud : c'est là qu'on prend le petit-déjeuner, qu'on lit à l'ombre à midi et qu'on dîne le soir quand l'air retombe. La cuisine, entièrement équipée, donne sur la même terrasse par un grand passe-plat.",
    desc2: "Quatre chambres, toutes climatisées, chacune avec sa moustiquaire et son ventilateur de plafond. La piscine, longue de douze mètres, est éclairée le soir ; un carbet de jardin abrite le barbecue et une table de huit couverts.",
    location: "À Sainte-Anne, quartier résidentiel calme au-dessus du bourg. Plage de la Caravelle à 800 m, marché de Sainte-Anne à 2 km, aéroport Pôle Caraïbes à 35 minutes. Localisation exacte communiquée à la réservation.",
    price: 'À partir de 240 € la nuit — 7 nuits minimum en haute saison.',
    specs: [
      { label: 'Chambres', value: '4' },
      { label: 'Capacité', value: '8 voyageurs' },
      { label: 'Salles de bain', value: '3' },
      { label: 'Piscine', value: 'Privée, 12 m' },
      { label: 'Vue', value: 'Mer et jardin' },
      { label: 'Climatisation', value: 'Toutes les chambres' },
      { label: 'Wifi', value: 'Fibre' },
      { label: 'Extérieur', value: 'Galerie, carbet, barbecue' },
      { label: 'Parking', value: '2 voitures, clos' }
    ]
  },
  {
    id: 'zephyr',
    name: 'Villa Zéphyr',
    place: 'Le Gosier — Grande-Terre',
    blurb: "Un plain-pied contemporain au-dessus de la baie, pensé pour deux familles qui veulent rester ensemble sans se marcher dessus.",
    summary: '5 chambres · 10 voyageurs · piscine à débordement',
    desc1: "Deux ailes séparées par un vaste séjour traversant : chacune a ses chambres, sa salle d'eau et son coin salon, et tout le monde se retrouve autour de la grande table et de la piscine à débordement qui prend toute la vue sur l'îlet du Gosier.",
    desc2: "Le séjour s'ouvre en entier par des baies coulissantes ; la cuisine américaine est équipée pour dix couverts. Buanderie indépendante avec lave-linge et sèche-linge, ce qui change tout au bout de dix jours de plage.",
    location: "Hauteurs du Gosier, à 5 minutes en voiture des plages de la Datcha et de l'anse Tabarin, 15 minutes de Pointe-à-Pitre. Commerces et restaurants du bourg à 1,5 km.",
    price: 'À partir de 310 € la nuit — 7 nuits minimum en haute saison.',
    specs: [
      { label: 'Chambres', value: '5' },
      { label: 'Capacité', value: '10 voyageurs' },
      { label: 'Salles de bain', value: '4' },
      { label: 'Piscine', value: 'À débordement' },
      { label: 'Vue', value: 'Baie et îlet' },
      { label: 'Climatisation', value: 'Toutes les pièces' },
      { label: 'Wifi', value: 'Fibre' },
      { label: 'Extérieur', value: 'Deck, transats, douche' },
      { label: 'Parking', value: '3 voitures' }
    ]
  },
  {
    id: 'bananier',
    name: 'Kaz Bananier',
    place: 'Deshaies — Basse-Terre',
    blurb: "Une case créole en bois, restaurée pièce par pièce, au milieu d'un jardin planté de bananiers et de balisiers.",
    summary: '3 chambres · 6 voyageurs · jardin tropical · rivière',
    desc1: "Bardage en bois peint, persiennes, toit de tôle sous les arbres : la maison a gardé ses volumes d'origine et sa véranda sur trois côtés. À l'intérieur, tout a été refait — cuisine complète, salle d'eau carrelée, literie neuve.",
    desc2: "Le jardin descend vers une rivière où l'on peut se baigner. Pas de piscine ici, et c'est délibéré : la maison est faite pour ceux qui viennent pour la forêt, les cascades et le parc national plutôt que pour le lagon.",
    location: "Sur les hauteurs de Deshaies, à 10 minutes de la plage de Grande Anse et du Jardin botanique, à 30 minutes des chutes du Carbet par la Traversée.",
    price: 'À partir de 165 € la nuit — 5 nuits minimum.',
    specs: [
      { label: 'Chambres', value: '3' },
      { label: 'Capacité', value: '6 voyageurs' },
      { label: 'Salles de bain', value: '2' },
      { label: 'Piscine', value: 'Non — rivière au jardin' },
      { label: 'Vue', value: 'Jardin tropical' },
      { label: 'Climatisation', value: '2 chambres' },
      { label: 'Wifi', value: 'Oui' },
      { label: 'Extérieur', value: 'Véranda, hamacs, potager' },
      { label: 'Parking', value: '2 voitures' }
    ]
  },
  {
    id: 'caravelle',
    name: 'Villa Caravelle',
    place: 'Saint-François — Grande-Terre',
    blurb: "Les pieds dans le lagon : une maison d'architecte ouverte plein ouest, pour les couchers de soleil et les départs en kayak.",
    summary: '2 chambres · 4 voyageurs · accès direct lagon',
    desc1: "Plus petite et plus précieuse que les autres : deux chambres seulement, un séjour tout en bois clair et une terrasse qui avance sur l'eau. Le lagon, ici, a soixante centimètres de fond sur trois cents mètres — on y marche, on y nage, on y dort presque.",
    desc2: "Kayaks et paddle fournis. La marina, le golf et les restaurants de Saint-François sont à quelques minutes ; les plages sauvages de la Pointe des Châteaux à un quart d'heure de route.",
    location: "Pointe des Basses, Saint-François, accès privé au lagon. Marina à 3 km, aéroport à 45 minutes.",
    price: 'À partir de 220 € la nuit — 5 nuits minimum.',
    specs: [
      { label: 'Chambres', value: '2' },
      { label: 'Capacité', value: '4 voyageurs' },
      { label: 'Salles de bain', value: '2' },
      { label: 'Piscine', value: 'Non — lagon privé' },
      { label: 'Vue', value: 'Mer, plein ouest' },
      { label: 'Climatisation', value: 'Toutes les chambres' },
      { label: 'Wifi', value: 'Fibre' },
      { label: 'Extérieur', value: 'Ponton, kayaks, paddle' },
      { label: 'Parking', value: '2 voitures' }
    ]
  },
  {
    id: 'colibri',
    name: 'Case Colibri',
    place: 'Capesterre — Marie-Galante',
    blurb: "Sur l'île aux cent moulins, une case blanche à cinq minutes de Feuillère, la plus longue plage de l'archipel.",
    summary: '3 chambres · 6 voyageurs · piscine · plage à 400 m',
    desc1: "Marie-Galante impose son rythme : les cabris sur la route, le rhum agricole, les plages vides en semaine. La maison suit le mouvement — murs blancs, sols en tomettes, larges ouvertures et une piscine entourée de cocotiers.",
    desc2: "Trois chambres dont une en rez-de-jardin avec son entrée indépendante. Vélos à disposition pour faire le tour des distilleries et des moulins, et une cuisine d'été pour les poissons du matin.",
    location: "Capesterre-de-Marie-Galante, à 400 m de la plage de la Feuillère. Traversée en bateau depuis Pointe-à-Pitre (45 min) ; véhicule conseillé sur l'île.",
    price: 'À partir de 180 € la nuit — 5 nuits minimum.',
    specs: [
      { label: 'Chambres', value: '3' },
      { label: 'Capacité', value: '6 voyageurs' },
      { label: 'Salles de bain', value: '2' },
      { label: 'Piscine', value: 'Privée, 8 m' },
      { label: 'Vue', value: 'Jardin et cocotiers' },
      { label: 'Climatisation', value: 'Toutes les chambres' },
      { label: 'Wifi', value: 'Oui' },
      { label: 'Extérieur', value: "Cuisine d'été, vélos" },
      { label: 'Parking', value: '2 voitures' }
    ]
  }
];

// ── Helpers ──────────────────────────────────────────────────────────────

function ph(label, ratio) {
  return `<div class="photo-ph" style="aspect-ratio:${ratio};"><span>${label}</span></div>`;
}

function nav(prefix, active) {
  const item = (href, label, key) =>
    `<a href="${href}"${active === key ? ' aria-current="page"' : ''}>${label}</a>`;
  return `
  <nav class="nav">
    <a class="nav-brand" href="${prefix}index.html">${SITE_NAME}</a>
    ${item(prefix + 'index.html', 'Accueil', 'home')}
    ${item(prefix + 'index.html#maisons', 'Les maisons', 'houses')}
    ${item(prefix + 'contact.html', 'Contact', 'contact')}
    <a class="btn btn-primary" href="${prefix}contact.html">Nous écrire</a>
  </nav>`;
}

function footer(prefix) {
  return `
  <footer class="site-footer">
    <div class="footer-grid">
      <div>
        <p class="footer-brand">${SITE_NAME}</p>
        <p>Locations saisonnières en Guadeloupe — Grande-Terre, Basse-Terre, Marie-Galante.</p>
      </div>
      <div>
        <p>Mentions légales</p>
        <p>Conditions de location</p>
        <p>Politique de confidentialité</p>
        <p>SIRET à compléter — taxe de séjour incluse</p>
      </div>
      <div>
        <p><a href="${TEL_HREF}">${PHONE}</a></p>
        <p><a href="${MAIL_HREF}">${EMAIL}</a></p>
        <p><a href="${WA_HREF}">WhatsApp</a></p>
      </div>
      <div>
        <p><a href="#">Instagram</a></p>
        <p><a href="#">Facebook</a></p>
        <p>© 2026 — tous droits réservés</p>
      </div>
    </div>
  </footer>`;
}

function page(prefix, title, active, body) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${SITE_NAME} — cinq maisons de vacances en Guadeloupe, contact direct avec le propriétaire.">
<link rel="stylesheet" href="${prefix}assets/style.css">
</head>
<body>
${nav(prefix, active)}
${body}
${footer(prefix)}
</body>
</html>
`;
}

function houseCard(h) {
  return `
        <article class="card house-card">
          ${ph('PHOTO — ' + h.name + ' (paysage, 1600×1200)', '4/3')}
          <div class="house-card-body">
            <span class="card-kicker">${h.place}</span>
            <h3 class="card-title">${h.name}</h3>
            <p class="card-body">${h.blurb}</p>
            <p class="card-meta">${h.summary}</p>
            <a class="btn btn-primary" href="maisons/${h.id}.html">Découvrir</a>
          </div>
        </article>`;
}

function specsTable(specs) {
  return `
          <table class="table">
            <tbody>
              ${specs.map(s => `<tr><td class="spec-label">${s.label}</td><td class="spec-value">${s.value}</td></tr>`).join('\n              ')}
            </tbody>
          </table>`;
}

function buildIndex() {
  const body = `
  <section class="hero">
    <span class="kicker">Cinq maisons — Guadeloupe</span>
    <h1>Des maisons ouvertes<br>sur les alizés.</h1>
    <p class="lead">Cinq maisons de vacances en Guadeloupe, de Deshaies à Saint-François, tenues par une même famille. Pas de réservation automatique&nbsp;: vous écrivez, nous répondons, et nous préparons la maison pour vous.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="#maisons">Voir les maisons</a>
      <a class="btn btn-ghost" href="contact.html">Demander une disponibilité</a>
    </div>
  </section>

  <section class="section">
    ${ph("PHOTO D'AMBIANCE — vue mer / végétation tropicale (paysage, 2400×1200 min)", '2/1')}
    <p class="caption">Anse tranquille, côte sous le vent — remplacez cette photo par la vôtre.</p>
  </section>

  <section class="section">
    <hr class="hr">
    <div class="features-grid">
      <div>
        <h2>Cinq maisons, cinq îles</h2>
        <p class="justify">Grande-Terre pour les lagons et les plages blanches, Basse-Terre pour la forêt et les rivières, Marie-Galante pour le temps qui ralentit. Chaque maison a été choisie pour un usage précis, pas pour remplir un catalogue.</p>
      </div>
      <div>
        <h2>Tenues à la main</h2>
        <p class="justify">Ménage complet avant chaque arrivée, linge de maison fourni, accueil sur place avec les clés et les bonnes adresses du coin. Un numéro unique pendant tout le séjour.</p>
      </div>
      <div>
        <h2>Sans intermédiaire</h2>
        <p class="justify">Vous traitez directement avec le propriétaire&nbsp;: pas de commission de plateforme, des dates discutables et un séjour qu'on peut adapter à votre famille.</p>
      </div>
    </div>
  </section>

  <section class="section" id="maisons">
    <hr class="hr">
    <span class="kicker">Les maisons</span>
    <h2 class="section-title">Choisissez votre côte.</h2>
    <div class="houses-grid">
      ${HOUSES.map(houseCard).join('\n')}
    </div>
  </section>

  <section class="section section-end">
    <hr class="hr">
    <h2>Une date en tête&nbsp;?</h2>
    <p class="lead-sm">Dites-nous vos dates et le nombre de voyageurs&nbsp;: nous vous répondons sous 24&nbsp;heures avec les maisons libres et leur tarif.</p>
    <div class="cta-row">
      <a class="btn btn-primary" href="contact.html">Formulaire de contact</a>
      <a class="btn btn-ghost" href="${WA_HREF}">WhatsApp</a>
    </div>
  </section>`;
  return page('', "Kaz Alizé — Locations Guadeloupe", 'home', body);
}

function buildHouse(h) {
  const others = HOUSES.filter(o => o.id !== h.id);
  const body = `
  <section class="section section-top">
    <a class="back-link" href="../index.html#maisons">← Toutes les maisons</a>
    <span class="kicker kicker-tight">${h.place}</span>
    <h1>${h.name}</h1>
    <p class="lead">${h.blurb}</p>
  </section>

  <section class="section">
    ${ph('PHOTO PRINCIPALE — ' + h.name + ' (paysage, 2000×1000 min)', '2/1')}
    <div class="gallery-grid">
      ${ph('Galerie 1 — séjour / terrasse', '4/3')}
      ${ph('Galerie 2 — chambre', '4/3')}
      ${ph('Galerie 3 — extérieur / piscine', '4/3')}
    </div>
  </section>

  <section class="section">
    <hr class="hr">
    <div class="house-detail-grid">
      <div>
        <h2>La maison</h2>
        <p class="justify">${h.desc1}</p>
        <p class="justify">${h.desc2}</p>
        <h3 class="sub">Situation</h3>
        <p>${h.location}</p>
      </div>
      <aside>
        <h3 class="sub">Équipements</h3>
        ${specsTable(h.specs)}
        ${SHOW_PRICES ? `<p class="price">${h.price}</p>` : ''}
        <a class="btn btn-primary btn-block" href="../contact.html?maison=${encodeURIComponent(h.name)}">Demander la disponibilité</a>
        <p class="fine-print">Réponse sous 24&nbsp;h — ou par WhatsApp au ${PHONE}.</p>
      </aside>
    </div>
  </section>

  <section class="section section-end">
    <hr class="hr">
    <span class="kicker">Les autres maisons</span>
    <div class="others-grid">
      ${others.map(o => `
      <div class="other-house">
        <a href="${o.id}.html">${o.name}</a>
        <p>${o.place}</p>
      </div>`).join('')}
    </div>
  </section>`;
  return page('../', `${h.name} — ${SITE_NAME}`, 'houses', body);
}

function buildContact() {
  const body = `
  <section class="section section-top">
    <span class="kicker">Contact</span>
    <h1>Écrivez-nous.</h1>
    <p class="lead">Dites-nous vos dates, le nombre de voyageurs et la maison qui vous attire. Nous répondons personnellement, sous 24&nbsp;heures.</p>
  </section>

  <section class="section section-end">
    <hr class="hr">
    <div class="contact-grid">
      <div>
        <div id="contact-success" class="card" style="padding:32px; display:none;">
          <h2>Message prêt.</h2>
          <p>Votre messagerie va s'ouvrir avec votre demande pré-remplie. Il ne reste qu'à cliquer sur envoyer.</p>
        </div>
        <form id="contact-form">
          <div class="form-grid">
            <div class="field">
              <label for="kz-nom">Nom et prénom</label>
              <input class="input" id="kz-nom" name="nom" type="text" required placeholder="Marie Lambert">
            </div>
            <div class="field">
              <label for="kz-email">E-mail</label>
              <input class="input" id="kz-email" name="email" type="email" required placeholder="marie@exemple.fr">
            </div>
            <div class="field">
              <label for="kz-tel">Téléphone</label>
              <input class="input" id="kz-tel" name="tel" type="tel" placeholder="+33 6 12 34 56 78">
            </div>
            <div class="field">
              <label for="kz-pers">Voyageurs</label>
              <input class="input" id="kz-pers" name="pers" type="number" min="1" max="20" placeholder="4">
            </div>
            <div class="field">
              <label for="kz-arr">Arrivée souhaitée</label>
              <input class="input" id="kz-arr" name="arrivee" type="date">
            </div>
            <div class="field">
              <label for="kz-dep">Départ souhaité</label>
              <input class="input" id="kz-dep" name="depart" type="date">
            </div>
          </div>
          <div class="field" style="margin-top:22px;">
            <label for="kz-msg">Votre message</label>
            <textarea class="input" id="kz-msg" name="message" rows="6" placeholder="La maison qui vous intéresse, vos dates, vos questions…"></textarea>
          </div>
          <div class="cta-row" style="align-items:center; margin-top:26px;">
            <button type="submit" class="btn btn-primary">Envoyer la demande</button>
            <span class="fine-print">Aucune réservation en ligne — nous confirmons par e-mail.</span>
          </div>
        </form>
      </div>

      <aside>
        <h2>En direct</h2>
        <div class="contact-list">
          <div class="contact-item">
            <p class="contact-label">Téléphone</p>
            <a href="${TEL_HREF}">${PHONE}</a>
          </div>
          <div class="contact-item">
            <p class="contact-label">WhatsApp</p>
            <a href="${WA_HREF}">Ouvrir la conversation</a>
          </div>
          <div class="contact-item">
            <p class="contact-label">E-mail</p>
            <a href="${MAIL_HREF}">${EMAIL}</a>
          </div>
          <div class="contact-item">
            <p class="contact-label">Sur place</p>
            <p>Accueil et remise des clés à la maison, 7&nbsp;j/7, de 8&nbsp;h à 20&nbsp;h (heure locale, UTC−4).</p>
          </div>
        </div>
      </aside>
    </div>
  </section>

  <script src="../assets/contact.js"></script>`;
  return page('', `Contact — ${SITE_NAME}`, 'contact', body).replace('../assets/contact.js', 'assets/contact.js');
}

// ── CSS ──────────────────────────────────────────────────────────────────

const CSS = `/* Kaz Alizé — feuille de style du site statique (dérivée du design system "Classical") */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=Lora:wght@400;600&display=swap');

:root {
  --color-bg: #f3f2f2;
  --color-surface: #eae9e9;
  --color-text: #201f1d;
  --color-accent: #b68235;
  --color-accent-700: #7d5411;
  --color-divider: color-mix(in srgb, #201f1d 16%, transparent);
  --font-heading: "Cormorant Garamond", system-ui, sans-serif;
  --font-heading-weight: 600;
  --font-body: "Lora", system-ui, sans-serif;
  --space-2: 9px;
  --space-3: 14px;
  --space-4: 18px;
  --radius-md: 4px;
  --max-w: 1200px;
  --side: clamp(20px, 5vw, 72px);
}

*, *::before, *::after { box-sizing: border-box; }
html { color-scheme: light; }
body {
  margin: 0; background: var(--color-bg); color: var(--color-text);
  font-family: var(--font-body); font-size: 15px; line-height: 1.55;
  text-wrap: pretty;
}
h1, h2, h3 { font-family: var(--font-heading); font-weight: var(--font-heading-weight); line-height: 1.12; letter-spacing: -0.015em; margin: 0 0 var(--space-2); }
h1 { font-size: clamp(40px, 6vw, 80px); letter-spacing: -0.01em; margin: 0; }
h2 { font-size: clamp(28px, 3.6vw, 40px); }
h3.sub { font-size: 22px; margin: 32px 0 16px; }
p { margin: 0 0 var(--space-3); }
a { color: var(--color-accent-700); text-decoration: none; }
a:hover { color: var(--color-accent); }
img { display: block; max-width: 100%; }

.section { max-width: var(--max-w); margin: 0 auto; padding: 56px var(--side) 0; }
.section-top { padding-top: 72px; }
.section-end { padding-bottom: 96px; }
.hr { height: 1px; border: 0; margin: 0 0 40px; background: var(--color-divider); }
.kicker { display: block; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-accent-700); margin: 0 0 14px; }
.kicker-tight { margin: 34px 0 14px; }
.lead { font-size: 17px; line-height: 28px; max-width: 58ch; margin: 20px 0 0; color: color-mix(in srgb, var(--color-text) 82%, transparent); }
.lead-sm { font-size: 15.5px; line-height: 28px; max-width: 58ch; margin: 18px 0 0; color: color-mix(in srgb, var(--color-text) 78%, transparent); }
.caption { font-size: 13px; letter-spacing: 0.02em; color: color-mix(in srgb, var(--color-text) 62%, transparent); margin: 12px 0 0; }
.justify { text-align: justify; hyphens: auto; font-size: 15.5px; line-height: 28px; color: color-mix(in srgb, var(--color-text) 82%, transparent); }
@media (max-width: 720px) { .justify { text-align: left; } }
.fine-print { font-size: 13px; line-height: 24px; color: color-mix(in srgb, var(--color-text) 62%, transparent); margin: 14px 0 0; }
.price { font-size: 15.5px; margin: 20px 0 0; color: color-mix(in srgb, var(--color-text) 78%, transparent); }

.hero { max-width: var(--max-w); margin: 0 auto; padding: 84px var(--side) 0; }

.cta-row { display: flex; gap: var(--space-3); flex-wrap: wrap; margin-top: 28px; }

.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  cursor: pointer; text-decoration: none; font-family: var(--font-heading);
  font-weight: var(--font-heading-weight); font-size: 14px;
  background: transparent; border: 1px solid transparent;
  padding: 9px 17px; border-radius: var(--radius-md);
}
.btn-primary { color: var(--color-accent); border-color: var(--color-accent); }
.btn-primary:hover { background: color-mix(in srgb, var(--color-accent) 12%, transparent); color: var(--color-accent); }
.btn-ghost { color: var(--color-accent); padding-inline: 4px; }
.btn-ghost:hover { background: color-mix(in srgb, var(--color-accent) 10%, transparent); color: var(--color-accent); }
.btn-block { width: 100%; margin-top: var(--space-2); }

.nav {
  display: flex; align-items: center; gap: 18px; flex-wrap: wrap;
  position: sticky; top: 0; z-index: 20; background: var(--color-bg);
  padding: 14px var(--side); border-bottom: 1px solid var(--color-divider);
}
.nav-brand { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 18px; margin-right: auto; color: var(--color-text); }
.nav a:not(.btn) { font-size: 14px; color: var(--color-text); }
.nav a:not(.btn):hover, .nav a[aria-current='page'] { color: var(--color-accent); }

.photo-ph {
  width: 100%; display: flex; align-items: center; justify-content: center; text-align: center;
  background: color-mix(in srgb, var(--color-text) 6%, transparent);
  border: 6px solid var(--color-surface); outline: 1px dashed color-mix(in srgb, var(--color-text) 35%, transparent);
  outline-offset: -6px; box-sizing: border-box; padding: 16px;
}
.photo-ph span { font-size: 12px; letter-spacing: 0.03em; color: color-mix(in srgb, var(--color-text) 55%, transparent); max-width: 32ch; }

.features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 28px 48px; }

.houses-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 44px 36px; margin-top: 48px; }
.card {
  display: flex; flex-direction: column; padding: 0; overflow: hidden;
  border-radius: var(--radius-md); border: 1px solid var(--color-divider); background: transparent;
}
.house-card-body { display: flex; flex-direction: column; flex: 1; padding: 24px 24px 26px; }
.card-kicker { font-size: 10px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-accent); }
.card-title { font-family: var(--font-heading); font-weight: var(--font-heading-weight); font-size: 26px; line-height: 1.15; margin: 8px 0 0; }
.card-body { margin: 12px 0 0; line-height: 26px; font-size: 14px; opacity: 0.85; flex: 1; }
.card-meta { margin: 16px 0 12px; font-size: 12px; color: color-mix(in srgb, var(--color-text) 55%, transparent); }
.house-card .btn { align-self: flex-start; margin-top: 6px; }

.gallery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; margin-top: 16px; }
.gallery-grid .photo-ph { height: 180px; }
.section > .photo-ph { height: clamp(240px, 46vh, 500px); }

.house-detail-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 28px clamp(28px, 6vw, 88px); }
@media (max-width: 820px) { .house-detail-grid { grid-template-columns: 1fr; } }

.table { width: 100%; border-collapse: collapse; font-size: 14px; }
.spec-label { font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: color-mix(in srgb, var(--color-text) 62%, transparent); padding: 9px 0; border-bottom: 1px solid var(--color-divider); white-space: nowrap; }
.spec-value { font-size: 15.5px; text-align: right; padding: 9px 0; border-bottom: 1px solid var(--color-divider); }

.others-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px 32px; }
.other-house { border-top: 1px solid var(--color-divider); padding-top: 16px; }
.other-house a { font-family: var(--font-heading); font-size: 22px; color: var(--color-text); }
.other-house p { font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; margin: 6px 0 0; color: color-mix(in srgb, var(--color-text) 62%, transparent); }

.back-link { display: inline-block; font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; }

.contact-grid { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 4fr); gap: 40px clamp(28px, 6vw, 88px); }
@media (max-width: 820px) { .contact-grid { grid-template-columns: 1fr; } }
.form-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 22px 28px; }
.field label { display: block; font-size: 12px; margin-bottom: 5px; color: color-mix(in srgb, var(--color-text) 70%, transparent); }
.input {
  width: 100%; min-height: 36px; padding: 8px 10px; font: inherit; font-size: 14px;
  color: var(--color-text); background: transparent; border: 1px solid var(--color-divider);
  border-radius: var(--radius-md);
}
.input:focus-visible { outline: none; border-color: var(--color-accent); }
textarea.input { min-height: 110px; resize: vertical; }
.contact-list { display: flex; flex-direction: column; gap: 18px; }
.contact-item { border-top: 1px solid var(--color-divider); padding-top: 14px; }
.contact-label { font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0 0 6px; color: color-mix(in srgb, var(--color-text) 62%, transparent); }

.site-footer { border-top: 1px solid var(--color-divider); }
.footer-grid {
  max-width: var(--max-w); margin: 0 auto; padding: 40px var(--side) 56px;
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 24px 48px;
  font-size: 13px; line-height: 24px; color: color-mix(in srgb, var(--color-text) 66%, transparent);
}
.footer-grid p { margin: 0; }
.footer-brand { font-family: var(--font-heading); font-size: 20px; margin: 0 0 8px !important; color: var(--color-text); }
`;

// ── contact.js : construit un mailto: pré-rempli (site 100% statique, sans backend) ──

const CONTACT_JS = `// Site statique sans serveur : le formulaire construit un e-mail pré-rempli
// et ouvre le client de messagerie du visiteur. Pour un vrai envoi silencieux
// depuis le navigateur, brancher un service comme Formspree ou Netlify Forms
// (voir README.md).
(function () {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('contact-success');
  if (!form) return;

  const params = new URLSearchParams(location.search);
  const maison = params.get('maison');
  if (maison) {
    const msg = document.getElementById('kz-msg');
    if (msg) msg.value = 'Bonjour, je souhaite connaître les disponibilités de ' + maison + ' pour les dates suivantes : ';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Nom : ' + (data.get('nom') || ''),
      'E-mail : ' + (data.get('email') || ''),
      'Téléphone : ' + (data.get('tel') || ''),
      'Voyageurs : ' + (data.get('pers') || ''),
      'Arrivée souhaitée : ' + (data.get('arrivee') || ''),
      'Départ souhaité : ' + (data.get('depart') || ''),
      '',
      data.get('message') || ''
    ];
    const subject = encodeURIComponent('Demande de disponibilité — ' + (data.get('nom') || 'site web'));
    const body = encodeURIComponent(lines.join('\\n'));
    window.location.href = 'mailto:${EMAIL}?subject=' + subject + '&body=' + body;
    if (success) success.style.display = 'block';
  });
})();
`;

// ── Écriture des fichiers ───────────────────────────────────────────────

const ROOT = __dirname;
fs.writeFileSync(path.join(ROOT, 'index.html'), buildIndex());
fs.writeFileSync(path.join(ROOT, 'contact.html'), buildContact());
fs.mkdirSync(path.join(ROOT, 'maisons'), { recursive: true });
for (const h of HOUSES) {
  fs.writeFileSync(path.join(ROOT, 'maisons', h.id + '.html'), buildHouse(h));
}
fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'assets', 'style.css'), CSS);
fs.writeFileSync(path.join(ROOT, 'assets', 'contact.js'), CONTACT_JS);

console.log('Site statique généré :');
console.log('  index.html, contact.html');
for (const h of HOUSES) console.log('  maisons/' + h.id + '.html');
console.log('  assets/style.css, assets/contact.js');
