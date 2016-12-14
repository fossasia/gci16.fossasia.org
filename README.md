# gci16.fossasia.org

[![Join the chat at https://gitter.im/fossasia/gci16.fossasia.org](https://badges.gitter.im/fossasia/gci16.fossasia.org.svg)](https://gitter.im/fossasia/gci16.fossasia.org?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
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

**Also try to use abbrivation in your name wherever possible.**
Try to strict your name in 13 letter (including spaces) otherwise your name might be
truncated automatically.

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

**Important: The image should be added inside blogs folder which is in the images folder, and `your_image` should be the file's
name, for example 'mypost.png'. Make sure that the images are in 16:9 aspect ratio.**
Also adding article and article_link is optional, unless your task recommends it.

# Adding Logos

To add your logos, you need to open the file `logos.yml` in the `_data` folder and please
maintain the following format to enter your logo in this website:

```
- author: Your name
  img: your_image
```

and place your logo in `/images/logos` folder and `your_image` should be the name of your file.

**Please resize your image to 400px x 400px (w x h) OR in relative proportion
before uploading.
We don't want image of high dimensions or of big file size for logo.**
The students uploading the images of dimensions below those mentioned above, would also not be
aceepted as they would disturb the UX of the site. Please make the logo in the proportion to
the dimensions mentioned above, and crop/resize using any preferred softwares or online tool and
then upload and do PR.

# Adding a mentor

To add a mentor open the file `mentors.yml` in `_data` folder and please maintain the following format
to enter a mentor:

```
- name: Mentor's name
  github: Mentor's github username
  image: mentor's_image
  twitter: Mentor's twitter id
  facebook: Mentor's facebook id
  lat: Mentor's latitude
  lng: Mentor's longitude
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

# Finding Support

Probably the easiest way is to comment in the Task page for any kind of help,
but as you should understand that it is not easy for mentors to stay available
24/7 to reply to every comments. Therefore they have have managed various
chatrooms for us to take part in. This doesn't only make contacting mentors
easier but also allows us students to help each other. Here are few links to
chatrooms where you could join for support.

1. Slack
  * Visit [here](http://fossasia-slack.herokuapp.com/) to get invitation to join the chatrooms of FOSSASIA in slack.
  * Once you get the invitations in your mail, sign into the [slack](http://fossasia.slack.com)
  and join the [#gci](https://fossasia.slack.com/messages/gci/) chatroom.
  * And now you can share your queries with all the mentors and students of FOSSASIA
2. Gitter
  * Visit [here](https://gitter.im/) and sign in with your GitHub account.
  * After thats it simply joining the chatrooms by clicking on **Join Room**
  * Here are some links to some of project's chatroom:
      * [Open Event](https://gitter.im/fossasia/open-event)
      * [Open Event WebApp](https://gitter.im/fossasia/open-event-webapp)
      * [Open Event Android](https://gitter.im/fossasia/open-event-android)
      * [loklak](https://gitter.im/loklak/loklak)
3. Google Groups
  * Visit [here](https://groups.google.com/forum/#!forum/fossasia) and join the
    mailing list.

You can find more information about different mailing lists and chatrooms for
different projects (here)[http://labs.fossasia.org/#projects]
