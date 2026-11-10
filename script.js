var cleanPath = window.location.pathname
  .replace(/\/index\.html$/, '/')
  .replace(/\.html$/, '');
var baseDir = cleanPath.endsWith('/') ? cleanPath : cleanPath + '/';
var hashId = window.location.hash ? window.location.hash.slice(1) : '';
if (hashId) {
  var initialTarget = document.getElementById(hashId);
  if (initialTarget) initialTarget.scrollIntoView();
  window.history.replaceState(null, '', baseDir + hashId);
} else if (cleanPath !== window.location.pathname) {
  window.history.replaceState(null, '', cleanPath + window.location.search);
}

document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('menu-toggle');
  var mobileNav = document.getElementById('mobile-nav');

  function setMenu(open) {
    mobileNav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  }

  if (toggle && mobileNav) {
    toggle.addEventListener('click', function () {
      setMenu(!mobileNav.classList.contains('open'));
    });

    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { setMenu(false); });
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth >= 768) setMenu(false);
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var id = link.getAttribute('href').slice(1);
      var target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState(null, '', baseDir + id);
      }
    });
  });

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});
