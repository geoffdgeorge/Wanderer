const express = require(`express`);
const htmlRoutes = require(`./backend/htmlRoutes`);
const apiRoutes = require(`./backend/apiRoutes`);

const app = express();

const PORT = process.env.PORT || 5500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`./frontend`));

htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});
