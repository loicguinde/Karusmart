// Site statique sans serveur : le formulaire construit un e-mail pré-rempli
// et ouvre le client de messagerie du visiteur. Pour un vrai envoi silencieux
// depuis le navigateur, brancher un service comme Formspree ou Netlify Forms
// (voir README.md).
(function () {
  const form = document.getElementById('contact-form');
  const formWrap = document.getElementById('tm-form-wrap');
  const success = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const g = (n) => data.get(n) || '—';
    const lines = [
      'Nom : ' + g('nom'),
      'Arrivée : ' + g('arrivee'),
      'Départ : ' + g('depart'),
      'Logement souhaité : ' + g('logement'),
      '',
      data.get('message') || ''
    ];
    const subject = encodeURIComponent('Demande de séjour — Tortue Marine');
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:marine_dagorne@yahoo.fr?subject=' + subject + '&body=' + body;

    if (formWrap) formWrap.style.display = 'none';
    if (success) success.style.display = 'block';
  });
})();
