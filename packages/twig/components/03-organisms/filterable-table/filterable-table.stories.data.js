/**
 * CivicTheme Filterable Table component story data.
 */

const tableRows = `
      <tr>
        <td>Finance</td>
        <td>Australian Electoral Commission</td>
        <td>Mandatory</td>
      </tr>
      <tr>
        <td>Finance</td>
        <td>Department of Finance</td>
        <td>Mandatory</td>
      </tr>
      <tr>
        <td>Finance</td>
        <td>Services Australia</td>
        <td>Mandatory</td>
      </tr>
      <tr>
        <td>Treasury</td>
        <td>Australian Taxation Office</td>
        <td>Mandatory</td>
      </tr>
      <tr>
        <td>Treasury</td>
        <td>Australian Bureau of Statistics</td>
        <td>Mandatory</td>
      </tr>
      <tr>
        <td>Defence</td>
        <td>Defence Housing Australia</td>
        <td>Voluntary</td>
      </tr>
      <tr>
        <td>Defence</td>
        <td>Department of Veterans' Affairs</td>
        <td>Voluntary</td>
      </tr>
      <tr>
        <td>Health, Disability and Ageing</td>
        <td>Australian Digital Health Agency</td>
        <td>Voluntary</td>
      </tr>`;

const tableHead = `
      <tr>
        <th>Portfolio</th>
        <th>Entity</th>
        <th>Type</th>
      </tr>`;

const demoTable = `
<div class="container"><div class="row"><div class="col-xxs-12">
  <table id="demo-filterable-table" class="ct-table">
    <thead>${tableHead}
    </thead>
    <tbody>${tableRows}
    </tbody>
  </table>
</div> </div> </div>
`;

// Same table with ct-table--sortable added — enables column sort buttons
// alongside the filter controls. Used by the FilterableTableSortable story.
const demoSortableTable = `
<div class="container"><div class="row"><div class="col-xxs-12">
    <table id="demo-filterable-table" class="ct-table ct-table--sortable">
    <thead>${tableHead}
    </thead>
    <tbody>${tableRows}
    </tbody>
  </table>
</div> </div> </div>
`;

// Definition-list target. Each row carries data-filter-row + data-filter-col-N
// so the same controls filter on clean values independent of the displayed
// key/value text. Column order: 0 Agency (text), 1 Portfolio, 2 Type, 3 Status.
// Rendered as raw HTML (matching demoTable) rather than via summary-list.twig,
// so summary-list.css is imported explicitly in the SDC stories file.
const listItems = [
  ['Australian Electoral Commission', 'Finance', 'Mandatory', 'Published'],
  ['Department of Finance', 'Finance', 'Mandatory', 'Published'],
  ['Services Australia', 'Finance', 'Mandatory', 'Published'],
  ['Australian Taxation Office', 'Treasury', 'Mandatory', 'Published'],
  ['Australian Bureau of Statistics', 'Treasury', 'Mandatory', 'Draft'],
  ['Defence Housing Australia', 'Defence', 'Voluntary', 'Published'],
  ["Department of Veterans' Affairs", 'Defence', 'Voluntary', 'Draft'],
  ['Australian Digital Health Agency', 'Health, Disability and Ageing', 'Voluntary', 'Published'],
];

const listRows = listItems.map(([agency, portfolio, type, status]) => `
      <div
        class="ct-summary-list__row"
        data-filter-row
        data-filter-col-0="${agency}"
        data-filter-col-1="${portfolio}"
        data-filter-col-2="${type}"
        data-filter-col-3="${status}"
      >
        <dt class="ct-summary-list__key">${agency}</dt>
        <dd class="ct-summary-list__value">${portfolio} · ${type} · ${status}</dd>
        <dd class="ct-summary-list__actions">
          <a href="#" class="ct-summary-list__action-link">View statement</a>
        </dd>
      </div>`).join('');

const demoList = `
<div class="container"><div class="row"><div class="col-xxs-12">
  <dl id="demo-filterable-list" class="ct-summary-list ct-theme-light">${listRows}
  </dl>
</div> </div> </div>
`;

export default {
  args(theme = 'light', overrides = {}) {
    return {
      theme,
      table_id: 'demo-filterable-table',
      target_type: 'table',
      title: 'Filter the table',
      columns: [
        { label: 'Portfolio', filter_type: 'select' },
        { label: 'Entity', filter_type: 'text' },
        { label: 'Type', filter_type: 'select' },
      ],
      vertical_spacing: 'none',
      with_background: false,
      attributes: null,
      modifier_class: '',
      ...overrides,
    };
  },
  listArgs(theme = 'light', overrides = {}) {
    return {
      theme,
      table_id: 'demo-filterable-list',
      target_type: 'list',
      title: 'Filter the list',
      columns: [
        { label: 'Agency', filter_type: 'text' },
        { label: 'Portfolio', filter_type: 'select' },
        { label: 'Type', filter_type: 'select' },
        { label: 'Status', filter_type: 'select' },
      ],
      vertical_spacing: 'none',
      with_background: false,
      attributes: null,
      modifier_class: '',
      ...overrides,
    };
  },
  demoTable,
  demoSortableTable,
  demoList,
};
