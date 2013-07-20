# 54
##### A beautiful, responsive, retina-ready website.

Crafted with care, to serve as the face of a very special event.

## Notes

 * Check in npm dependencies; this is a website.
 * `LESS` files are compiled on app init.
 * Front-end framework is Bootstrap + Designmodo's Flat UI.
 * All images must be retina ready, and leave your PSD in `/psds` so others can use it

## Local Development

 1. Install [Node.js](http://nodejs.org)
 2. Install [Heroku Toolbelt](https://toolbelt.heroku.com)
 3. [Fork This Repo](https://github.com/ben-ng/54/fork)
 4. Clone your fork `git clone https://github.com/your-username/54.git`
 5. Enter the directory `cd ~/some_dir/54`
 6. Install dependencies `npm install && npm install -g geddy`
 7.	Create the text file `~/some_dir/54/.env` with the contents:
 
 	```
 	NODE_ENV=development
	WORKERS=1	
 	```
 	
 8. Start the app with `foreman start`
 9. Visit `http://localhost:8080`

## Contributing

Found a typo or bug? Send me a pull request!

### Templates

 * Application Layout: `/views/layouts/application.html.ejs`
 * Landing page: `/views/main/index.html.ejs`

### Styles

 * 54 Specific Overrides: `/public/less/54.less`
