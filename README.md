# SpaceForce MyNasaApp

## Team Members

	•	Cristofher Alvarado
	•	Ernest Sam Williams
	•	Ranil Dissanayaka


# How was this developed?


## Backend (Node.js, Express, GraphQL, MongoDB, Mongoose):

	1.	Node.js and Express Setup:
	•	Installed Node.js and npm on our machines.
	•	Used npm init to set up our Node.js project.
	•	Installed Express using npm install express.
	2.	GraphQL Setup:
	•	Installed required packages: npm install express-graphql graphql.
	•	We had to set up a basic GraphQL schema using tools like apollo-server.
	3.	MongoDB and Mongoose Setup:
	•	Installed MongoDB on our machines and used a cloud service.
	•	Installed Mongoose with npm install mongoose.
	•	Connected our Express app to MongoDB using Mongoose.
	4.	Define GraphQL Schema:
	•	Defined our GraphQL schema with types, queries, and mutations.
	5.	Queries and Mutations:
	•	Implemented GraphQL resolvers for queries and mutations.
	•	Used Mongoose to interact with our MongoDB database.
	6.	Authentication:
	•	Implemented user authentication using JWT. We used libraries like jsonwebtoken for this.
	7.	API Key for NASA:
	•	Obtained an API key from NASA and stored it securely.

Frontend (React, NASA API Integration, UI):

	1.	React Setup:
	•	Created a new React app using create-react-app.
	2.	NASA API Integration (Frontend):
	•	Set up a React component to fetch data from NASA’s API using fetch or axios.
	•	Displayed the retrieved data in our UI.
	3.	Polished UI:
	•	Designed a polished user interface with React components and styles.
	•	Considered using a component library like Material-UI or Ant Design for a polished look.
	4.	Interactivity:
	•	Enhanced interactivity with React features like state, props, and event handling.
	5.	Authentication (Frontend):
	•	Implemented user authentication in our React app. Managed authentication state and protected authenticated routes.
	6.	Testing:
	•	Wrote tests for both our backend and frontend components to ensure reliability.
	7.	Deployment:
	•	Deployed our app on Netlify.