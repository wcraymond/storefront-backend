# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: 
  
  `GET /products`

- Show: 

  `GET /products/:id`

- Create [token required]: 

  `POST /products`

- [OPTIONAL] Top 5 most popular products: 

  `GET /top-five-products`

- [OPTIONAL] Products by category (args: product category): 

  `GET /products/category/:category`

#### Users
- Index [token required]:

  `GET /users`

- Show [token required]

  `GET /users/:id`

- Create [token required]

  `POST /users`

#### Orders
- Current Order by user (args: user id)[token required]

  `GET /current-orders-by-user/:id`

- [OPTIONAL] Completed Orders by user (args: user id)[token required]

  `GET /completed-orders-by-user/:id`

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Database Tables
#### users

```sql
CREATE TABLE users (
  id         SERIAL       PRIMARY KEY,
  username   VARCHAR(50)  NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name  VARCHAR(100) NOT NULL,
  password   VARCHAR      NOT NULL
);
```

#### products

```sql
CREATE TABLE products (
  id       SERIAL       PRIMARY KEY,
  name     VARCHAR(100) NOT NULL,
  price    INTEGER      NOT NULL,
  category VARCHAR(250)
);
```

#### orders

```sql
CREATE TABLE orders (
  id      SERIAL       PRIMARY KEY,
  status  VARCHAR(10),
  user_id INTEGER      REFERENCES users(id)
);
```

#### orders_products

```sql
CREATE TABLE order_products (
  id         SERIAL   PRIMARY KEY,
  quantity   INTEGER,
  order_id   INTEGER  REFERENCES orders(id),
  product_id INTEGER  REFERENCES products(id)
);
```
