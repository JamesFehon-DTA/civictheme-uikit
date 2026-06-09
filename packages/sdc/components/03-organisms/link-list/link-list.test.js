const template = 'components/03-organisms/link-list/link-list.twig';

const sampleItems = [
  { title: 'First', url: 'https://example.com/first' },
  {
    variant: 'authenticated',
    title: 'Locked',
    is_deactivated: true,
  },
];

describe('Link List', () => {
  test('renders nothing without items', async () => {
    const c = await dom(template, { items: [] });

    expect(c.querySelector('.ct-link-list')).toBeNull();
  });

  test('renders heading and one card per item', async () => {
    const c = await dom(template, { title: 'Related resources', items: sampleItems });

    expect(c.querySelector('.ct-link-list')).not.toBeNull();
    expect(c.querySelector('.ct-link-list__title')).not.toBeNull();
    expect(c.querySelector('.ct-link-list__items')).not.toBeNull();
    // One link-card rendered per item.
    expect(c.querySelectorAll('.ct-link-card')).toHaveLength(2);

    assertUniqueCssClasses(c);
  });

  test('passes item flags through to the card', async () => {
    const c = await dom(template, { items: sampleItems });

    // Authenticated + deactivated item -> deactivated authenticated card.
    expect(c.querySelector('.ct-link-card--authenticated')).not.toBeNull();
    expect(c.querySelector('.ct-link-card--deactivated')).not.toBeNull();

    assertUniqueCssClasses(c);
  });

  test('applies theme class', async () => {
    const c = await dom(template, { theme: 'dark', items: sampleItems });

    const root = c.querySelector('.ct-link-list');
    expect(root.classList.contains('ct-theme-dark')).toBe(true);

    assertUniqueCssClasses(c);
  });
});
