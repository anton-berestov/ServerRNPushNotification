const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const bodyParser = require('body-parser');
const {
	allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const app = express();

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

const hbs = exphbs.create({
	defaultLayout: 'main',
	extname: 'hbs',
	handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(bodyParser.json({ type: 'application/*json' }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));
app.use(
	express.urlencoded({
		extended: true,
	})
);

app.use('/api', homeRoutes);

const PORT = process.env.PORT || 4000;

async function start() {
	try {
		mongoose.set('strictQuery', true);
		const url = `mongodb+srv://8berestov8:tovj5TTdSxgBuw70@cluster0.kzlvehy.mongodb.net/test`;
		await mongoose.connect(url, {
			useNewUrlParser: true,
		});

		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
		});
	} catch (e) {
		console.log(e);
	}
}

start();
