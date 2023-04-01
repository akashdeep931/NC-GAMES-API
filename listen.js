const app = require("./app.js");
const { PORT = 1050 } = process.env;

app.listen(PORT, () => {
  if (err) console.log(`err: ${err}`);
  else console.log(`Listening on port ${PORT}`);
});
