/**
 * CivicTheme Link Card component stories.
 */

// phpcs:ignoreFile
import Component from './link-card.twig';
import LinkCardData from './link-card.stories.data';

const meta = {
  title: 'Molecules/List/Link Card',
  component: Component,
  tags: ['digitalgovau'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
    },
    variant: {
      control: { type: 'radio' },
      options: ['default', 'authenticated'],
    },
    title: {
      control: { type: 'text' },
    },
    url: {
      control: { type: 'text' },
    },
    is_external: {
      control: { type: 'boolean' },
    },
    is_new_window: {
      control: { type: 'boolean' },
    },
    is_deactivated: {
      control: { type: 'boolean' },
    },
    modifier_class: {
      control: { type: 'text' },
    },
  },
};

export default meta;

export const LinkCard = {
  parameters: {
    layout: 'padded',
  },
  args: LinkCardData.args(),
};

export const External = {
  parameters: {
    layout: 'padded',
  },
  args: {
    ...LinkCardData.args(),
    title: 'Visit the national portal',
    url: 'https://national.example.gov',
    is_external: true,
    is_new_window: true,
  },
};

export const AuthenticatedResource = {
  parameters: {
    layout: 'padded',
  },
  args: {
    ...LinkCardData.args(),
    variant: 'authenticated',
    title: 'Annual report 2025 (secure)',
    url: 'https://example.com/secure/annual-report',
  },
};

export const AuthenticatedResourceDeactivated = {
  parameters: {
    layout: 'padded',
  },
  args: {
    ...LinkCardData.args(),
    variant: 'authenticated',
    title: 'Annual report 2025 (sign in to access)',
    url: '',
    is_deactivated: true,
  },
};

export const Dark = {
  parameters: {
    layout: 'padded',
    backgrounds: { default: 'Dark' },
  },
  args: LinkCardData.args('dark'),
};
