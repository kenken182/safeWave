var express = require('express');
var router = express.Router();
var firebase = require("firebase");
var admin = require('firebase-admin')
const db = admin.firestore();

const getUserData = async (userId) => {
  const usersRef = db.collection('users').doc(userId)
  const doc = await usersRef.get()
  return doc
}

// GET MEETING DATA
router.post('/getOne', async (req, res) => {
  try {
    const meetingTitle = req.body.meetingTitle
    const meetingsRef = await db.collection('meetings').doc(meetingTitle)
    const doc = await meetingsRef.get()
    res.send(doc.data())
  } catch(err) {
    console.log(req.body)
    res.sendStatus(404)
  }
});

// GET ALL MEETINGS
router.get('/getAll', async (req, res) => {
  try {
    const citiesRef = db.collection('meetings');
    const snapshot = await citiesRef.get();
    const result = []
    snapshot.forEach(doc => {
      result.push(doc.data())
    });
    res.send(result)
  } catch(err) {
    res.sendStatus(404)
  }
});

// CREATE MEETING
router.post('/create', async (req, res) => {
  try {
    const title = req.body.title
    const description = req.body.description
    const userId = req.body.userId
    const organizer = req.body.organizer
    const address = new admin.firestore.GeoPoint(parseInt(req.body.latitude), parseInt(req.body.longitude))
    //const date = admin.firestore.Timestamp.fromDate(new Date(req.body.date))
    //const attendees = req.body.attendees
    // const public = req.body.public // true for public, false for private
    const data = {
      title: title,
      description: description,
      userId: userId,
      organizer: organizer,
      address: address, 
      //date: date,
      attendees: [],
      //public: public,
    }
    const response = await db.collection('meetings').doc(title).set(data);
    res.send(200)
  } catch(err) {
    res.send(404, err)
  }
});

// ADD HOSTING TO USER
router.post('/addHostingToUser', async (req, res) => {
  const userId = req.body.userId
  const meetingTitle = req.body.meetingTitle
  try {
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      hosting: admin.firestore.FieldValue.arrayUnion(meetingTitle)
    })
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(404)
  }
});

// JOIN MEETING
router.post('/join', async (req, res) => {
  const userId = req.body.userId
  const meetingTitle = req.body.meetingTitle
  try {
    const meetingsRef = db.collection('meetings').doc(meetingTitle);
    await meetingsRef.update({
      attendees: admin.firestore.FieldValue.arrayUnion(userId)
    })
    const userRef = db.collection('users').doc(userId);
    await userRef.update({
      attending: admin.firestore.FieldValue.arrayUnion(meetingTitle)
    })
    res.sendStatus(200)
  } catch(err) {
    res.sendStatus(404)
  }
});

module.exports = router;
