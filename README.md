# gci16.fossasia.org
[![Build Status](https://travis-ci.org/fossasia/gci16.fossasia.org.svg)]
(https://travis-ci.org/fossasia/gci16.fossasia.org)

The student site for GCI 2016 Students.

# Contributing
Read thoroughly our [contributing guide](https://github.com/fossasia/gci16.fossasia.org/blob/gh-pages/CONTRIBUTING.md) before sending in your Pull Requests. Happy Contributing !

# Blog Post

To add your blog post, you need to open the file `blogs.yml` in `_data` folder. Maintain the
following format to enter your blog in this website.

```
- name: Your name
  blog: https://yourbloglink.com
  blog_img: your_image
  article: Article title
  article_link: https://yourarticlelink.com
```

**Important: The image should be added in images folder, and `your_image` should be the file's
name, for example 'mypost.png'**
Also adding article and article_link is optional, unless your task recommends it.

**Important: All images must be optimized before uploaded to the repo via commit or PR,
you may use any image optimizer of your choice. Also the images should be 240x240 pixels
