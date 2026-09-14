// Site statique sans serveur : le formulaire construit un e-mail pré-rempli
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
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:bonjour@kazalize.gp?subject=' + subject + '&body=' + body;
    if (success) success.style.display = 'block';
  });
})();
