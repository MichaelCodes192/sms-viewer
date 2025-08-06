const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// 5 virtual US numbers from freephonenum.com
const NUMBERS = [
  { id: 1, number: "+12025368925" },
  { id: 2, number: "+12025368975" },
  { id: 3, number: "+12025368936" },
  { id: 4, number: "+12025368949" },
  { id: 5, number: "+12025368982" },
];

// Home page
app.get("/", (req, res) => {
  res.render("index", { numbers: NUMBERS });
});

// Inbox page
app.get("/number/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const selected = NUMBERS.find(n => n.id === id);
  if (!selected) return res.status(404).send("Number not found.");

  const inboxURL = `https://www.freephonenum.com/us/messages/${selected.number.replace('+', '')}/`;

  let messages = [];
  try {
    const response = await axios.get(inboxURL);
    messages = response.data;
  } catch (err) {
    console.error("Error fetching messages:", err.message);
  }

  res.render("inbox", {
    number: selected,
    messages,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
