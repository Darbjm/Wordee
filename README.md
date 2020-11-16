# <img src='src/styles/images/Wordee_logo.svg' width='400'>

<h1>Freelance Project: Wordee</h1>
 
<h2>Problem: Brands find the process of creating, and sending briefs to copywriters with up to date brand files slow and complicated.</h2>
 
<h2>Solution: Build a web app that allows a brand to manage all its files easily while streamlining the briefing process for copywriters.</h2>
 
| Contents                      |                                |
| ----------------------------- | ------------------------------ |
| 1. [Overview](#overview)      | 6. [Future content](#future)   |
| 2. [Brief](#brief)            | 7. [Wins](#wins)               |
| 3. [Technologies used](#tech) | 8. [Blockers](#blockers)       |
| 4. [App](#app)                | 9. [Bugs](#bugs)               |
| 5. [Approach](#approach)      | 10. [Future learnings](#learn) |
 
<h2 name='overview'>Overview</h2>
 
<h3>Introduction</h3>

'A challenge for us is briefing writers as it’s often difficult to find good quality and consistent writers. The app allowed us to brief in different pieces of content easily and this was due to its design.' - James Edmunds TRIP DRINKS

I was approached by two colleagues with an idea to create a copywriting briefing tool for brands. It is now being tested by TRIP DRINKS. Wordee allows a brand to upload and update their information and files quickly and easily. It also provides a comprehensive briefing form to make it quick and easy to create a brief. The brand can easily edit and delete all information and briefs. From an admin panel, I and my colleagues can upload keyword searches for brands to access, while also downloading briefs and brand files to send to freelance copywriters.

<h3>Deployment</h3>
 
The app is deployed on Heroku and can be found here: https://wordee-app.herokuapp.com <br>
The login details are email: test@email password: pass <br>
 
<h2 name='brief'>Brief</h2>
 
- **Build a briefing tool** Create a web app that allows a brand to create, edit and delete brand information and briefs
- **Must have an admin panel** Admins must be able to download briefs and brand files
- **Writers must be access files** use external hosting for files and images
- **Have a simple design**
- **Be deployed online**
 
<h2 name='tech'>Technologies used and why?</h2>
 
I used <strong>GraphQL</strong> to reduce the amount of work the server had to do to reduce latency.<br>
I used <strong>Heroku</strong> because it comes ready to use with very little configuration compared to AWS. If the project scales, I will change to AWS due to price concerns.<br>
I used <strong>Firebox</strong> because like Heroku its a quick and simple setup to manage files and allows others to access those files via URL.<br>
I used <strong>CircleCI</strong> because I wanted to know every branch was being tested.<br>
I used <strong>React</strong> because needed the brief form to be able to react and change quickly to the user’s inputs.<br>
I used <strong>Redux</strong> because if we were to add more pages to the app we could store the users information in the store meaning we have to do less requests to the server.<br>
 
<p>1. HTML5 <br>
2. SCSS & Bulma <br>
3. JavaScript (ES6) <br>
4. Redux <br>
5. GraphQL <br>
6. Mocha <br>
7. Chai <br>
8. Express <br>
9. React.js <br>
11. Node.js <br>
12. Axios <br>
13. Jest <br>
14. Insomnia <br>
15. Dotenv <br>
16. Cloudinary <br>
17. Firebox <br>
18. CircleCI <br>
19. JWT <br>
20. Yarn <br>
21. Heroku <br>
22. GitHub <br></p>
 
<h2 name='app'>App</h2>
 
The brand will log into the app will immediately be able to edit their supporting data that will be sent to copy writers along with their briefs.The brand will be sent a report summary it can access as soon as we have sent it.<br>
<br>
<br>
<img src='readme/1.gif' width='600'>
<br>
<br>
<br>
Creating a brief is made simple by asking the brand to fill out a set of questions my colleagues thought essentially to fully explain what is needed. The brief reacts to choices made adds or removes questions accordingly.<br>
<br>
<br>
<img src='readme/2.gif' width='600'>
<br>
<br>
<br>
The brand can easily edit the brief just by clicking on its list item.<br>
<br>
<br>
<img src='readme/3.gif' width='600'>
<br>
<br>
<br>
The brand can easily change or remove their information.<br>
<br>
<br>
<img src='readme/4.gif' width='600'>
<br>
<br>
<br>
On the backend my colleagues and I are able to view brands and their information and can easily edit report summarys, download briefs to excel, and view images and files.<br>
<br>
<br>
<img src='readme/5.gif' width='600'>
 
<h2 name='approach'>Approach</h2>
My approach was to always keep the user in mind when I made every decision, for instance, my first instinct was to make a profile page and an edit profile page. However, I believe this gave the experience needless friction for the user. Therefore these pages could be combined for easy and fast manipulation. This ended making my code more simple too.
<br>
<br>
<h2 name='future'>Future content</h2>
<h3>A writers portal</h3>
We were discussing creating a writers portal and profile and I have some code commented out in the login component should we build this. However, we don't currently see any use for this<br>
<br>
<br>
<h3>Email alert system</h3>
We would like to be alerted by email if a user updates their information or edits a brief so we could send the new data to any writers who need it.<br>
<br>
<br>
<h2 name='wins'>Wins</h2>
<h3>Tested by TRIP DRINKS</h3>
[TRIP DRINKS](https://www.drink-trip.com/) Tested our app and found it very useful saying it was functional and well designed. TRIP is still using it and we are arranging user testing.<br>
'The app looked clean, was very easy to use and didn’t glitch when we were using it. There were two sections that we interacted with. <br>
1. The brand page allowed us to give writers a taste of our brand and helped them follow our brand tone of voice. In this section there was also a helpful guide showing the progress of our brief. <br>
2.	The briefing section - A challenge for us is briefing writers as it’s often difficult to find good quality and consistent writers. The app allowed us to brief in different pieces of content easily and this was due to its design.' - James Edmunds TRIP DRINKS
<br>
<br>
<h3>GraphQL</h3>
Converting the REST API to a graphQL server was challenging, but I lean't a lot and found myself using it comfortably after a while. I also used a package called Data Loader which reduced the amount of work my server had to do.
<br>
<br>
<h3>Redux</h3>
This was my first full build of Redux. I didn't find it too difficult to understand the concepts and intergrate with middleware. I didn't realise it would be so easy to use the dispatch to update the input values. I really like it now though and will continue to use it.

```
onChange={({ target: { name, value } }) =>
  dispatch(addUserInfo({ ...user, [name]: value }))
}/>
```
<br>
<h3>Design</h3>
I'm personally very happy with the design, I think it looks good and is easy to use. Getting feedback from users like TRIP saying "it's functional and well designed"
<br>
<br>
<h2 name='blockers'>Blockers</h2>
<h3>COVID-19</h3>
Due to the pandemic we are having to pause development due to this being a side project for my colleagues.
<br>
<br>
<h3>CircleCI</h3>
I seem to behaving trouble getting the backend up and therefore test it in CircleCI. I have emailed them asking for support.
<br>
<br>
<img src='readme/circle.png' width='600'>
<br>
<br>
<br>
<h2 name='bugs'>Bugs</h2>
<h3>Brand images</h3>
Sometimes when uploading brand images the images may not appear on the brand profile until the page is reloaded. I checked to see if the getData function was waiting until the upload to the backend had been completed and it was.<br>
<br>
<br>
<h2 name='learn'>Future learnings</h2>
• Use TypeScript to better avoid bugs like merging objects and arrays.<br>
• Use Storybook to test UI components.<br>
