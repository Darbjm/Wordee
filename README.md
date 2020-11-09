# <img src='src/styles/images/Wordee_logo.svg' width='400'>

<h1>Personal Project: Wordee</h1>

<h2>Problem: Brands find the process of creating, and sending briefs to copywriters with up to date brand files slow and complicated.</h2>

<h2>Solution: Build a web app that allows a brand to manage all its files easily, while streamlining the briefing process for copywriters.</h2>

| Contents                      |                                |
| ----------------------------- | ------------------------------ |
| 1. [Overview](#overview)      | 6. [Future content](#future)   |
| 2. [Brief](#brief)            | 7. [Wins](#wins)               |
| 3. [Technologies used](#tech) | 8. [Blockers](#blockers)       |
| 4. [App](#app)                | 9. [Bugs](#bugs)               |
| 5. [Approach](#approach)      | 10. [Future learnings](#learn) |

<h2 name='overview'>Overview</h2>

<h3>Introduction</h3>

Wordee allows a brand to upload and update their information and files quickly and easily. It also provides a comprehensive briefing form to make it quick and easy to create a brief. The brand can easily edit and delete all information and briefs. From an admin panel myself and collegues can upload keyword searches for brands to access, while also downloading briefs and brand files to send to freelance copy writers.

<h3>Deployment</h3>

The app is deployed on Heroku and can be found here: https://wordee-app.herokuapp.com/ <br>
The login details are email: test@email password: pass <br>

<h3>Timeframe</h3>

7 days

<h2 name='brief'>Brief</h2>

- **Build a full-stack application** by making your own backend and your own front-end
- **Use a Python Django API** using Django REST Framework to serve your data from a Postgres database
- **Consume your API with a separate front-end** built with React
- **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
- **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
- **You May** use the React Hooks syntax on your front end, but the resposiblity of this will be largely on yourself.
- **Have a visually impressive design**
- **Be deployed online**

<h2 name='tech'>Technologies used</h2>
<p>1. HTML5 <br>
2. SCSS & Bulma <br>
3. JavaScript (ES6) <br>
4. JSON <br>
5. Python <br>
6. SQL <br>
7. PostgreSQL <br>
8. Django <br>
9. React.js <br>
10. React Hooks <br>
11. Node.js <br>
12. Axios <br>
13. Jest <br>
14. Insomnia <br>
15. Dotenv <br>
16. Cloudinary <br>
17. Mapbox <br>
18. Z shell <br>
19. JWT <br>
20. Yarn <br>
21. Heroku <br>
22. GitHub <br></p>

<h2 name='app'>App</h2>

The user can begin by taking a look around the app when not logged in. They can view the map and a few small details about the trip. As soon as they try to view a trip or profile in more detail they a redirected to log in. The user can register and upload a profile image via Cloudinary or log in with their existing information.<br>
<br>
<br>
<img src='readme/Reg.png' width='600'>
<br>
<br>
<br>
They are able to search for any area using the Mapbox built with Hooks and Mapbox Geocoder the interactive map then displays the area and trips within it. The markers display the trips image and then once clicked a pop-up showing some basic info about the trip. This is a link to the trips page where you can see more information and the user that created it.<br>
<br>
<br>
<img src='readme/Map.gif' width='600'>
<br>
<br>
<br>
The user can also see the five most recent trips that have been posted, these also work as links.<br>
<br>
<br>
<img src='readme/Others.gif' width='600'>
<br>
<br>
<br>
Finally the user can create a trip at anytime from the navbar or go to his profile and edit his information or that of his trips.<br>
<br>
<br>
<img src='readme/ProfileTrips.gif' width='600'>
<br>
<br>
<br>

<h2 name='approach'>Approach</h2>
My approach was to always keep the user in mind when I made every decisions, for instance my first instinct was to make a profile page and an edit profile page. However I believe this gave the experiance needless friction for the user. Therefore these pages could be combined for easy and fast manipulation. This eneded making my code more simple too.
<br>
<br>
<h2 name='future'>Future content</h2>
<h3>A writers portal</h3>
We were discussing creating a writers portal and profile and I have some code commented out in the login component should we build this. However we don't currently see any use for this<br>
<br>
<br>
<h3>Email alert system</h3>
We would like to be alerted by email if a user updates their information or edits a brief so we could send the new data to any writers who need it.<br>
<br>
<br>
<h2 name='wins'>Wins</h2>
<h3>Tested by TRIP DRINKS</h3>
[TRIP DRINKS](https://www.drink-trip.com)
<br>
<br>
<h3>GaphQL</h3>

<br>
<br>
<h3>Redux</h3>

<br>
<br>
<h3>Design</h3>

<br>
<br>
<h2 name='blockers'>Blockers</h2>
<h3>Email feedback</h3>
I struggled to get our email alert system to work with Heroku's deployment. I will continue to work on this when the project is taken off ice.

```javascript
handleChange = (e) => {
  const data = { ...this.state.data, [e.target.name]: e.target.value };
  const errors = { ...this.state.errors, [e.target.name]: "" };
  this.setState({ data, errors });
};
```

<br>
<br>
<br>
<img src='readme/Formfeedback.png' width='600'>
<br>
<br>
<br>
<h2 name='bugs'>Bugs</h2>
<h3>Reload page</h3>
Unfortunately a major bug of the app seems to be it is unable to refresh or reload the page you are on. If you do it seems to try and look in the back-end for the address. If this happens you must start from the home address.<br>
<br>
<br>
<img src='readme/Reload.png' width='600'>
<br>
<br>
<br>
<h3>SCSS</h3>
The create trip and edit trip pages have a small issue of the form taking up too much space to fit on the page nicely.<br>
<br>
<br>
<img src='readme/SCSSBug.png' width='600'>
<br>
<br>
<br>
<h2 name='learn'>Future learnings</h2>
• Look into the reload bug and how this works<br>
