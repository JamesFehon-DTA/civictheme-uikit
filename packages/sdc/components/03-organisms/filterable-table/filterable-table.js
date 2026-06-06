/**
 * CivicTheme Filterable Table component.
 */

/* global Drupal */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Core enhancement — no Drupal dependency.
  // ---------------------------------------------------------------------------

  function initWrapper(wrapper) {
    // Idempotency guard — replaces once().
    if (wrapper.dataset.filterableTableInit) return;
    wrapper.dataset.filterableTableInit = 'true';

    const tableId = wrapper.getAttribute('data-table-id');
    if (!tableId) return;

    // Prefer a sibling table within the story canvas; fall back to
    // document-wide lookup for non-Storybook use.
    const table = wrapper.parentElement?.querySelector(`#${CSS.escape(tableId)}`)
      ?? document.getElementById(tableId);
    if (!table) return;

    // Propagate theme class to the table so ct-table dark-mode CSS applies.
    const themeClass = Array.from(wrapper.classList).find((c) => /^ct-theme-/.test(c));
    if (themeClass) {
      Array.from(table.classList)
        .filter((c) => /^ct-theme-/.test(c))
        .forEach((c) => table.classList.remove(c));
      table.classList.add(themeClass);
    }

    const tbody = table.querySelector('tbody');
    const allRows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];

    const filterInputs = Array.from(wrapper.querySelectorAll('[data-filter-type]'));
    const clearBtn = wrapper.querySelector('.ct-filterable-table__clear-btn');
    const resultsEl = wrapper.querySelector('.ct-filterable-table__results');

    // -------------------------------------------------------------------------
    // Internal: apply all active filters to the table rows.
    // -------------------------------------------------------------------------
    function applyFilters() {
      const activeFilters = filterInputs
        .map((input) => ({
          colIndex: parseInt(input.getAttribute('data-column-index'), 10),
          type: input.getAttribute('data-filter-type'),
          value: input.value.trim().toLowerCase(),
        }))
        .filter((f) => f.value !== '');

      let visibleCount = 0;

      allRows.forEach((row) => {
        const visible = activeFilters.every((filter) => {
          const cell = row.querySelectorAll('td')[filter.colIndex];
          if (!cell) return true;
          const cellText = cell.textContent.trim().toLowerCase();
          if (filter.type === 'text') return cellText.indexOf(filter.value) !== -1;
          if (filter.type === 'select') return cellText === filter.value;
          return true;
        });

        row.style.display = visible ? '' : 'none';
        if (visible) visibleCount++;
      });

      if (resultsEl) {
        resultsEl.textContent = activeFilters.length === 0
          ? ''
          : `Showing ${visibleCount} of ${allRows.length} rows`;
      }

      if (clearBtn) {
        if (activeFilters.length > 0) {
          clearBtn.removeAttribute('hidden');
        } else {
          clearBtn.setAttribute('hidden', '');
        }
      }
    }

    // -------------------------------------------------------------------------
    // 1. Populate <select> options from table column data.
    // -------------------------------------------------------------------------
    filterInputs.forEach((input) => {
      if (input.getAttribute('data-filter-type') !== 'select') return;

      const colIndex = parseInt(input.getAttribute('data-column-index'), 10);
      const seen = new Set();
      const values = [];

      allRows.forEach((row) => {
        const cell = row.querySelectorAll('td')[colIndex];
        if (cell) {
          const text = cell.textContent.trim();
          if (text && !seen.has(text)) {
            seen.add(text);
            values.push(text);
          }
        }
      });

      values.sort();
      values.forEach((val) => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        input.appendChild(opt);
      });
    });

    // -------------------------------------------------------------------------
    // 2. Filter events.
    // -------------------------------------------------------------------------
    filterInputs.forEach((input) => {
      input.addEventListener('input', applyFilters);
      input.addEventListener('change', applyFilters);
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        filterInputs.forEach((input) => {
          if (input.tagName === 'SELECT') {
            input.selectedIndex = 0;
          } else {
            input.value = '';
          }
        });
        applyFilters();
      });
    }

    // Initial state.
    applyFilters();
  }

  /**
   * Initialise all filterable table wrappers within a given context element.
   *
   * @param {Element|Document} [context=document]
   */
  function initAll(context) {
    (context || document).querySelectorAll('[data-dga-filterable-table]').forEach(initWrapper);
  }

  // ---------------------------------------------------------------------------
  // Integration.
  // ---------------------------------------------------------------------------

  // Expose globally for Storybook play() and static pages.
  window.DgaFilterableTable = { initAll };

  // Drupal: register as a behavior for AJAX-safe re-attachment.
  if (typeof Drupal !== 'undefined') {
    Drupal.behaviors.dgaFilterableTable = {
      attach(context) {
        initAll(context);
      },
    };
  } else {
    // Non-Drupal: init elements in the DOM now, then watch for future
    // insertions via MutationObserver (covers static pages and Storybook).
    initAll();
    new MutationObserver(() => initAll())
      .observe(document.body || document.documentElement, { childList: true, subtree: true });
  }

})();
