// Site statique sans serveur : le formulaire construit un e-mail pré-rempli
// et ouvre le client de messagerie du visiteur. Pour un vrai envoi silencieux
// depuis le navigateur, brancher un service comme Formspree ou Netlify Forms
// (voir README.md).
(function () {
  const form = document.getElementById('contact-form');
  const formWrap = document.getElementById('ks-form-wrap');
  const success = document.getElementById('contact-success');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const lines = [
      'Nom / organisme : ' + (data.get('nom') || ''),
      'Courriel : ' + (data.get('email') || ''),
      'Objet : ' + (data.get('objet') || ''),
      '',
      data.get('message') || ''
    ];
    const subject = encodeURIComponent('KARUSMART — ' + (data.get('objet') || 'Demande de contact'));
    const body = encodeURIComponent(lines.join('\n'));
    window.location.href = 'mailto:jean-marc.blazy@inrae.fr?subject=' + subject + '&body=' + body;

    if (formWrap) formWrap.style.display = 'none';
    if (success) success.style.display = 'block';
  });
})();
