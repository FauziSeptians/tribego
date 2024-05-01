import { apps } from "./src/apps/web.js";

const PORT = 5000;

apps.listen(PORT, () => {
  console.log("listening " + PORT);
});
