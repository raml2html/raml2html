$(document).ready(function() {
  $('.page-header pre code, .top-resource-description pre code, .modal-body pre code').each(function(i, block) {
    hljs.highlightBlock(block);
  });

  $('[data-toggle]').click(function() {
    var selector = $(this).data('target') + ' pre code';
    $(selector).each(function(i, block) {
      hljs.highlightBlock(block);
    });
  });

  // open modal on hashes like #_action_get
  $(window).bind('hashchange', function(e) {
    var anchor_id = document.location.hash.substr(1); //strip #
    var element = $('#' + anchor_id);

    // do we have such element + is it a modal?  --> show it
    if (element.length && element.hasClass('modal')) {
      element.modal('show');
    }
  });

  // execute hashchange on first page load
  $(window).trigger('hashchange');

  // remove url fragment on modal hide
  $('.modal').on('hidden.bs.modal', function() {
    try {
      if (history && history.replaceState) {
        history.replaceState({}, '', '#');
      }
    } catch(e) {}
  });
});
