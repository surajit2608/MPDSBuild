import CMS from 'netlify-cms-app'
import uploadcare from 'netlify-cms-media-library-uploadcare'
import cloudinary from 'netlify-cms-media-library-cloudinary'
import blog from './collections/blog'
import gallery from './collections/gallery'
import page from './collections/page'
import meta from './collections/meta'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import GalleryPostPreview from './preview-templates/GalleryPostPreview'
import PagePreview from './preview-templates/PagePreview'

import '../style/all.sass'

const pages = [
  {
    label: 'Home Page',
    file: 'src/pages/index.md',
    templateKey: 'index-page',
    pageSlug: '/',
    additionalFields: [
      'pageContent',
      'profileButton',
      'blogButton',
      // 'missionStatement',
      // 'shortBiography',
      // 'learnMoreButton',
      // 'extraContent',
      // 'showRecentPosts',
    ],
  },
  {
    label: 'Profile Page',
    file: 'src/pages/profile.md',
    templateKey: 'profile-page',
    pageSlug: '/profile/',
    additionalFields: [
      'pageContent',
      'blogButton',
      'connectWithMe',
      'discoverConnectExplore',
      // 'longBiography_MD',
      // 'extraContent',
    ],
  },
  // {
  //   label: 'About Page',
  //   file: 'src/pages/about.md',
  //   templateKey: 'about-page',
  //   pageSlug: '/about/',
  //   additionalFields: [
  //     'longBiography_MD',
  //     'extraContent',
  //   ],
  // },
  {
    label: 'Blog Archive Page',
    file: 'src/pages/blog/index.md',
    templateKey: 'blog-archive',
    pageSlug: '/blog/',
    additionalFields: [
      'profileButton',
    ],
  },
  {
    label: 'Gallery Archive Page',
    file: 'src/pages/gallery/index.md',
    templateKey: 'gallery-archive',
    pageSlug: '/gallery/',
    additionalFields: [
      'profileButton',
      'blogButton',
    ],
  },
  // {
  //   label: 'Contact Page',
  //   file: 'src/pages/contact.md',
  //   templateKey: 'contact-page',
  //   pageSlug: '/contact/',
  //   additionalFields: [
  //     'formText',
  //   ],
  // },
]

CMS.init({
  config: {
    backend: {
      name: 'git-gateway',
      branch: 'master',
    },
    // publish_mode: 'editorial_workflow',
    media_folder: 'static/img',
    public_folder: '/img',
    slug: {
      encoding: 'ascii',
      clean_accents: true,
      sanitize_replacement: '-',
    },
    collections: [
      meta,
      {
        name: 'pages',
        label: 'Pages',
        files: pages.map((data) => page(data)),
      },
      blog,
      gallery,
    ],
  },
})

CMS.registerMediaLibrary(uploadcare)
CMS.registerMediaLibrary(cloudinary)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('gallery', GalleryPostPreview)
pages.forEach(({ templateKey }) => {
  CMS.registerPreviewTemplate(templateKey, PagePreview)
})
