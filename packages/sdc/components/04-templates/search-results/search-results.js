/**
 * CivicTheme Search Results Page Template component.
 */

function CivicThemeSearchResults(el) {
  if (el.getAttribute('data-search-results') === 'true') {
    return;
  }

  this.el = el;
  this.toggle = el.querySelector('[data-search-results-filter-toggle]');
  this.groups = el.querySelector('[data-search-results-filter-groups]');

  if (this.toggle && this.groups) {
    this.toggle.addEventListener('click', this.onToggleClick.bind(this));
  }

  el.setAttribute('data-search-results', 'true');
}

CivicThemeSearchResults.prototype.onToggleClick = function () {
  const isExpanded = this.toggle.getAttribute('aria-expanded') === 'true';
  const next = !isExpanded;
  this.toggle.setAttribute('aria-expanded', String(next));
  this.groups.setAttribute('data-search-results-filter-groups-visible', String(next));
};

document.querySelectorAll('[data-search-results]').forEach((el) => {
  new CivicThemeSearchResults(el);
});
