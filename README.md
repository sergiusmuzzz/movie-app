# TMDB Movie-App

This is a Movie App built with React.

Using the [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction) the App displays a list of most popular movie titles based on movies average rating.
The app allows the user to filter movies by runtime and release dates.

The app also features infinite scrolling. When a user keep scrolling new results will be fetched and appended to the existing list. New results are based on values set in filter. 

# Demo
[TMDB Movie-App](https://main.dgmhq7jrgavj.amplifyapp.com/)

# Installing

After cloning the project from Github change directory into the folder that you've created for the project.

Run the following in the terminal

```
git clone https://github.com/sergiusmuzzz/movie-app.git
cd movie-app
npm install
npm start
```

# Libraries used
[Material UI](https://www.npmjs.com/package/@material-ui/core) for range slider

[Humanize Duration](https://www.npmjs.com/package/humanize-duration) to humanize time duration
