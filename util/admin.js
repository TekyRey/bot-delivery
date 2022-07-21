var admin = require("firebase-admin");

var serviceAccount = require("../kiwibot-32fd0-firebase-adminsdk-68jw7-e09ac0068d.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
module.exports = { admin, db };
