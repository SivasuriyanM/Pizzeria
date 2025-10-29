# Pizzeria App & Server

This project is a full-stack pizza ordering application, consisting of a React frontend and a Node.js/Express backend with microservices architecture.

## Project Structure
    pizzeriapp/ # React frontend (Vite + Redux)
    pizzeriaserver/ # Backend microservices (Express + MongoDB)
    ├─ pizzaslist/ # Pizza listing service
    ├─ ingredients/ # Ingredients service
    ├─ users/ # User & cart service
    └─ pizzeriagateway/ # API Gateway (Express Gateway)

## Features

- **Frontend (pizzeriapp):**
  - Browse pizzas and ingredients
  - User authentication (login/signup)
  - Add pizzas to cart, customize pizzas, build your own pizza
  - View and manage shopping cart
  - Responsive UI with Bootstrap

- **Backend (pizzeriaserver):**
  - Microservices for pizzas, ingredients, users/cart
  - MongoDB for data storage
  - RESTful APIs for all operations
  - API Gateway for unified access

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local instance)

### Backend Setup

1. **Install dependencies for each service:**
   ```sh
   cd pizzeriaserver/pizzaslist && npm install
   cd ../ingredients && npm install
   cd ../users && npm install
   cd ../pizzeriagateway && npm install 

2. **Start MongoDB:**
 default: mongodb://127.0.0.1:27017/PIZZERIADB.

3. **Run backend services:**
    ```sh
    cd pizzeriaserver/pizzaslist && npm start
    cd ../ingredients && npm start
    cd ../users && npm start
    cd ../pizzeriagateway && npm start



### Frontend Setup

1. **Install dependencies:**
    ```sh
    cd pizzeriapp
    npm install

2. **Run the frontend:**
    ```sh
    npm run dev

3. **Access the app:**
Open http://localhost:5173 (default Vite port).

### API Endpoints
    **All APIs are proxied via the gateway at http://localhost:8080:**
    /getpizzas — List pizzas
    /getingredients — List ingredients
    /users — User registration
    /users/login — User login
    /users/cart/:userid — Get user cart
    /users/addtocart — Add pizza to cart
    /users/addmodified — Add customized pizza
    /users/addurownpizza — Build your own pizza
    /users/removefromcart — Remove item from cart
    /users/updatequat — Update cart item quantity

### Technologies Used
- Frontend: React, Redux Toolkit, Axios, Bootstrap, Vite
- Backend: Express, Mongoose, MongoDB, Express Gateway
- Other: Jade/Pug templates (for backend views), CORS

### Customization
Add new pizzas/ingredients via MongoDB or service endpoints.
Modify UI in pizzeriapp/src/Components/.

### License
This project is for educational/demo purposes.
