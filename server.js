// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/cart') {
    res.json(req.body);
  } else if (req.method === 'GET' && req.path.startsWith('/cart')) {
    const cartItems = router.db
      .get('cart')
      .value()
      .map((item) => ({
        id: item.id,
        image: item.image,
        name: item.name,
        userId: item.userId,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.totalPrice,
        paymentPlan: item.paymentPlan,
        paymentPlanDetails: item.paymentPlanDetails,
        deliveryDate: item.deliveryDate,
        interest: item.interest,
      }));
    res.json(cartItems);
  } else {
    next();
  }
});

server.use(router);
server.listen(3003, () => {});
