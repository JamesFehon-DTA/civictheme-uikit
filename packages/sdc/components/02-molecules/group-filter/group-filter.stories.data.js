import Field from '../field/field.twig';
import FieldData from '../field/field.stories.data';

export default {
  args: (theme = 'light') => ({
    theme,
    title: 'Filter results by:',
    filters: [
      {
        title: 'Topic',
        content: Field({
          ...FieldData.args(theme, { controls: true }),
          type: 'checkbox',
          description: null,
          message: null,
          orientation: 'vertical',
        }),
      },
      {
        title: 'Applies to',
        content: [
          Field({
            ...FieldData.args(theme, { controls: true }),
            type: 'checkbox',
            description: null,
            message: null,
            orientation: 'vertical',
          }),
        ].join(''),
      },
      {
        title: 'Date Range',
        content: Field({
          ...FieldData.args(theme),
          type: 'text',
          description: null,
          message: null,
          orientation: 'vertical',
        }),
      },
    ],
    sort_filters: [
      {
        title: 'Sort',
        content: Field({
          ...FieldData.args(theme, { controls: true }),
          type: 'radio',
          description: null,
          message: null,
          orientation: 'vertical',
        }),
      },
    ],
    submit_text: 'Apply',
    form_attributes: null,
    form_hidden_fields: null,
    content_top: '',
    content_bottom: '',
    attributes: null,
    modifier_class: '',
  }),
};
