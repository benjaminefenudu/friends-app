const express = require("express");
const app = express();

app.use(express.json());

// Import all products CRUD processes from router
const Friends = require("./routes/friends");

const PORT = process.env.PORT || 3000;

// Set base route to "localhost:PORT/products"...
app.use("/friends", Friends);

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))