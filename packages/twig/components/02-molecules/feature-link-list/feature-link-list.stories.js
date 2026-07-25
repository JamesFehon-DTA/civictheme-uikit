/**
 * digital.gov.au Feature Link List component stories.
 */

// phpcs:ignoreFile
import Component from './feature-link-list.twig';
import FeatureLinkListData from './feature-link-list.stories.data';

const meta = {
  title: 'Lists/Feature link list',
  component: Component,
  tags: ['digitalgovau'],
  argTypes: {
    title: {
      control: { type: 'text' },
    },
    vertical_spacing: {
      control: { type: 'select' },
      options: [null, 'top', 'bottom', 'both', 'none'],
    },
    with_background: {
      control: { type: 'boolean' },
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

export const FeatureLinkList = {
  parameters: {
    layout: 'padded',
  },
  args: FeatureLinkListData.args(),
};

export const FeatureLinkListNoDescription = {
  parameters: {
    layout: 'padded',
  },
  args: {
    ...FeatureLinkListData.args(),
    items: FeatureLinkListData.args().items.map(({ description, ...item }) => item),
  },
};

export const SuggestedPrompts = {
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Suggested prompts',
    vertical_spacing: null,
    with_background: false,
    icon_leading: true,
    items: [
      { title: 'How do I apply for a grant?', url: '#' },
      { title: 'Show me recent policy updates', url: '#' },
      { title: 'Summarise the latest annual report', url: '#' },
      { title: 'Find datasets about transport', url: '#' },
    ],
    modifier_class: '',
    attributes: null,
  },
};
