# Dothings
Fully functioning Todo-List Application with Vue/Vuetify/Vuex/Firebase.
Live Preview: https://dothingss.netlify.app/

![image](https://user-images.githubusercontent.com/50014916/82885718-cc74fc00-9f45-11ea-9e08-cd31f563713c.png)

## Main Features

- Ability to add todos
- Ability to create categories
- Authentication & Role based authorization
- Todos & Categories private to each account
- Error handling
- Clean UI & UX

## Pictures

![image](https://user-images.githubusercontent.com/50014916/82886065-49a07100-9f46-11ea-8de5-d5bc412ce9ea.png)
![image](https://user-images.githubusercontent.com/50014916/82886120-5cb34100-9f46-11ea-9e37-fc106fd4064d.png)
![image](https://user-images.githubusercontent.com/50014916/82886288-9f751900-9f46-11ea-8566-95c7484b4790.png)

## Available Scripts
1. `npm run serve` => To start the development server.
2. `npm run build` => To create the production build.
3. `npm run lint` => To run eslint on project files.

## Installation Instructions
1. Run `npm install` to install packages
2. Create a file in the root folder called `firebase.js` and fill it with:
```javascript
import firebase from "firebase";
import "firebase/firestore";

let firebaseConfig = {
 // YOUR FIREBASE CONFIG
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const fireStore = firebaseApp.firestore();

export default fireStore;
```
