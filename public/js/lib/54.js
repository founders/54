/*
WebFont.load({
  google: {
    families: ['EB Garamond']
  }
});
*/
$(function () {

  var nav = $('#mainnav')
    , win = $(window)
    , fixed = false
    , fix = function () {
        nav.addClass('fixed');
      }
    , unfix = function () {
        nav.removeClass('fixed');
      };

  win.scroll(function () {
    if(win.scrollTop() > 450) {
      if(!fixed) {
        nav.addClass('fixed');
      }
      fixed = true;
    }
    else {
      if(fixed) {
        nav.removeClass('fixed');
      }
      fixed = false;
    }
  });

  nav.scrollspy({
    offset: -80
  });
});