export default {
  args: (theme = 'light') => ({
    theme,
    title: 'Related resources',
    items: [
      {
        variant: 'default',
        title: 'Apply for a grant',
        url: 'https://example.com/apply',
      },
      {
        variant: 'default',
        title: 'Eligibility requirements',
        url: 'https://example.com/eligibility',
      },
      {
        variant: 'authenticated',
        title: 'Annual report 2025 (secure)',
        url: 'https://example.com/secure/annual-report',
      },
      {
        variant: 'authenticated',
        title: 'Audited statements (sign in to access)',
        url: '',
        is_deactivated: true,
      },
    ],
    modifier_class: '',
    attributes: null,
  }),
};
