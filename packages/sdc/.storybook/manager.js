import React from 'react';
import { addons } from 'storybook/manager-api';
import theme from './theme';

// Badge digital.gov.au-extended components (tagged `digitalgovau`) in the
// sidebar. The tag is the source of truth — strip it for an upstream PR.
const dgaBadge = (label, tags) =>
  Array.isArray(tags) && tags.includes('digitalgovau')
    ? React.createElement(
        'span',
        null,
        label,
        React.createElement(
          'span',
          {
            style: {
              marginLeft: 6,
              padding: '0 5px',
              borderRadius: 8,
              fontSize: 9,
              fontWeight: 700,
              lineHeight: '15px',
              background: '#0b3d91',
              color: '#fff',
            },
          },
          'DGA',
        ),
      )
    : label;

addons.setConfig({
  theme,
  sidebar: {
    renderLabel: (item) => dgaBadge(item.name, item.tags),
  },
});
