const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const { auth, db } = require("./config");
const { collection, getDocs, addDoc, query, where } = require("firebase/firestore");

const app = express();

app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/signup", (req, res) => {
  res.render("signup");
});

app.get("/quiz", (req, res) => {
  res.render("index");
});

async function addSignupData(firstname, lastname, email, password) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const docRef = await addDoc(collection(db, "users"), {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword
    });
    console.log("Document written with ID: ", docRef.id);
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

async function verifyUser(email, password) {
  try {
    const q = query(collection(db, "users"), where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return false;
    }

    let user = null;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    const match = await bcrypt.compare(password, user.password);
    return match; // Cocokkan password
  } catch (e) {
    console.error("Error verifying user: ", e);
    return false;
  }
}

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const isValidUser = await verifyUser(email, password);
  if (isValidUser) {
    res.redirect("/quiz");
  } else {
    res.render("login", { message: "Invalid email or password" });
  }
});

app.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const success = await addSignupData(firstname, lastname, email, password);
  if (success) {
    res.redirect("/");
  } else {
    res.render("signup", { message: "Error signing up. Please try again." });
  }
});

const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});

module.exports = { auth, db };
