import { app } from "./app.js";
import { configEnv } from "./config/env.config.js";

// port
const port = configEnv.port;

const main = () => {
	app.listen(port, () => {
		console.log(`server is running port : ${port}`);
	});
};

main();
