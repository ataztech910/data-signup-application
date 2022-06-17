import { appConfig } from "../config";
import server from "./api/server";

const port = appConfig.port;
server.listen(port, () => {
  console.log(`Running signature service on port ${port}`);
});