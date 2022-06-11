const express = require('express');
const bodyParser = require('body-parser');

const promotionRouter = express.Router();

promotionRouter.use(bodyParser.json());

promotionRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Will send all the promotion to you!');
})
.post((req, res, next) => {
    res.end('Will add the promotion: ' + req.body.name );
})
.put((req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})
.delete((req, res, next) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:promotion')
.all((req,res,next)=>{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get((req,res,next)=>{
    res.end('Will send details of the promotion: ' + req.params.promotion +' to you!');
})
.post((req, res, next) => {
    res.statusCode = 403;
  res.end('POST operation not supported on /promotions/'+ req.params.promotion);
})
.put((req, res, next) => {
    res.end('Updating the promotion: ' + req.params.promotion + '\n');
})
.delete((req, res, next) => {
    res.end('Deleting promotion: ' + req.params.promotion);
});
module.exports = promotionRouter;