This is simplified and cleaned part of real application for demonstration.
The real application is about buying and selling woods.

Current part of the project demonstrates a rendering of order list and order details.
By this part I wanted to show React+Redux usage in the project.
Real components contains much more logic and requests. Though current example shows simpified piece of logic.

React router includes two main routes: list of orders and order's details. List of orders component fetches data with API before mounting and renders a list with links to orders. Order component fetches order's data by id.

Each component folder usually includes:

* js file with rendering and lifecycle methods, like Order.js
* a "container" file with some external connections (like connect to redux, connect to router, etc), like OrderContainer.js
* any other additional files (styles.js, etc.)

Redux store consist of actions and reducers, devided by entities. In this project I used the "axios" library to connect to the API.

The code doesn't work as it's just a demonstration and I decided to not include backend and other tools.

Please, let me know there is any additional explanation required.
