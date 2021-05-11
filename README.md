# CS 4220 - Current Trends in Web Development - Final

## Requirements:

### Use custom node module from midterm (meal-hunt)

### server.js
* Start the server
* Must require in routes
* Application level middleware

### search.js
* GET /search?ingredient=<ingredientName>
  * Use ingredient query parameters to get meal results from themealdb API
  * Store ingredient query parameters, number of results, timestamp, and list of meals returned in MongoDB to create a search history
  * Do not store query when no meal results are returned
  * Respond to a successful request with status code 200 and required keys (id of meal and meal name)
  * Respond to query with 404 status code when no meals are returned
* POST /search
  * Use the id from request body to search themealdb for the recipe
  * Respond to a successful request with status code 200, the meal name, and the recipe given by themealdb API
  * Respond to an unsuccessful request with status code 404 and a proper error message

### history.js
* GET /history/search
  * Return all of the searches that are stored in the database
  
## Setup
* Clone the repository
* Run npm install inside the meal-server directory
* Create a .env file inside meal-server directory that contains the following 4 keys for the MongoDB cluster:
  * DB_CLUSTER
  * DB_NAME
  * DB_USERNAME
  * DB_PASSWORD
* Start up the server using npm start
