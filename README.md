# Movies

A cross-platform mobile app that allows users to get details about a movie including trailers, and recommendations using TMDB API. Users can search for a specific movie or explore from various categories. Also, users can manage their watch list.

## Screenshots

<div align="center">
  <img src="https://github.com/itayg43/Movies/assets/93944494/1b5c3240-6158-4f9c-86d2-02f1a04a7ab9" width="225" alt="Search Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/4181e11e-a31c-4fb0-a49d-e8d8fa4b1193" width="225" alt="Explore Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/ec93f0db-da81-47aa-8279-0df23d272109" width="225" alt="Movie Details Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/b048c57c-470d-473b-b30d-188553c191ff" width="225" alt="Watch List Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/1418efca-3bc1-450d-8999-b56e3eff442e" width="225" alt="Login Screen">

  <img src="https://github.com/itayg43/Movies/assets/93944494/17a4a41b-c625-4c08-9cd8-ad3e56471ba9" width="225" alt="Register Screen">
</div>

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

* React Native Flipper - For debugging.

### Backend: Node.js & Express (TypeScript)

* Prisma (MySQL) - Running MySQL server locally in a docker container.

* Redis - Running locally in a docker container.

* Zod - Request validation.

* JWT - Generate and validate tokens (access, and refresh) using RSA256 (private, and public keys).

* Bcryptjs - Hash and validate password.

  #### Modules:
    
    * Each module is separated into layers: router, controller, service, data access, and cache access if necessary.
    
    1. Auth - handle login, register, and reissue access token.
    
    2. Movies - handle get movies by category, get movies by search query, and get movie details by id.
         * In order to minimize calls to the TMDB API the data is stored in the cache with TTL, and when a request is received there is a middleware that            checks if the requested data already exists in the cache, if yes - return it immediately, otherwise get it from the API, store it, and then                 return it.
    
    3. Users - handle get watch list, add to watch list, and soft delete from watch list.
 
