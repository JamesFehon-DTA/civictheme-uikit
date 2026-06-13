/**
 * CivicTheme Link List component stories.
 */

// phpcs:ignoreFile
import Component from './link-list.twig';
import LinkListData from './link-list.stories.data';

const meta = {
  title: 'Organisms/Link List',
  component: Component,
  tags: ['digitalgovau'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
    title: {
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

export const LinkList = {
  parameters: {
    layout: 'padded',
  },
  args: LinkListData.args(),
};

export const Dark = {
  parameters: {
    layout: 'padded',
  },
  globals: {
    backgrounds: { value: 'dark' },
  },
  args: LinkListData.args('dark'),
};
