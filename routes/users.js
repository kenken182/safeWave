var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var admin = require('firebase-admin')
const db = admin.firestore();

// SIGN UP POST
router.post('/signUp', async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(async (result) => {
      const userUid = result.user.uid
      const data = {
        userId: userUid,
        attending: [],
        hosting: [],
      }
      await db.collection('users').doc(userUid).set(data);
      res.sendStatus(200)
    }).catch(err => {
      console.log(err)
      res.sendStatus(404, err)
    })
});

// SIGN IN POST
router.post('/signIn', async (req, res) => {
  const email = req.body.email
  const password = req.body.password
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(async (result) => {
    console.log(result)
    res.sendStatus(200)
  }).catch(err => {
    console.log(err)
    res.sendStatus(404)
  })
});

// GET ATTENDING
router.get('/attending', async (req, res) => {
  try {
    const userId = req.body.userId
    const meetingsRef = await db.collection('users').doc(userId)
    const doc = await meetingsRef.get()
    res.send(doc.data().attending)
  } catch(err) {
    res.sendStatus(404)
  }
});

// GET HOSTING
router.get('/hosting', async (req, res) => {
  try {
    const userId = req.body.userId
    const meetingsRef = await db.collection('users').doc(userId)
    const doc = await meetingsRef.get()
    res.send(doc.data().hosting)
  } catch(err) {
    res.sendStatus(404)
  }
});
module.exports = router;
