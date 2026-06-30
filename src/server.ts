import app from "./app";
import { configEnv } from "./config/env.config";

// port
const port = configEnv.port;

const main = () => {
  app.listen(port, () => {
    console.log(`server is running port : ${port}`);
  });
};

main();
