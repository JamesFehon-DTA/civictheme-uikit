/**
 * CivicTheme Table of Contents component.
 */

function CivicThemeTableOfContents(el) {
  // Check if current target is already initialised.
  if (el.hasAttribute('data-table-of-contents-initialised')) {
    return;
  }

  // Get options from attributes.
  this.target = el;
  this.position = this.target.getAttribute('data-table-of-contents-position').trim();
  this.theme = this.target.hasAttribute('data-table-of-contents-theme') ? this.target.getAttribute('data-table-of-contents-theme').trim() : 'light';
  this.title = this.target.hasAttribute('data-table-of-contents-title') ? this.target.getAttribute('data-table-of-contents-title').trim() : '';
  this.anchorScopeSelector = this.target.hasAttribute('data-table-of-contents-anchor-scope-selector') ? this.target.getAttribute('data-table-of-contents-anchor-scope-selector').trim() : '.ct-basic-content';
  this.excludeSelector = this.target.hasAttribute('data-table-of-contents-exclude-selector') ? this.target.getAttribute('data-table-of-contents-exclude-selector').trim() : '';

  // Heading depth. Explicit anchor selector wins; otherwise build a selector
  // from the min/max heading levels.
  this.minLevel = this.normaliseLevel(this.target.getAttribute('data-table-of-contents-min-level'), 2);
  this.maxLevel = this.normaliseLevel(this.target.getAttribute('data-table-of-contents-max-level'), 3);
  if (this.maxLevel < this.minLevel) {
    this.maxLevel = this.minLevel;
  }
  const explicitAnchorSelector = this.target.hasAttribute('data-table-of-contents-anchor-selector') ? this.target.getAttribute('data-table-of-contents-anchor-selector').trim() : '';
  this.anchorSelector = explicitAnchorSelector !== '' ? explicitAnchorSelector : this.buildAnchorSelector(this.minLevel, this.maxLevel);

  // Normalise remaining attribute values.
  this.position = ['before', 'after', 'prepend', 'append'].indexOf(this.position.trim()) > 0 ? this.position : 'before';
  this.theme = this.theme === 'dark' ? 'dark' : 'light';
  this.anchorScopeSelector = this.anchorScopeSelector !== '' ? this.anchorScopeSelector : '.ct-basic-content';

  // Initialise component.
  this.init();

  // Mark target as initialised.
  this.target.setAttribute('data-table-of-contents-initialised', 'true');
}

CivicThemeTableOfContents.prototype.init = function () {
  let html = '';

  const links = this.findLinks(this.anchorSelector, this.anchorScopeSelector);

  if (!links.length) {
    return;
  }

  if (this.title) {
    html += this.renderTitle(this.title);
  }

  html += this.renderLinks(this.buildTree(links));

  html = this.renderContainer(html, this.theme, this.position);

  this.place(this.target, this.position, html);
};

CivicThemeTableOfContents.prototype.findLinks = function (anchorSelector, scopeSelector) {
  const links = [];
  const existingUrls = new Set(); // Track existing URLs.

  // Find links within provided scope selector.
  document.querySelectorAll(scopeSelector).forEach((elScope) => {
    elScope.querySelectorAll(anchorSelector).forEach((elAnchor) => {
      // Skip headings marked to be excluded from TOC.
      if (elAnchor.hasAttribute('data-toc-exclude')) {
        return;
      }

      // Skip headings matching the exclude selector.
      if (this.isExcluded(elAnchor)) {
        return;
      }

      // Respect existing ID.
      let anchorId = elAnchor.id || null;
      const anchorText = elAnchor.innerText;

      // Ignore blank headings.
      if (anchorText.trim() === '') {
        return;
      }

      // Generate new ID if no existing ID.
      if (!anchorId || anchorId.length === 0) {
        anchorId = this.makeAnchorId(anchorText);
        // Check if generated ID is already present on the page or links array.
        while (elScope.querySelectorAll(`#${anchorId}`).length || existingUrls.has(`#${anchorId}`)) {
          // Add random 3 character suffix.
          anchorId = `${anchorId}-${Math.random().toString(36).substring(2, 5)}`;
        }
      }

      const url = `#${anchorId}`;

      // Skip adding the link if the URL already exists.
      if (existingUrls.has(url)) {
        return;
      }

      links.push({
        title: anchorText,
        url,
        level: this.headingLevel(elAnchor),
      });

      // Update anchor with the id. This will "fix" any anchors with duplicated
      // IDs, which is not a valid HTML content.
      elAnchor.id = anchorId;

      // Add the URL to the set of existing URLs.
      existingUrls.add(url);
    });
  });

  return links;
};

