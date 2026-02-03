const express = require("express");
const router = express.Router();
const { v4: uuid } = require("uuid");

let orders = require("../data/orders.json");

router.get("/", (req, res) => {
  res.json(orders);
});

router.post("/", (req, res) => {
  const order = {
    id: uuid(),
    customer: req.body.customer,
    product: req.body.product,
    price: req.body.price
  };
  orders.push(order);
  res.json(orders);
});

router.delete("/:id", (req, res) => {
  orders = orders.filter(o => o.id !== req.params.id);
  res.json(orders);
});

module.exports = router;
