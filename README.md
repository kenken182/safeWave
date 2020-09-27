# allergyDetector
allergyDetect is a React Native iOS application that allows a user to take a photo of their meal, and will cross reference the meal's ingredients with the users list of allergies in order to determine if the user is allergic to the meal or not. Included is user-specific allergens, as well as ability to sign up and login.

allergyDetector is created using React Native, Express.js, Firebase, Google Cloud APIs, and Edamame API.

# Images 


# Not shown in the photos, however is a feature: 
(iOS simulator does not allow for photos, however on an iPhone, these are functional and tested)
- List of foods after photo is taken
- Showing the user if they are allergic or not

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
The config.js file should be located in the root of your project.

You will also need to initialize an googlecred.json file with the following:
```JavaScript
See Firebase API on how to setup your own Firestore!
```