/**
 * Nest a flat, document-ordered list of headings by their level.
 */
CivicThemeTableOfContents.prototype.buildTree = function (links) {
  const root = { children: [] };
  const stack = [{ node: root, level: this.minLevel - 1 }];

  links.forEach((link) => {
    const node = { title: link.title, url: link.url, children: [] };

    // Climb back up to the correct parent for this heading level.
    while (stack.length > 1 && stack[stack.length - 1].level >= link.level) {
      stack.pop();
    }

    stack[stack.length - 1].node.children.push(node);
    stack.push({ node, level: link.level });
  });

  return root.children;
};

CivicThemeTableOfContents.prototype.renderTitle = function (title) {
  return `<h2 class="ct-table-of-contents__title">${title}</h2>`;
};

CivicThemeTableOfContents.prototype.renderLinks = function (nodes, isChild) {
  if (!nodes.length) {
    return '';
  }

  const listClass = isChild ? 'ct-table-of-contents__links ct-table-of-contents__links--child' : 'ct-table-of-contents__links';
  let html = `<ul class="${listClass}">`;
  for (const i in nodes) {
    html += `
      <li class="ct-table-of-contents__link-item">
        <a class="ct-table-of-contents__link" href="${nodes[i].url}">${nodes[i].title}</a>
        ${nodes[i].children.length ? this.renderLinks(nodes[i].children, true) : ''}
      </li>
    `;
  }
  html += '</ul>';

  return html;
};

CivicThemeTableOfContents.prototype.renderContainer = function (html, theme, position) {
  return `<div class="ct-table-of-contents ct-theme-${theme} ct-table-of-contents--position-${position}">${html}</div>`;
};

CivicThemeTableOfContents.prototype.place = function (el, position, html) {
  const positionMap = {
    before: 'beforebegin',
    after: 'afterend',
    prepend: 'afterbegin',
    append: 'beforeend',
  };

  el.insertAdjacentHTML(positionMap[position], html);
};

CivicThemeTableOfContents.prototype.makeAnchorId = function (str) {
  return str.toLowerCase()
    .replace(/(&\w+?;)/gim, ' ')
    .replace(/[_.~"<>%|'!*();:@&=+$,/?%#[\]{}\n`^\\]/gim, '')
    .replace(/(^\s+)|(\s+$)/gim, '')
    .replace(/\s+/gm, '-');
};

/**
 * Clamp a level attribute value to the 2-6 heading range.
 */
CivicThemeTableOfContents.prototype.normaliseLevel = function (value, fallback) {
  const level = parseInt(value, 10);
  if (Number.isNaN(level)) {
    return fallback;
  }
  return Math.min(6, Math.max(2, level));
};

/**
 * Build an anchor selector (e.g. 'h2, h3') from a min/max heading level.
 */
CivicThemeTableOfContents.prototype.buildAnchorSelector = function (min, max) {
  const selectors = [];
  for (let level = min; level <= max; level++) {
    selectors.push(`h${level}`);
  }
  return selectors.join(', ');
};

/**
 * Resolve a heading element's level, falling back to minLevel for non-headings.
 */
CivicThemeTableOfContents.prototype.headingLevel = function (el) {
  const match = /^h([1-6])$/i.exec(el.tagName);
  return match ? parseInt(match[1], 10) : this.minLevel;
};

/**
 * Whether an element matches the configured exclude selector.
 */
CivicThemeTableOfContents.prototype.isExcluded = function (el) {
  if (this.excludeSelector === '') {
    return false;
  }
  try {
    return el.matches(this.excludeSelector);
  } catch (e) {
    // Invalid selector: exclude nothing rather than break generation.
    return false;
  }
};

document.querySelectorAll('[data-table-of-contents-position]').forEach((el) => {
  new CivicThemeTableOfContents(el);
});
