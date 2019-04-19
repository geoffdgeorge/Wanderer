const express = require(`express`);
const htmlRoutes = require(`./htmlRoutes`);
const apiRoutes = require(`./apiRoutes`);

const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

htmlRoutes(app);
apiRoutes(app);

app.listen(PORT, () => {
    console.log(`App listening on PORT ${PORT}`)
})