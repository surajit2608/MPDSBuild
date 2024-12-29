import seo from '../partials/seo'

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
    {
      label: 'Featured Image',
      name: 'featuredImage',
      widget: 'object',
      hint: 'The primary image of this page, which is also used if people share the page on social media. If you do not choose an image, the default image set in the Site Data page will be used.',
      required: true,
      fields: [
        {
          label: 'Image File',
          name: 'src',
          widget: 'image',
          required: true,
        },
        {
          label: 'Alt Text',
          name: 'alt',
          widget: 'string',
          hint: "Describe what is shown in the image. This description is very important for SEO, don't leave it blank.",
          required: false,
        },
        // {
        //   label: 'Caption',
        //   name: 'caption',
        //   wiget: 'string',
        //   hint: 'Optionally, provide a caption for this image.',
        //   required: false,
        // },
      ],
    },
  ],
}
