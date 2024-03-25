import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { useCollection } from "vuefire";
// ... other firebase imports

export const firebaseApp = initializeApp({
    apiKey:process.env.API_KEY,
    projectId:process.env.PROJECT_ID
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'Employeelist')
export const dat = useCollection(collection(db, "Employeelist"));