const express = require("express");
const server = express();
const useRoute = require("./routers/useRouter");
server.use(express.json());

server.use("/users", useRoute);

server.listen(8000, () => {
  console.log("Listening at http://localhost:8000");
});
