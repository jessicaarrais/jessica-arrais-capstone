# jessica-arrais-capstone

## Description

InstaHome is a real estate app for individuals seeking short-term rental properties. One of the biggest challenges faced by users is the overwhelming number of long-term rental options that flood other real estate websites. InstaHome solves the problem by being a dedicated website where users can effortlessly search for short-term rental properties.

[Table of Contents]
[Features and user flow]
[Instalation]
[End Points]
[Conclusion]
[Features]

## Features

Create an account;
Login;
Browse properties through a list;
Browse properties on the map;
Use the card on the list or the marker on map to browse to property page;
If landlord, manage properties;

## Endpoints

# PROPERTIES

# GET /api/properties

Gets all properties from database
Response body example: JSON
`[
  {
    "id": "13",
    "user_id": "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
    "address": "456 Oak St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "area": "1000 sqft",
    "price": "$1500/month",
    "fees": "$150/month",
    "availability": "Available in 3 weeks",
    "bedrooms": "2",
    "bathrooms": "1",
    "description": "Recently renovated apartment with modern finishes",
    "features": "New appliances, granite countertops",
    "amenities": "Laundry, parking",
    "pictures": "https://images.squarespace-cdn.com/content/v1/54d253cde4b09edbe7f6c6fe/1423070385488-JGE18IPMVEFBLL2OB0NJ/image-asset.jpeg?format=2500w,https://shhoonya.com/wp-content/uploads/2020/01/home-interiors-1280x720.jpg",
    "created_at": "2023-04-10T18:51:43.000Z",
    "updated_at": "2023-04-10T18:51:43.000Z",
    "type": "apartment",
    "pets": 1,
    "lat": 40.747992,
    "lng": -74.004764
  }
]`

# GET /api/properties/:propertyId

Gets specific property
Response body example: JSON
`{
  "id": "13",
  "user_id": "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
  "address": "456 Oak St",
  "city": "New York",
  "state": "NY",
  "country": "USA",
  "area": "1000 sqft",
  "price": "$1500/month",
  "fees": "$150/month",
  "availability": "Available in 3 weeks",
  "bedrooms": "2",
  "bathrooms": "1",
  "description": "Recently renovated apartment with modern finishes",
  "features": "New appliances, granite countertops",
  "amenities": "Laundry, parking",
  "pictures": "https://images.squarespace-cdn.com/content/v1/54d253cde4b09edbe7f6c6fe/1423070385488-JGE18IPMVEFBLL2OB0NJ/image-asset.jpeg?format=2500w,https://shhoonya.com/wp-content/uploads/2020/01/home-interiors-1280x720.jpg",
  "created_at": "2023-04-10T18:51:43.000Z",
  "updated_at": "2023-04-10T18:51:43.000Z",
  "type": "apartment",
  "pets": 1,
  "lat": 40.747992,
  "lng": -74.004764
}`

# POST /api/properties/:userId/add

Adds a property
Request body example: JSON
`{
    "user_id": "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
    "address": "456 Oak St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "area": "1000 sqft",
    "price": "$1500/month",
    "fees": "$150/month",
    "availability": "Available in 3 weeks",
    "bedrooms": "2",
    "bathrooms": "1",
    "description": "Recently renovated apartment with modern finishes",
    "features": "New appliances, granite countertops",
    "amenities": "Laundry, parking",
    "pictures": "https://images.squarespace-cdn.com/content/v1/54d253cde4b09edbe7f6c6fe/1423070385488-JGE18IPMVEFBLL2OB0NJ/image-asset.jpeg?format=2500w,https://shhoonya.com/wp-content/uploads/2020/01/home-interiors-1280x720.jpg",
    "type": "apartment",
    "pets": 1,
    "lat": 40.747992,
    "lng": -74.004764
}`

