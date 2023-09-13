# Movies

A cross-platform mobile app that allows users to get details about a movie including trailers, and recommendations using TMDB API. Users can search for a specific movie or explore from various categories. Also, users can manage their watch list.

<div align="center">
  <img src="https://github.com/itayg43/Movies/assets/93944494/1b5c3240-6158-4f9c-86d2-02f1a04a7ab9" width="225" alt="Search Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/4181e11e-a31c-4fb0-a49d-e8d8fa4b1193" width="225" alt="Explore Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/ec93f0db-da81-47aa-8279-0df23d272109" width="225" alt="Movie Details Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/b048c57c-470d-473b-b30d-188553c191ff" width="225" alt="Watch List Screen">
</div>

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

* React Native Flipper - For debugging.
