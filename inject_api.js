const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');
const startTag = '<script type="module">';
const endTag = '</script>';
const startIndex = content.indexOf(startTag);
const endIndex = content.indexOf(endTag, startIndex);

const newBlock = `<script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-auth.js";
        import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, limit, deleteDoc, doc, where, setDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";
        import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-storage.js";

        window.FirebaseSDK = {
            initializeApp, getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, updateProfile,
            getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, limit, deleteDoc, doc, where, setDoc,
            getStorage, ref, uploadBytes, getDownloadURL
        };

        window.initRealFirebase = (config) => {
            window.app = window.FirebaseSDK.initializeApp(config);
            window.auth = window.FirebaseSDK.getAuth(window.app);
            window.db = window.FirebaseSDK.getFirestore(window.app);
            window.storage = window.FirebaseSDK.getStorage(window.app);
        };

        window.api = {
            login: async (email, pass) => {
                const cred = await window.FirebaseSDK.signInWithEmailAndPassword(window.auth, email, pass);
                const loginData = {
                    name: cred.user.displayName || email.split('@')[0],
                    email: cred.user.email,
                    loginTime: Date.now(),
                    device: navigator.userAgent,
                    location: 'Unknown',
                    ip: 'Unknown'
                };
                await window.FirebaseSDK.addDoc(window.FirebaseSDK.collection(window.db, 'user_logins'), loginData);
                return cred;
            },
            googleLogin: async () => {
                const provider = new window.FirebaseSDK.GoogleAuthProvider();
                const cred = await window.FirebaseSDK.signInWithPopup(window.auth, provider);
                const loginData = {
                    name: cred.user.displayName,
                    email: cred.user.email,
                    loginTime: Date.now(),
                    device: navigator.userAgent,
                    location: 'Unknown',
                    ip: 'Unknown'
                };
                await window.FirebaseSDK.addDoc(window.FirebaseSDK.collection(window.db, 'user_logins'), loginData);
                return cred;
            },
            uploadFile: async (file) => {
                if(!file) return "";
                const storageRef = window.FirebaseSDK.ref(window.storage, \`avatars/\${window.auth.currentUser.uid}_\${Date.now()}\`);
                await window.FirebaseSDK.uploadBytes(storageRef, file);
                return await window.FirebaseSDK.getDownloadURL(storageRef);
            },
            updateUserProfileImage: async (url) => {
                await window.FirebaseSDK.updateProfile(window.auth.currentUser, { photoURL: url });
                return url;
            },
            syncOfflineQueue: async () => {
                const queue = JSON.parse(localStorage.getItem('safelink_offline_queue')) || [];
                if (queue.length === 0) return 0;
                let count = 0;
                for (const alertData of queue) {
                    delete alertData._isOfflineQueued;
                    delete alertData._queuedAt;
                    await window.api.createAlert(alertData, true);
                    count++;
                }
                localStorage.removeItem('safelink_offline_queue');
                return count;
            },
            createAlert: async (alertData, isSyncing = false) => {
                if (!navigator.onLine && !isSyncing) {
                    const queue = JSON.parse(localStorage.getItem('safelink_offline_queue')) || [];
                    queue.push({ ...alertData, _queuedAt: Date.now() });
                    localStorage.setItem('safelink_offline_queue', JSON.stringify(queue));
                    return { id: 'QUEUED', ...alertData, _isOfflineQueued: true };
                }
                
                const dataToSave = {
                    userId: window.auth ? (window.auth.currentUser ? window.auth.currentUser.uid : 'anon') : 'anon',
                    status: 'Active',
                    timestamp: Date.now(),
                    ...alertData
                };
                const docRef = await window.FirebaseSDK.addDoc(window.FirebaseSDK.collection(window.db, 'alerts'), dataToSave);
                return { id: docRef.id, ...dataToSave };
            },
            getEmergencyContacts: async () => {
                if(!window.auth || !window.auth.currentUser) return [];
                const q = window.FirebaseSDK.query(window.FirebaseSDK.collection(window.db, 'emergency_contacts'), window.FirebaseSDK.where('userId', '==', window.auth.currentUser.uid));
                const snap = await window.FirebaseSDK.getDocs(q);
                return snap.docs.map(d => ({id: d.id, ...d.data()}));
            },
            addEmergencyContact: async (contact) => {
                const data = { userId: window.auth.currentUser.uid, ...contact };
                const docRef = await window.FirebaseSDK.addDoc(window.FirebaseSDK.collection(window.db, 'emergency_contacts'), data);
                return { id: docRef.id, ...data };
            },
            deleteEmergencyContact: async (id) => {
                await window.FirebaseSDK.deleteDoc(window.FirebaseSDK.doc(window.db, 'emergency_contacts', id));
                return true;
            },
            getUserLogins: async () => {
                const q = window.FirebaseSDK.query(window.FirebaseSDK.collection(window.db, 'user_logins'), window.FirebaseSDK.orderBy('loginTime', 'desc'), window.FirebaseSDK.limit(100));
                const snap = await window.FirebaseSDK.getDocs(q);
                return snap.docs.map(d => ({id: d.id, ...d.data()}));
            },
            subscribeToAlerts: (callback) => {
                const q = window.FirebaseSDK.query(window.FirebaseSDK.collection(window.db, 'alerts'), window.FirebaseSDK.orderBy('timestamp', 'desc'));
                return window.FirebaseSDK.onSnapshot(q, (snapshot) => {
                    callback(snapshot.docs.map(d => ({id: d.id, ...d.data()})));
                }, (err) => console.error(err));
            },
            subscribeToNotifications: (callback) => {
                return () => {};
            },
            requestNotificationPermission: async () => {
                if("Notification" in window) {
                    return await Notification.requestPermission();
                }
                return 'denied';
            }
        };
`;

const newContent = content.substring(0, startIndex) + newBlock + content.substring(endIndex);
fs.writeFileSync('index.html', newContent);
console.log('Successfully injected API Wrapper.');
