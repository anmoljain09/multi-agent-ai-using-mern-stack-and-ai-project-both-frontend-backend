/*

Is code ka kaam hai **React frontend ko Firebase se connect karna aur Firebase Authentication ready karna**.

Line by line samjho:

---

### 1. Firebase SDK import karna

```js
import { initializeApp } from "firebase/app";
```

Ye Firebase app ko start karne ka function hai.

Matlab:

> Firebase ko apne frontend project ke saath connect karo.

---

```js
import { getAuth, GoogleAuthProvider } from "firebase/auth";
```

Yahan Firebase Authentication ke do tools import ho rahe hain:

### `getAuth`

Ye Firebase Auth service banata hai.

Example:

```js
const auth = getAuth(app);
```

Iske through:

* login
* logout
* user check
* token lena

sab kar sakte ho.

### `GoogleAuthProvider`

Ye Google login ke liye provider hai.

Example:

```js
const provider = new GoogleAuthProvider();
```

Ye Firebase ko batata hai:

> User Google account se login karega.

---

## 2. Firebase Configuration

```js
const firebaseConfig = {
```

Ye object Firebase project ki details rakhta hai.

Ye details Firebase Console se milti hain.

---

### API Key

```js
apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
```

Ye tumhari Firebase project key hai.

Yahan tumne `.env` se value li hai:

`.env`

```env
VITE_FIREBASE_API_KEY=xxxxx
```

Aur code me:

```js
import.meta.env.VITE_FIREBASE_API_KEY
```

se aa jayegi.

---

### Auth Domain

```js
authDomain: "multi-agent-ai-c4d29.firebaseapp.com",
```

Firebase ka login domain.

Google login ke time redirect ke kaam aata hai.

---

### Project ID

```js
projectId: "multi-agent-ai-c4d29",
```

Firebase project ka unique naam.

---

### Storage Bucket

```js
storageBucket: "multi-agent-ai-c4d29.firebasestorage.app",
```

Agar Firebase Storage use karoge:

* images
* files
* documents

to yahi use hoga.

---

### Messaging Sender ID

```js
messagingSenderId: "1037399457450",
```

Firebase Cloud Messaging (notifications) ke liye.

---

### App ID

```js
appId: "1:1037399457450:web:6208997d8c6c36be2a9ad3"
```

Tumhare web app ki unique identity.

---

# 3. Firebase initialize karna

```js
const app = initializeApp(firebaseConfig);
```

Yahan actual connection ban raha hai.

Matlab:

```
React App
    |
    |
initializeApp()
    |
    |
Firebase Project
```

Ab `app` Firebase se connected hai.

---

# 4. Authentication ready karna

```js
export const auth = getAuth(app);
```

Ye Firebase Auth object bana raha hai.

Ab kisi component me:

```js
import { auth } from "./firebase";
```

karke use kar sakte ho.

Example:

```js
signInWithPopup(auth, provider);
```

---

# 5. Google Login Provider banana

```js
export const googleProvider = new GoogleAuthProvider();
```

Ye Google login ka object bana raha hai.

Use:

```js
import { googleProvider } from "./firebase";

signInWithPopup(auth, googleProvider);
```



*/



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "multi-agent-ai-c4d29.firebaseapp.com",
  projectId: "multi-agent-ai-c4d29",
  storageBucket: "multi-agent-ai-c4d29.firebasestorage.app",
  messagingSenderId: "1037399457450",
  appId: "1:1037399457450:web:6208997d8c6c36be2a9ad3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


/*

getAuth()
Firebase ke andar Authentication service ka object bana raha hai.
Ye object ke andar methods hoti hain:
auth.signInWithPopup()
auth.signOut()
auth.currentUser

new GoogleAuthProvider()
Firebase ko bol raha hai:
Mujhe Google login ka provider bana ke do.
Ye Google account ke through login karne ke liye configuration object hai.


signInWithPopup(auth, googleProvider);
Yahan:
auth → Firebase ka login system
googleProvider → Google se login karne ka tarika

*/