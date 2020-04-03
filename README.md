# <img src='src/readme/ChowVow_writing.svg' width='400'>

<h1>General Assembly Project Three: Chow Vow</h1>

<h2>Goal: Within a group of four, build a full-stack RESTful MERN application.</h2>

| Contents                      |                |
| ------------------------------|----------------|
|1. [Overview](#overview)       |5. [Future content](#future)
|2. [Brief](#brief)             |6. [Wins](#wins)
|3. [Technologies used](#tech)  |7. [Blockers](#blockers)
|4. [App](#app)                 |8. [Bugs](#bugs)


<h2 name='overview'>Overview</h2>

<h3>Introduction</h3>

Chow Vow is a platform that allows users to search for other individuals that have certain skills within cooking. If you want to learn a skill from another user, you can ask that user to collaborate. The users can search via location or via skills. The app uses secure routes meaning users must be logged in to use certain features of the app like viewing others profiles, edit and delete their own profile and send offers of collaboration and accept or delete them.

<h3>Deployment</h3>

The app is deployed on Heroku and can be found here: https://chowvow-ga.herokuapp.com
The login details are  email:ben@email.com password:pass <br>
(The login details are weak to allow easy access, I have addressed this [here](#login))

<h3>Team</h3>

• <a href='https://github.com/EmilySummers'>Emily Summers</a> <br>
• <a href='https://github.com/justteaco'>Tahirah A'sha</a> <br>
• <a href='https://github.com/Tbanks9'>Tim Banks</a> <br>

<h3>My contributions</h3>

• All 60+ tests with Mocha & Chai
• Interactive, searchable Mapbox with pop-ups of users at their location that link to their profile
• Ability for users to send, accept and delete offers and delete accepted offers
• Setting up the secure route for both front and back-ends

<h3>Timeframe</h3>

7 days

<h2 name='brief'>Brief</h2>

* **Build a full-stack application** by making your own backend and your own front-end
* **Use an Express API** to serve your data from a Mongo database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Have automated tests** for _at least_ one RESTful resource on the back-end.
* **Implement thoughtful user stories/wireframes**
* **Have a visually impressive design**
* **Be deployed online**

<h2 name='tech'>Technologies used</h2>
<p>1. HTML5 <br>
2. SCSS & Bulma <br>
3. JavaScript (ES6) <br>
4. JSON <br>
5. React.js <br>
6. Node.js <br>
7. Express.js <br>
8. Axios <br>
9. Mongoose & MongoDB <br>
10. Mocha & Chai <br>
11. Insomnia <br>
12. Robo 3T <br>
13. Dotenv <br>
14. Cloudinary <br>
15. Mapbox <br>
16. Z shell <br>
17. JWT <br>
18. GitHub <br><p/>

<h2 name='app'>App</h2>

The user can begin by taking a look around the app when not logged in. They can view the map or the list of users that know a skill. As soon as they try to view anothers profile they a redirected to log in. The user can register and upload a profile image via Cloudinary or log in with their existing information.

<img src='src/readme/Register.png' width='600'>

They are able to search for any area using the Mapbox Geocoder the interactive map then displays the area and other users within it. The markers display the users profile image and then once clicked a pop-up showing their skills, rating and name appears, this is a link to the users profile where you can see their information and ask to collaborate.

<img src='src/readme/Map1.gif' width='600'>

The user has an offers page where they can view offers to collaborate and accept or delete them, they can view their accepted offers and see the accepted users email in order for them to persue their desire to collaborate.

<img src='src/readme/Offers.gif' width='600'>

<img src='src/readme/Pictures.gif' width='600'>

<img src='src/readme/Review.gif' width='600'>







