const app = require("./app.js");
const port = 1050;

app.listen(port, () => {
  if (err) console.log(`err: ${err}`);
  else console.log(`Listening on port ${port}`);
});
