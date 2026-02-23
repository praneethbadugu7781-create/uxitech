/* ========================================
   UXI — Firebase Configuration
   Admin Panel & Dynamic Content
   ======================================== */

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBI2rf3Z4YKRekRlRc6HCM1XyGMGEO7ZSE",
    authDomain: "uxitech-e00f6.firebaseapp.com",
    projectId: "uxitech-e00f6",
    storageBucket: "uxitech-e00f6.firebasestorage.app",
    messagingSenderId: "740014052323",
    appId: "1:740014052323:web:f1f6bfe214371a005b46d6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Initialize Auth
const auth = firebase.auth();

// Collection reference for works/projects
const worksCollection = db.collection('works');

/* ----------------------------------------
   Work/Project Data Functions
   ---------------------------------------- */

// Get all works from Firestore
async function getAllWorks() {
    try {
        const snapshot = await worksCollection.orderBy('createdAt', 'desc').get();
        const works = [];
        snapshot.forEach(doc => {
            works.push({ id: doc.id, ...doc.data() });
        });
        return works;
    } catch (error) {
        console.error('Error fetching works:', error);
        return [];
    }
}

// Add a new work
async function addWork(workData) {
    try {
        workData.createdAt = firebase.firestore.FieldValue.serverTimestamp();
        const docRef = await worksCollection.add(workData);
        return { success: true, id: docRef.id };
    } catch (error) {
        console.error('Error adding work:', error);
        return { success: false, error: error.message };
    }
}

// Update an existing work
async function updateWork(workId, workData) {
    try {
        workData.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
        await worksCollection.doc(workId).update(workData);
        return { success: true };
    } catch (error) {
        console.error('Error updating work:', error);
        return { success: false, error: error.message };
    }
}

// Delete a work
async function deleteWork(workId) {
    try {
        await worksCollection.doc(workId).delete();
        return { success: true };
    } catch (error) {
        console.error('Error deleting work:', error);
        return { success: false, error: error.message };
    }
}

// Get a single work by ID
async function getWorkById(workId) {
    try {
        const doc = await worksCollection.doc(workId).get();
        if (doc.exists) {
            return { id: doc.id, ...doc.data() };
        }
        return null;
    } catch (error) {
        console.error('Error fetching work:', error);
        return null;
    }
}

/* ----------------------------------------
   Authentication Functions
   ---------------------------------------- */

// Sign in with email and password
async function signIn(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Error signing in:', error);
        return { success: false, error: error.message };
    }
}

// Sign out
async function signOut() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Error signing out:', error);
        return { success: false, error: error.message };
    }
}

// Check auth state
function onAuthStateChanged(callback) {
    return auth.onAuthStateChanged(callback);
}

// Get current user
function getCurrentUser() {
    return auth.currentUser;
}