Response body example: JSON
`[
  {
    "id": "13",
    "user_id": "8f16bd30-bab5-40af-aca2-b63d5fdd1acc",
    "address": "456 Oak St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "area": "1000 sqft",
    "price": "$1500/month",
    "fees": "$150/month",
    "availability": "Available in 3 weeks",
    "bedrooms": "2",
    "bathrooms": "1",
    "description": "Recently renovated apartment with modern finishes",
    "features": "New appliances, granite countertops",
    "amenities": "Laundry, parking",
    "pictures": "https://images.squarespace-cdn.com/content/v1/54d253cde4b09edbe7f6c6fe/1423070385488-JGE18IPMVEFBLL2OB0NJ/image-asset.jpeg?format=2500w,https://shhoonya.com/wp-content/uploads/2020/01/home-interiors-1280x720.jpg",
    "created_at": "2023-04-10T18:51:43.000Z",
    "updated_at": "2023-04-10T18:51:43.000Z",
    "type": "apartment",
    "pets": 1,
    "lat": 40.747992,
    "lng": -74.004764
  }
]`

# PATCH /api/properties/:propertyId/update

Updates a property
Request body example: JSON
`{
  "fees": "$300"
}`

Response body example: JSON
`Property information updated`

# DELETE /api/properties/:propertyId/:userId/delete

Deletes a property
Response body example: JSON
`Property propertyId successfully deleted.`

# USER

# GET /api/users

Gets all users from database
Response body example: JSON
`[
  {
    "id": "3ce124a4-78b0-4d80-91b9-11f9ced631a7",
    "first_name": "Brad",
    "last_name": "McDonald",
    "email": "bradmc@gmail.com"
  }
]`

# GET /api/users/:userId

Gets a specific user and its properties, if applicable
Response body example: JSON
`[
  {
    "id": "3ce124a4-78b0-4d80-91b9-11f9ced631a7",
    "username": "bradmc",
    "first_name": "Brad",
    "last_name": "McDonald",
    "email": "bradmc@gmail.com",
    "has_privileges": 1
  },
  `if applicable`
  {
    "id": "89898957-04ba-4bd0-9f5c-a7aea7447963",
    "user_id": "3ce124a4-78b0-4d80-91b9-11f9ced631a7",
    "address": "321 Pine St",
    "city": "New York",
    "state": "NY",
    "country": "USA",
    "area": "900 sqft",
    "price": "$1200/month",
    "fees": "$75/month",
    "availability": "Available now",
    "bedrooms": "1",
    "bathrooms": "1",
    "description": "Cozy studio apartment in downtown",
    "features": "Hardwood floors, high ceilings",
    "amenities": "Laundry, parking",
    "pictures": "https://media.istockphoto.com/id/1151903312/photo/brownstone-facades-row-houses-in-an-iconic-neighborhood-of-brooklyn-heights-in-new-york-city.jpg?s=612x612&w=0&k=20&c=_nw1CPPZ3nbn9COeUx7UfMLDHmDbebVyOQbBUXAHacQ=",
    "created_at": "2023-04-10T18:51:43.000Z",
    "updated_at": "2023-04-10T18:51:43.000Z",
    "type": "apartment",
    "pets": 1,
    "lat": 40.689247,
    "lng": -74.044502
  }
]`

# GET /api/users/:userId/update

Updates a user
Request body example: JSON
`{
  "has_privileges": true
}`

Response body example:
`User information updated`

# POST /api/users/signup

# POST /api/users/login

# PATCH /api/users/:userId/update

Updates a user
Request body example: JSON
`{
  "username": "BradMac"
}`

Response body example:
`"User information updated"`

# DELETE /api/user/:userId

Deletes a user
Response body example:
`User userId successfully deleted.`

## Installation

1 - Clone this repository: `git clone https://github.com/jessicaarrais/jessica-arrais-capstone.git`;
2 - Go to client and server directories and install dependencies for each of them: `npm install`;
3 - Set up database: `mysql -u root -p`;
4 - Create database and use it: `CREATE DATABASE capstone` then `USE capstone`;
5 - Set up knex: `npm run migrate` then `npm run seed`;
6 - Create an .env file based on .env.example updating it with your information;
7 - Start client: `npm start`;
8 - Start server: `npm nodemon index`.

## Conclusion

Tech Stack Front-End:
[REACT]
[SAAS]
[AXIOS]
[Google Maps Api]

Tech Stack Front-End:
[Node Js]
[Express]
[knex]
[MySQL]

## Next steps

1 - Implement google maps showing directions from a point of interest;
2 - Implement messaging within the application to facilitate the comunication between renter and landlord;
3 - Implement more filters options;
4 - Expand to cities other than New York;
5 - Make the design responsive;
