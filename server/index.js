const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
	cors({
		origin: ["http://localhost:3000", "https://elderly-cms.netlify.app"],
		credentials: true
	})
);

//db connection
const connection = require('./db');

//Routes
app.use('/api/user', require('./routes/api/user'));
app.use('/api/invoice', require('./routes/api/invoice'));
app.use('/api/schedule', require('./routes/api/schedule'));
app.use('/api/auth', require('./routes/api/auth'));


const PORT = process.env.PORT || process.env.LocalPort;

const server = app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

process.on('unhandledRejection', (err, promise) => {
	console.log(`Logged Error: ${err}`);
	server.close(() => process.exit(1));
});
