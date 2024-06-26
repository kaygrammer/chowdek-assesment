# Kitchen API

The Kitchen API is a RESTful service designed for a restaurant management platform. It allows vendors (restaurants) to manage their menus and customers to view menus and restaurant information.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Technologies Used](#Technologies-Used)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [License](#license)

## Features

- Vendors can list, create, update, and delete their menu items.
- Customers can list vendors, view vendor information, and view menu items.
- User authentication for customers.
- Postman documentation for easy API reference.

## Getting Started

## Technologies Used

- Node.js

- Express.js

- JavaScript

- MYSQL

- Sequelize

## Installation

To install and run App locally, follow these steps:

1. Clone the repository:

```
git clone https://github.com/kaygrammer/chowdek-assesment.git
```

2. Install dependencies:

```
cd src
npm install
```

3. Add a .env file with the database credentials and JWT SECRET.(Find below the test credentials)

```
JWT_SECRET = topsecrete
DATABASE = sql8716171
USERNAME = sql8716171
PASSWORD = s7iHAKIrge
HOST = sql8.freemysqlhosting.net
```

4. Start the application:

```
npm run dev
```

5. Open your web browser and navigate to `http://localhost:4000` to access the app root.

```
Make sure to to add the .env file at the root of the project. This will ensure that users can easily set up and run the application locally.
```

6. Kindly find the documentation with example requests and responses at:

```
https://documenter.getpostman.com/view/15577989/2sA3JNaLR4

### Running the Application

2. Access the API at `http://localhost:4000`.

## API Endpoints

### Authentication Endpoints

- `POST /api/customers/auth/sign-up` - Register a new customer.
- `POST /api/customers/auth/log-in` - Login a customer.
- `GET /api/vendors/auth/sign-up` - Register a new vendor.
- `GET /api/vendors/auth/log-in` - Login a new vendor.

### Customer Endpoints

- `GET /api/menus` - List all Menus.
- `GET /api/menus/all/:vendorId` - List all Menus of a particular vendor.
- `POST /api/menus/:id` - Get a particular menu.

### Vendor Endpoints

- `POST /api/menus` - Create a menu.
- `PUT /api/menus/:id` - Update a menu by ID.
- `GET /api/menus/:id` - Get Menu By ID.
- `PUT /api/menus/all/:vendorId` - Get All menu associated to the vendor.
- `DELETE /api/menus/:id` - Delete a menu.
```
