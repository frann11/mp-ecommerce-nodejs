var express = require('express');
var exphbs  = require('express-handlebars');
const { checkoutMercadoPago } = require('./checkout');
var port = process.env.PORT || 3000

var app = express();
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));


app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    console.log(req.query)
    res.render('home',req.query);
});

app.get('/detail', async function (req, res) {
    var url = req.protocol + '://' + req.get('host');
    req.query = {...req.query,url}
    res.render('detail', req.query);
});

app.post('/detail', async function (req, res) {
    const {body} = await checkoutMercadoPago({url:req.body.url,img:req.body.img,unit:req.body.unit,productName:req.body.title, productPrice: parseInt(req.body.price)})
    const {init_point, id} = body
    res.redirect(init_point)
    //const {productName, productPrice} = req.body
    
});

app.post('/payments/notification', function (req, res) {
    console.log(req.body)
    res.status(200).send('OK')
})
app.listen(port);