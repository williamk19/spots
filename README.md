# This is "Spots" App

A simple React appliaction that connected with Spotify using API. 
There are some main features of **Spots App** 
- Users can login using their Spotify account from clickable button.\
  This feature will redirect user to Spotify login page
- Users also can search song through searchbox when they already login.\
  This searchbox can save temporary query and run it when the search \
  button is clicked.
- List of song can be selected and deselected so the users can create \
  a playlist from their selected song.

And i add some additional features to this app.
- After login users can see their profile picture and spotify display name
- Users can logout from their account by clicking the button below display name
- Add MSW for mock API async call
  
## Here's steps to run this application locally on your machine
First, you need to install all the package needed to\
run this appliacation. Using this command below to\
install all the library.

```
npm install
```

Then, you must get your spotify API key from spotify\
developer dashboard. Make a new file .env.local in root folder\
Write this environment variable below.
```
REACT_APP_SPOTIFY_API_KEY = {SOME_KEY}
```

After finishing setup the API key, go to the App.js and find\
isPublish variable. If you're running this app in local machine\
you need to set this variable into false.
```
const isPublish = false;
```

Finally you can run this app by using the run command,
```
npm start
```