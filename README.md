# YelpCamp
![image](https://user-images.githubusercontent.com/34383033/212562346-97baa638-8da9-4fd2-924f-705942209d2c.png)
![image](https://user-images.githubusercontent.com/34383033/212562415-8c26c92b-df94-4f72-a1ce-8fa69a893237.png)
YelpCamp is a full-stack web application where users can create, view, and review campgrounds. This project functions similary to the Yelp.com website and was the
feature project from Colt Steele's Web Dev course on Udemy.
# Features
- Create, Edit, and Delete campgrounds
- Create, Edit, and Delete reviews and view other user reviews
- User account login and registration, all manipulation of campgrounds only owned by user
- View campground location using implemented interactive map
# Technologies Used
- HTML/CSS
- BootStrap CSS
- JavaScript
- JQuery
- Node.js
- Express.js
- MongoDB
# Install locally
1. Create a cloudinary account to get an API key and secret code
2. Create an .env file in the root of the project and add:

`
DATABASEURL='<url>'
API_KEY='<key>'
API_SECRET='<secret>'
`

Run `mongod` in one terminal and use `nodemon app.js` in the terminal with the project.
The site will be hosted on localhost:3000
