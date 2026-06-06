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

export default {
  args(theme = 'light', overrides = {}) {
    return {
      theme,
      table_id: 'demo-filterable-table',
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
  demoTable,
  demoSortableTable,
};
