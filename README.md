# 54

This website is the first impression we will make on most people. Make it count.

**Make this website so beautiful that visitors want to be a part of the event it represents.**

[![Build Status](https://travis-ci.org/Illinois-Founders/54.png)](https://travis-ci.org/Illinois-Founders/54)

## Notes

 * Check in npm dependencies; this is a website.
 * `LESS` files are compiled when the app starts. The command for that is `foreman start`.
 * `ejs` templates are compiled on every page load; there is no need to restart the app.
 * Front-end framework is Bootstrap + Designmodo's Flat UI.
 * All images must be retina ready, and leave your PSD in `/psds` so others can use it

## Local Development

 1. Install [Node.js](http://nodejs.org)
 2. Install [Heroku Toolbelt](https://toolbelt.heroku.com)
 3. [Fork This Repo](https://github.com/Illinois-Founders/54/fork)
 4. Clone your fork `git clone https://github.com/your-username/54.git`
 5. Enter the directory `cd ~/some_dir/54`
 6. Install dependencies `npm install && npm install -g geddy`
 7.	Create the text file `~/some_dir/54/.env` with the contents:

 	```
  NODE_ENV=development
  WORKERS=1
  GEDDY_SECRET=Jssya6sJfyiX1DYjRXPIrGaSW61SnBQjmhQq9RRKb
 	```

 8. Start the app with `foreman start`
 9. Visit `http://localhost:4000`

## Contributing

Found a typo or bug? Send us a pull request!

### Templates

 * Application Layout: `/views/layouts/application.html.ejs`
 * Landing Page: `/views/main/index.html.ejs`
 * Student Contributor Application: `/views/student_responses/form.html.ejs`

### Styles

 * 54 Specific Overrides: `/public/less/54.less`

## License
MIT

