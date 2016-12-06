# gci16.fossasia.org
[![Build Status](https://travis-ci.org/fossasia/gci16.fossasia.org.svg)]
(https://travis-ci.org/fossasia/gci16.fossasia.org)

The student site for GCI 2016 Students.

# Contributing
Read thoroughly our [contributing guide](https://github.com/fossasia/gci16.fossasia.org/blob/gh-pages/CONTRIBUTING.md) before sending in your Pull Requests. Happy Contributing !

# Adding yourselves to student section

To add yourself to student section you need to open the file `students.yml` in `_data` folder and please
maintain the following format to enter a student:

```
- name: Your name
  github: Your github username
  image: your_image
  twitter: Your twitter id
  facebook: Your facebook id
  bio: Some bio about yourself
```
**Important: All images must be optimized before uploaded to the repo via commit or PR,
you may use any image optimizer of your choice. Also the images should be 240x240 pixels
Adding facebook, twitter, github, image are not needed but you may provide it and never
provide empty fileds like `facebook: `.**

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

# Adding Logos

To add your logos, you need to open the file `logos.yml` in the `_data` folder and please
maintain the following format to enter your logo in this website:

```
- author: Your name
  img: your_image
```

and place your logo in `/images/logos` folder and `your_image` should be the name of your file.

# Adding a mentor

To add a mentor open the file `mentors.yml` in `_data` folder and please maintain the following format
to enter a mentor:

```
- name: Mentor's name
  github: Mentor's github username
  image: mentor's_image
  twitter: Mentor's twitter id
  facebook: Mentor's facebook id
```
**Important: All images must be optimized before uploaded to the repo via commit or PR,
you may use any image optimizer of your choice. Also the images should be 240x240 pixels
Adding facebook, twitter, github, image are not needed but you may provide it and never
provide empty fileds like `facebook: `. If you really want to add them and you don't know
please ask a mentor.**

# Adding a slide

The website shows an ism slider which has slides, to input another slide please go to `slides.yml'
in the `_data` folder and maintain the following format to enter a new slide.

```
- caption: main_heading
  img: image_of_the_slide
  exp-1: First sentence explanation
  exp-2: Second sentence explanation
  exp-3: Third sentence explanation
```

**Important: Put the image in `/images/` folder and enter the name here.All images must be optimized before
uploaded to the repo via commit or PR, you may use any image optimizer of your choice. Adding action and
actionURL are not needed but you may provide it and never provide empty fileds like `action: `. Only provide
action and actionURL together.**
