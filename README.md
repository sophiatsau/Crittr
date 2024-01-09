# Crittr
A GrubHub-inspired platform for animal enthusiasts to buy and sell their critters! Gotta collect them all!

# Live Link
https://crittr.onrender.com/

## Tech Stack
<!-- List of techs/languages/plugins/APIs used
<a href="https://skillicons.dev">
  <img src="https://skillicons.dev/icons?i=python,flask,javascript,react,redux,css,html,docker,postgres,sqlite,aws" />
</a> -->

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /><img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" /> <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
<img src="https://img.shields.io/badge/Sqlite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" /> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
<img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" />
<img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
<img src="https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />
<img src="https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white" />
<img src="https://img.shields.io/badge/Google_Cloud-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white" />
<img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white" />

# Index
[Database Schema](https://github.com/sophiatsau/Crittr/wiki/DB-Schema) | [Feature Lists](https://github.com/sophiatsau/Crittr/wiki/Features-List) | [Future Implementations](https://github.com/sophiatsau/Crittr/wiki/Future-Implementations) | [User Stories](https://github.com/sophiatsau/Crittr/wiki/User-Stories)


## Screenshots
### Landing Page
Enter your address to view shops around you!

### Shop Page
Check out the different animals being sold!

### Profile Page
Here, you can add, edit, or remove your addresses.

If you are a shop owner, you can manage your shops and critters.

# Endpoints
### Auth
| Request  | Purpose | Return Value | Status |
| :------- | :------ | :----------- | :------ |
| GET /api/auth/  | On initial load and subsequent refreshes, returns logged in user if there is one | {<br/>&nbsp;&nbsp;&nbsp;id: INT, <br/>&nbsp;&nbsp;&nbsp;username: STRING, <br/>&nbsp;&nbsp;&nbsp;email: STRING, <br/>&nbsp;&nbsp;&nbsp;firstName: STRING, <br/>&nbsp;&nbsp;&nbsp;lastName: STRING, <br/>&nbsp;&nbsp;&nbsp;balance: DECIMAL} | 200 |
| POST /api/auth/login | Logs in user. Successful login returns user dictionary |{<br/>&nbsp;&nbsp;&nbsp;id: INT, <br/>&nbsp;&nbsp;&nbsp;username: STRING, <br/>&nbsp;&nbsp;&nbsp;email: STRING, <br/>&nbsp;&nbsp;&nbsp;firstName: STRING, <br/>&nbsp;&nbsp;&nbsp;lastName: STRING, <br/>&nbsp;&nbsp;&nbsp;balance: DECIMAL}| 200 |
| GET /api/auth/logout | Logs current user out |{message: User logged out}| 200 |
| POST /api/auth/signup | Signs user up with provided info. Creates new user, logs them in, and returns user dictionary |{<br/>&nbsp;&nbsp;&nbsp;id: INT, <br/>&nbsp;&nbsp;&nbsp;username: STRING, <br/>&nbsp;&nbsp;&nbsp;email: STRING, <br/>&nbsp;&nbsp;&nbsp;firstName: STRING, <br/>&nbsp;&nbsp;&nbsp;lastName: STRING, <br/>&nbsp;&nbsp;&nbsp;balance: DECIMAL}| 200 |
<!-- | GET /api/auth/unauthorized | Returns errors when flask-login authentication fails |{errors: {user: Unauthorized}}| 403 | -->
<!-- | GET /api/auth/oauth_login | Redirects user to Google Oauth login if user chooses to login or sign up via Google account |redirect(authorization_url)| 302 |
| GET /api/auth/callback | If Google account authorization successful, creates new user if user doesn't exist, logs user in, and redirects user to landing page |redirect(landing page URL)| 302 | -->

### User

Technical implementation details
Anything you had to stop and think about before building
Descriptions of particular challenges
Snippets or links to see code for these
Links to contact you (LinkedIn)
Endpoints (See example below)*

# Connect With Me!
<a href="https://www.linkedin.com/in/sophiatsau/">LinkedIn</a>
