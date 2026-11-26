// Margin notes with a phrase — {% marginnote "phrase" %} renders
// <aside class="margin-note" data-anchor="phrase">. This highlights that phrase
// in the block right after the note and links the two on hover / focus.
// Without JS the note is still a readable aside beside the next block.
(function () {
  // Typographer turns straight quotes curly; match either. Same length, so
  // indexes in the normalised string are valid in the original.
  var normalise = function (s) {
    return s.replace(/[‘’]/g, "'").replace(/[“”]/g, '"');
  };

  function findBlock(note) {
    var next = note.nextElementSibling;
    while (next && next.classList.contains('margin-note')) next = next.nextElementSibling;
    return next || note.previousElementSibling;
  }

  function highlight(block, phrase) {
    var wanted = normalise(phrase);
    var walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return n.parentElement.closest('.margin-note') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      },
    });
    var node;
    while ((node = walker.nextNode())) {
      var at = normalise(node.nodeValue).indexOf(wanted);
      if (at < 0) continue;
      var range = document.createRange();
      range.setStart(node, at);
      range.setEnd(node, at + wanted.length);
      var span = document.createElement('span');
      span.className = 'margin-note-anchor';
      range.surroundContents(span);
      return span;
    }
    return null;
  }

  document.querySelectorAll('.margin-note[data-anchor]').forEach(function (note) {
    var phrase = note.getAttribute('data-anchor');
    var block = findBlock(note);
    var anchor = block && highlight(block, phrase);
    if (!anchor) {
      console.warn('margin-notes: phrase not found in the block next to the note:', phrase);
      return;
    }

    var set = function (on) {
      anchor.classList.toggle('is-active', on);
      note.classList.toggle('is-active', on);
    };
    [anchor, note].forEach(function (el) {
      el.addEventListener('mouseenter', function () { set(true); });
      el.addEventListener('mouseleave', function () { set(false); });
    });
    note.tabIndex = 0;
    note.addEventListener('focus', function () { set(true); });
    note.addEventListener('blur', function () { set(false); });
  });
})();
