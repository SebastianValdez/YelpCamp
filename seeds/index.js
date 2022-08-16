const mongoose = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log('Database Connected')
})

const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) { // ! Creating 50 different camps using the names in cities.js / seedHelpers.js and combining them randomly
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            author: '62f2cfc10d43e160d1b1424b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque nihil, minus eveniet amet alias deleniti veritatis molestiae quisquam magnam voluptas qui eaque eum illum voluptatibus architecto numquam vero, debitis temporibus!',
            price: price,
            images: [
                {
                  url: 'https://res.cloudinary.com/sebscloud/image/upload/v1660491709/YelpCamp/n5x2rqmwxakp4vagwv8i.jpg',
                  filename: 'YelpCamp/n5x2rqmwxakp4vagwv8i',
                }
              ]
        })
        await camp.save()
    }
}

seedDB()
.then(() => {
    mongoose.connection.close() // ! Close connection so that the database cant be update again afterwards
})

// ! Seeding a databased is when you insert random data in the database before anything else is done
// ! Here I am adding random city names in the database which will later be used when making camps and such
