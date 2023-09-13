# Movies

A cross-platform mobile app that allows users to get details about a movie including trailers, and recommendations using TMDB API. Users can search for a specific movie or explore from various categories. Also, users can manage their watch list.

## Stack

### Frontend: React Native (TypeScript)

* React Native Paper

* React Navigation:
  1. Auth Stack (Login & Register screens).
  2. AppBottomTabs (Search & Explore & WatchList stacks).

* Redux Toolkit & Redux Persist (Async Storage):
  1. Auth slice.
  2. Watch list slice.

* Axios - Create an instance with the backend base URL and interceptors:
  1. Request - Set authorization header with an access token from encrypted storage.
  2. Response of 401 - Try to reissue an access token using the refresh token, if succeeded replace the token in storage with the new one, otherwise log out the user.

* React Hook Form & Zod: Manage Login, and Register forms.

* React Native Fast Image & Flash List - For better performance.
