# SafeWave
SafeWave is a webapp made using Firebase Firestore that helps create events and gatherings for people. However, for Covid-19 reasons, we have decided to limit each gathering to 10 people! The goal is to help people's mental health. 

# Images
![Picture1](https://i.imgur.com/ZiSIhtB.png)
![Picture2](https://i.imgur.com/ig8fLky.png)
![Picture3](https://i.imgur.com/wlfS7Gf.png)
![Picture4](https://i.imgur.com/QZ6f6O9.png)

# Requirements 
In order to use this, you need to initialize a Firebase app. A config.js file is needed with a variable called firebaseConfig, like this:

```JavaScript
export const firebaseConfig = {
    apiKey: "x",
    authDomain: "x",
    databaseURL: "x",
    projectId: "x",
    storageBucket: "x",
    messagingSenderId: "x",
    appId: "x",
    measurementId: "x",
    googleCloudVisionApiKey: "x",
  };
```
The firebaseconfig.js file should be located in the root of your project and in the root of your frontend in client.

You will also need to initialize an googlecred.json file with the following:
```JavaScript
See Firebase API on how to setup your own Firestore!
```
