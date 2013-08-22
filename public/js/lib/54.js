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
      }
    , contributorNav = $('#contribute .nav');

  // Pins the navbar to the top of the page
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

  // Updates the navbar as the user scrolls
  nav.scrollspy({
    offset: -80
  });

  // Switches between the contributor forms
  contributorNav.children('li').click(function (e) {
    e.preventDefault();
    e.stopPropagation();

    var formSelector = $(this).children('a').attr('href');

    // Hide all forms except the one to be shown (with anti-flicker checking)
    $('#contribute .formHolder:not(' + formSelector + ')').addClass('hidden');
    $(formSelector).removeClass('hidden');

    console.log(formSelector);

    // Toggle pill classes (with anti-flicker checking)
    $("#contribute .nav li.active").not(this).removeClass('active');
    $(this).addClass('active');
  });

  // Turn on radio buttons
  $('[data-toggle="radio"]').each(function () {
    $(this).radio();
  });
});