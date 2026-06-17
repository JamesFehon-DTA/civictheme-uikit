/**
 * CivicTheme Summary List component stories.
 */

import Component from './summary-list.twig';

const meta = {
  title: 'Content/Summary list',
  component: Component,
  tags: ['digitalgovau'],
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
    no_border: {
      control: { type: 'boolean' },
    },
    id: {
      control: { type: 'text' },
    },
    items: {
      control: { type: 'object' },
    },
    modifier_class: {
      control: { type: 'text' },
    },
  },
};

export default meta;

const defaultItems = [
  { key: 'Full name', value: 'Jane Citizen' },
  { key: 'Date of birth', value: '1 January 1980' },
  { key: 'Contact email', value: 'jane.citizen@example.gov.au' },
  { key: 'Address', value: '123 Example Street, Canberra ACT 2600' },
];

export const Default = {
  name: 'Light theme',
  args: {
    theme: 'light',
    items: defaultItems,
    no_border: false,
    modifier_class: '',
    attributes: null,
  },
};

export const DarkTheme = {
  name: 'Dark theme',
  globals: {
    backgrounds: { value: 'dark' },
  },
  args: {
    theme: 'dark',
    items: defaultItems.slice(0, 3),
    no_border: false,
    modifier_class: '',
    attributes: null,
  },
};

export const NoBorder = {
  name: 'No border',
  args: {
    theme: 'light',
    items: defaultItems.slice(0, 3),
    no_border: true,
    modifier_class: '',
    attributes: null,
  },
};

export const WithActions = {
  name: 'With actions',
  args: {
    theme: 'light',
    no_border: false,
    modifier_class: '',
    attributes: null,
    items: [
      { key: 'Full name', value: 'Jane Citizen', action_url: '#', action_text: 'Change' },
      { key: 'Date of birth', value: '1 January 1980', action_url: '#', action_text: 'Change' },
      { key: 'Contact email', value: 'jane.citizen@example.gov.au', action_url: '#', action_text: 'Change' },
    ],
  },
};

// Rows carry id + per-row filter_values, the contract the filterable-table
// behaviour (target_type: list) reads via data-filter-col-N. See the
// "Filterable Definition List" story under Content/Tables/Filterable table for
// the controls wired up. The <dl> alone is fully usable without JS.
export const Filterable = {
  name: 'With filter attributes',
  args: {
    theme: 'light',
    no_border: false,
    modifier_class: '',
    attributes: null,
    id: 'agency-transparency-list',
    items: [
      {
        key: 'Australian Electoral Commission',
        value: 'Finance · Mandatory · Published',
        action_url: '#',
        action_text: 'View statement',
        filter_values: ['Australian Electoral Commission', 'Finance', 'Mandatory', 'Published'],
      },
      {
        key: 'Australian Taxation Office',
        value: 'Treasury · Mandatory · Published',
        action_url: '#',
        action_text: 'View statement',
        filter_values: ['Australian Taxation Office', 'Treasury', 'Mandatory', 'Published'],
      },
      {
        key: "Department of Veterans' Affairs",
        value: 'Defence · Voluntary · Draft',
        action_url: '#',
        action_text: 'View statement',
        filter_values: ["Department of Veterans' Affairs", 'Defence', 'Voluntary', 'Draft'],
      },
    ],
  },
};
