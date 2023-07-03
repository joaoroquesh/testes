
    // Obtém todas as tags com a classe '.cod'
var codTags = document.querySelectorAll('.cod');

// Adiciona o evento de clique a cada tag
codTags.forEach(function(tag) {
  tag.addEventListener('click', function() {
    // Copia o texto da tag para a área de transferência
    var text = this.innerText;
    navigator.clipboard.writeText(text).then(function() {
      console.log('Texto copiado: ' + text);

      // Adiciona a classe "success" à tag
      tag.classList.add('success');

      // Remove a classe "success" após 3 segundos
      setTimeout(function() {
        tag.classList.remove('success');
      }, 2000);
    }).catch(function(err) {
      console.error('Falha ao copiar o texto: ', err);
    });
  });
});



/*
    // Obtém todas as tags com a classe '.cod'
    var codTags = document.querySelectorAll('.cod');

    // Adiciona o evento de clique a cada tag
    codTags.forEach(function(tag) {
      tag.addEventListener('click', function() {
        // Copia o texto da tag para o campo de texto oculto
        var text = this.innerText;
        var copyTextarea = document.getElementById('copyTextarea');
        copyTextarea.value = text;

        // Seleciona o texto no campo de texto
        copyTextarea.select();
        copyTextarea.setSelectionRange(0, copyTextarea.value.length);

        // Copia o texto para a área de transferência
        document.execCommand('copy');

        console.log('Texto copiado: ' + text);
      });
    });
*/