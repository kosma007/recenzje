const admin = require("firebase-admin");
const { getFirestore } = require("firebase-admin/firestore");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config({ path: ".env.local" });
console.log("PROJECT:", process.env.FIREBASE_PROJECT_ID);
console.log("EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("KEY EXISTS:", !!process.env.FIREBASE_PRIVATE_KEY);
// 🔥 INIT
admin.initializeApp({
  credential: admin.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore();

// 📦 JSON
const games = JSON.parse(fs.readFileSync("./data/reviews.json", "utf-8"));

function safeId(id) {
  return String(id).replaceAll("/", "_").replaceAll(" ", "_");
}

async function upload() {
  const col = db.collection("gry");

  for (const game of games) {
    console.log("👉 uploading:", game.gamename);

    await col.doc(safeId(game.game)).set(game);

    console.log("✔ OK:", game.gamename);
  }

  console.log("🔥 DONE");
}

upload();