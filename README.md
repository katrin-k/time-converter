## Live version
You can find the latest version on http://die-katrin.eu/timeconverter.

## Credits
The idea for this time converter was inspired by [a tweet by Wes Bos](https://twitter.com/wesbos/status/955832235512532992).
I took on this idea as a way to practice creating a little react app, playing with dates&times and test some things from my learnings wish list (such as different CSS options for a React app, accessibility and tests).

Wes Bos also mentioned a feature wishlist, which I'll pick up and try to realize over time:
* S and MS Timestamp to Date
* Date Picker to S and MS timestamp
* Ability to pick timezone
* Display current, live timestamp  
* Ability to add time. eg: Now + 3 Hours
* Readable dates for everything

## Fork and develop locally
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find many helpful information on their Github repo.

I'm using it as is. This means, Webpack comes out of the box and is not ejected. For this little app, tweaking performance is not my priority.  
I've added these node packages for functionality:
* [momentJS](https://momentjs.com/docs)
* [react-copy-to-clipboard](https://www.npmjs.com/package/react-copy-to-clipboard)

If you want to develop locally, follow these steps:
1. Fork this repo.
2. In your terminal, go to the desired directory and type `git clone <clone-link from github>`.
3. `cd time-converter`.
4. Start the app by running `npm start`.

## How I deployed the app
My web hoster is offering an Apache server. The out-of-the-box create-react-app is rendered on the client side. Thus it is possible to run the npm build command and upload (copy&paste) the files to my web space.

I've uploaded the app to a subdirectory. Therefor I added this line to the `package.json`:
`"homepage": ".",`
This sets the `%PUBLIC_URL%` path relative to the index.html. Should I ever want to change the directory or URL for this app, I can do so on my server without the need to re-build this app. 

When deploying (in my case this is a fancy word for uploading the build output) to my Apache server, I created an `.htaccess` file in the public folder of the app and pasted these lines:
```
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]
```

At last, create the production ready app:
1. Run `npm run build` in the terminal.
2. Go to the FTP client and upload the content of the build folder. 
3. Remove `.DS_Store` files.

You can find all these and many more information for other use cases and server options in the [Deployment section of the create-react-app's Readme](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#deployment).