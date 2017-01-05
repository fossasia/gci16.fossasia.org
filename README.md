# gci16.fossasia.org

[![Join the chat at https://gitter.im/fossasia/gci16.fossasia.org](https://badges.gitter.im/fossasia/gci16.fossasia.org.svg)](https://gitter.im/fossasia/gci16.fossasia.org?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![Build Status](https://travis-ci.org/fossasia/gci16.fossasia.org.svg)](https://travis-ci.org/fossasia/gci16.fossasia.org)

The student site for GCI 2016 Students.

# Contributing

Thoroughly read our [contributing guide](https://github.com/fossasia/gci16.fossasia.org/blob/gh-pages/CONTRIBUTING.md) before sending in your Pull Requests. Happy Contributing!

# Adding a mentor

To add a mentor open the file `mentors.yml` in `_data` folder and please maintain the following format *EXACTLY* (replacing values where indicated):

```yaml
- name: Mentor's name
  github: Mentor's github username
  image: mentor's_image
  twitter: Mentor's twitter id
  facebook: Mentor's facebook id
  lat: Mentor's latitude
  lng: Mentor's longitude
```

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include social media accounts, please do not provide empty fields like `facebook:`. Ask the mentors if you do not know their accounts.
- If you do not know the mentors' location, ask them to go to the official FOSSASIA geolocation website <https://fossasia.github.io/geolocation> and give you their latitude and longitude.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. the name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict it to 13 letters (including spaces), otherwise it might be truncated automatically. However, the name will be displayed completely when you hover on it on the website.

# Adding yourselves to student section

To add yourself to student section you need to open the file `students.yml` in `_data` folder and please maintain the following format *EXACTLY* (replacing values where indicated):

```yaml
- name: Your name
  github: Your github username
  image: your_image
  twitter: Your twitter id
  facebook: Your facebook id
  bio: Some bio about yourself
  lat: Your latitude
  lng: Your longitude
```

**IMPORTANT:**

- All images must be optimized before uploaded to the repo via commit or PR. You may use any image optimizer of your choice.
- The images should be 240 x 240 pixels.
- Adding Facebook, Twitter, Github, etc. is not obliged. But if you do not want to include your social media accounts, please do not provide empty fields like `facebook:`.
- To find your lattitude and longitude go to the official FOSSASIA geolocation website <https://fossasia.github.io/geolocation>.
- Avoid changing the whole file just to add yourself. Line endings should not change.
- Avoid using contractions such as *can't, don't,* etc. If there is no choice (e.g. your name has single quote mark) put double quotes (`"`) around that part.
- Try to use abbreviations in your name wherever possible, i.e. restrict your name in 13 letters (including spaces), otherwise your name might be truncated automatically. However, your name will be displayed completely when you hover on it on the website.

# Blog Post

To add your blog post, you need to open the file `blogs.yml` in `_data` folder. Maintain the following format *EXACTLY* (replacing values where indicated) to enter your blog in this website.

```yaml
- name: Your name
  blog: https://yourbloglink.com
  blog_img: your_image
  article: Article title
  article_link: https://yourarticlelink.com
```

**IMPORTANT:**

- The image should be placed inside `images/blogs` folder, and `your_image` should be the file's name, for example `mypost.png`. Make sure that the images are in 16:9 aspect ratio.
- If you do not provide a blog image, a default image will be displayed.
- Adding article and article_link is optional, unless your task requires it.

# Adding Logos

To add your logos, you need to open the file `logos.yml` in the `_data` folder and please
maintain the following format *EXACTLY* (replacing values where indicated) to enter your logo in this website:

```yaml
- author: Your name
  img: your_image
```

and place your logo in `/images/logos` folder and `your_image` should be the name of your file.

**IMPORTANT:**

- Please resize your image to 400px x 400px (w x h) OR in relative proportion before uploading. We don't want logos that have high dimensions or large size.
- The students uploading the images of dimensions below those mentioned above, would not be accepted as they would disturb the UX of the site. Please make the logo in the proportion to the dimensions mentioned above, crop/resize by any softwares or online tools, upload, and create a pull request.

# Adding a slide

The website shows an ism slider which has slides, to input another slide please go to `slides.yml` in the `_data` folder and maintain the following format *EXACTLY* (replacing values where indicated) to enter a new slide.

```yaml
- caption: main_heading
  img: image_of_the_slide
  exp-1: First sentence explanation
  exp-2: Second sentence explanation
  exp-3: Third sentence explanation
```

**IMPORTANT:**

- Put the images in the `/images/` folder. All images must be optimized before uploaded to the repo via commit or PR, you may use any image optimizer of your choice.
- Adding `action` and `actionURL` is not obliged. If you do not add, please do not provide empty fields like `action:`. If you do, please provide both `action` and `actionURL`.
- Try to equalize the length of `exp-1`, `exp-2`, and `exp-3` in combination with `action`.

# Finding Support

Probably the easiest way to seek help is to comment on your Task instance. Please understand that it is not easy for mentors to stay available 24/7 to reply to every comment.

You can instead participate in various chatrooms where you can ask both students and mentors for help. Here are few links to chatrooms that you could join for support:

1. Slack
2. Visit [here](http://fossasia-slack.herokuapp.com/) to get invitation to join the chatrooms of FOSSASIA in slack.
3. Once you get the invitations in your mail, sign into the [slack](http://fossasia.slack.com)
   and join the [#gci](https://fossasia.slack.com/messages/gci/) chatroom.
4. And now you can share your queries with all the mentors and students of FOSSASIA
5. Gitter
6. Visit [here](https://gitter.im/) and sign in with your GitHub account.
7. After thats it simply joining the chatrooms by clicking on **Join Room**
8. Here are some links to some of project's chatroom:
   - [Open Event](https://gitter.im/fossasia/open-event)
   - [Open Event WebApp](https://gitter.im/fossasia/open-event-webapp)
   - [Open Event Android](https://gitter.im/fossasia/open-event-android)
   - [loklak](https://gitter.im/loklak/loklak)
9. Google Groups
10. Visit [here](https://groups.google.com/forum/#!forum/fossasia) and join the
    mailing list.

You can find more information about different mailing lists and chatrooms for
different projects (here)[http://labs.fossasia.org/#projects]
