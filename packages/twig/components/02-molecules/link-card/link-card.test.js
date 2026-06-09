import DrupalAttribute from 'drupal-attribute';

const template = 'components/02-molecules/link-card/link-card.twig';

describe('Link Card', () => {
  test('renders nothing without a url', async () => {
    const c = await dom(template, { title: 'No link' });

    expect(c.querySelector('.ct-link-card')).toBeNull();
  });

  test('renders nothing without a title', async () => {
    const c = await dom(template, { url: 'https://example.com' });

    expect(c.querySelector('.ct-link-card')).toBeNull();
  });

  test('renders a single link card', async () => {
    const c = await dom(template, {
      title: 'Apply for a grant',
      url: 'https://example.com/apply',
    });

    expect(c.querySelector('.ct-link-card')).not.toBeNull();
    // One card is one link - exactly one anchor, no internal heading.
    expect(c.querySelectorAll('.ct-link-card__link')).toHaveLength(1);
    expect(c.querySelector('.ct-link-card__title').textContent.trim()).toEqual('Apply for a grant');
    expect(c.querySelector('.ct-link-card__link').getAttribute('href')).toEqual('https://example.com/apply');

    assertUniqueCssClasses(c);
  });

  test('applies theme class', async () => {
    const c = await dom(template, {
      theme: 'dark',
      title: 'Link',
      url: 'https://example.com',
    });

    const root = c.querySelector('.ct-link-card');
    expect(root.classList.contains('ct-theme-dark')).toBe(true);

    assertUniqueCssClasses(c);
  });

  test('external link opens in a new window with rel and hidden notice', async () => {
    const c = await dom(template, {
      title: 'External',
      url: 'https://x.org',
      is_external: true,
      is_new_window: true,
    });

    const link = c.querySelector('.ct-link-card__link');
    expect(link.getAttribute('target')).toEqual('_blank');
    expect(link.getAttribute('rel')).toEqual('noopener noreferrer');
    expect(c.querySelector('.ct-visually-hidden')).not.toBeNull();

    assertUniqueCssClasses(c);
  });

  test('renders attributes', async () => {
    const c = await dom(template, {
      title: 'Link',
      url: 'https://example.com',
      attributes: new DrupalAttribute().setAttribute('data-test', 'value'),
    });

    expect(c.querySelector('.ct-link-card').getAttribute('data-test')).toEqual('value');
  });

  test('authenticated variant adds its modifier class', async () => {
    const c = await dom(template, {
      variant: 'authenticated',
      title: 'Secure document',
      url: 'https://example.com/secure',
    });

    expect(c.querySelector('.ct-link-card--authenticated')).not.toBeNull();

    assertUniqueCssClasses(c);
  });

  test('deactivated card is non-interactive with no href', async () => {
    const c = await dom(template, {
      variant: 'authenticated',
      title: 'Locked resource',
      is_deactivated: true,
    });

    const root = c.querySelector('.ct-link-card');
    expect(root).not.toBeNull();
    expect(root.classList.contains('ct-link-card--deactivated')).toBe(true);

    // a11y #A: aria-disabled, removed from tab order, no href.
    const link = c.querySelector('.ct-link-card__link');
    expect(link.getAttribute('aria-disabled')).toEqual('true');
    expect(link.getAttribute('tabindex')).toEqual('-1');
    expect(link.hasAttribute('href')).toBe(false);

    assertUniqueCssClasses(c);
  });
});
