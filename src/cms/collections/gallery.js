import seo from '../partials/seo'
import featuredImage from '../partials/featuredImage'

featuredImage.required = true
featuredImage.fields[0].required = true

export default {
  name: 'gallery',
  label: 'Gallery',
  folder: 'src/pages/gallery',
  create: true,
  slug: '{{slug}}',
  identifier_field: 'pageTitle',
  editor: { preview: true },
  filter: { field: 'templateKey', value: 'gallery-post' },
  fields: [
    {
      label: 'Template Key',
      name: 'templateKey',
      widget: 'hidden',
      default: 'gallery-post',
    },
    {
      label: 'Schema Page Type',
      name: 'schemaType',
      widget: 'hidden',
      default: 'GalleryPosting',
    },
    ...seo,
    {
      label: 'Published Date',
      name: 'date',
      widget: 'datetime',
      hint: "Optionally, the date you want to appear on your blog post. It doesn't have to be the actual publication date. If you leave this blank, it will be automatically generated",
    },
    {
      label: 'Caption',
      name: 'teaser',
      widget: 'text',
      required: false,
      hint: 'If your theme shows a short preview of each article on the blog page, you can optionally customize the text here. Write 2-3 sentences max.',
    },
    featuredImage,
  ],
}
