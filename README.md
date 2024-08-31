# Vendor Management System

This is a Node.js-based Vendor Management System built using the ExpressJs framework. The system allows for the management of vendor profiles, tracking of purchase orders, and calculation of vendor performance metrics.


## Features

- Vendor Profile Management: Create, read, update, and delete vendor profiles

- Purchase Order Tracking: Create, read, update, and delete purchase orders

- Performance Metrics: Calculate and retrieve vendor performance metrics, including on-time delivery rate, quality rating average, average response time, and fulfillment rate


## Technologies Used

- Javascript
- Node.js
- Express.Js
- MongoDB

## Installation

1. Clone the repository:

   ```bash
   git clone `https://github.com/ShubhamAgarwal-11/Vendor-Management-System.git`


# API Endpoints

## Vendor Profile

- `POST /vendors`: Create a new vendor
    ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/v1725133553/yash%20images/zkjulxohigezpaow11gq.jpg)


- `GET /vendors`: List all vendors
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1725133553/yash%20images/jerglmkkdztkuqsmubok.jpg)

- `GET /vendors/:vendorId`: Retrieve a specific vendor's details
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1725133553/yash%20images/k1sw9n3lvz5wx2aswjmr.jpg)

- `PUT /vendors/:vendorId`: Update a vendor's details


- `DELETE /vendors/:vendorId`: Delete a vendor


## Purchase Order


- `POST /purchase-orders`: Create a new purchase order
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1725133553/yash%20images/hbp7xvy2lulumfvwoade.jpg)


- `GET /purchase-orders`: List all purchase orders
   ![Alt text](https://res.cloudinary.com/daf7blofc/image/upload/c_fill,g_auto,h_250,w_970/b_rgb:000000,e_gradient_fade,y_-0.50/c_scale,co_rgb:ffffff,fl_relative,l_text:montserrat_25_style_light_align_center:Shop%20Now,w_0.5,y_0.18/v1725133553/yash%20images/gscvtckksldw8y87xgt6.jpg)

- `GET /purchase-orders/:poId`: Retrieve details of a specific purchase order


- `PUT /purchase-orders/:poId`: Update a purchase order


- `DELETE /purchase-orders/:poId`: Delete a purchase order


## Metrics
- `GET /vendors/:vendorId/performance`: Retrieve a vendor's performance metrics


# Setup Instructions

- Clone the repository using `git clone`.

- Install dependencies using `npm install` or `yarn install`.

- Start the application using `npm run start` or `yarn start`.

- Use a tool Postman to test the API endpoints.