var currentUser;
// function userSavePost() {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);
//     //the posts ID from firebase, important so we can suck the info off it

//     firebase.auth().onAuthStateChanged(user => {
//         if (user) {
//             currentUser = db.collection("users").doc(user.uid)
//             currentUser.get()
//                 .then((userDoc) => {
//                     var bookmarks = userDoc.data().bookmarks;
//                     if (bookmarks.includes(ID)) {
//                         currentUser.update({
//                             // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//                             // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//                             bookmarks: firebase.firestore.FieldValue.arrayRemove(ID)
//                         })
//                             .then(function () {
//                                 console.log("bookmark has been removed for" + ID);
//                                 //let iconID = 'save-' + ID;
//                                 //console.log(iconID);
//                                 //this is to change the icon of the hike that was saved to "filled"
//                                 document.getElementById("saved").innerText = 'bookmark_border';
//                             });
//                         //document.getElementById('save-' + docID).innerText = 'bookmark_border';
//                     }
//                     else {
//                         currentUser.update({
//                             // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
//                             // This method ensures that the ID is added only if it's not already present, preventing duplicates.
//                             bookmarks: firebase.firestore.FieldValue.arrayUnion(ID)
//                         })
//                             // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
//                             .then(function () {
//                                 console.log("bookmark has been saved for" + ID);
//                                 //let iconID = 'save-' + ID;
//                                 //console.log(iconID);
//                                 //this is to change the icon of the hike that was saved to "filled"
//                                 document.getElementById("saved").innerText = 'bookmark';
//                             });
//                     }

//                 });
//         } else {
//             console.log("No user is signed in");
//         }
//     })

// }
// profileLink()



var currentUser;

async function userSavePost() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    //console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it

    firebase.auth().onAuthStateChanged(async user => {
        // Check if user is signed in:

        if (user) {

            let savedRef = db.collection('users').doc(user.uid).collection('saved').doc(ID);


            // console.log('Looking for document with ID:', ID);
            // console.log('Document Reference:', savedRef.path);  // This will print the full document path

            const userDoc = await savedRef.get();
            //console.log('Document data:', userDoc.ID);
            // if (userDoc.exists) {
            //     console.log("Document exists!");
            // } else {
            //     console.log("Document does not exist.");
            // }
            //if it exists, give the username!
            if (userDoc.exists) {
                removeRef = db.collection('users').doc(user.uid).collection("saved").doc(ID);
                removeRef.delete()
                    .then(() => {
                        console.log("unsaved post");
                        document.getElementById("saved").innerText = 'bookmark_add';
                    })
                    .catch((error) => {
                        console.error("Error deleting document: ", error);
                    })

            } else {
                let y = db.collection('users').doc(user.uid);
                let userSaved = y.collection('saved');
                userSaved.doc(ID).set({})
                    .then(() => {
                        console.log("added the favourite!");
                        document.getElementById("saved").innerText = 'bookmark';
                    })
            }
        }
        else {
            console.log("user is not logged in");
        }
    })
}



async function savedPage() {
    firebase.auth().onAuthStateChanged(async user => {
        // Check if user is signed in:
        if (user) {
            let collectionRef = db.collection('users').doc(user.uid).collection('saved');

            // Fetch all documents in the collection
            const querySnapshot = await collectionRef.get();

            // Check if the collection is empty
            if (querySnapshot.empty) {
                console.log("No documents found.");
                return;
            }

    
            for (const doc of querySnapshot.docs) {
                try {
                    console.log(`Processing document ID: ${doc.id}`);
                    //const data = doc.data();
                    const postID = doc.id;
                    await loadPosts(postID);
                    //db.collection("posting").doc(postID)
                    // db.collection("posting").doc(postID).get()
                    //     .then(async (postDoc) => {
                    //         let details = postDoc.data().details;
                    //         let profile = postDoc.data().profile;
                    //         let title = postDoc.data().title;
                    //         var postID = postDoc.id;
                    //         console.log(details);
                    //         const user = await getUserName(profile);


                    //     })

                    
                } catch (error) {
                    console.error("Error processing document:", error);
                }
            }
        }
        else {
            console.log("not logged in");
        }
    });
}

savedPage();


// //fix soon -ethan


// db.collection('posting').doc(userDoc)
//     .get()
//     .then(async (userDoc) => {
//         for (const doc of userDoc.docs) {
//             // This is a similar way for .forEach but it allows async functions to be called during it
//             //we need to because we need to query the username
//             let details = doc.data().details;
//             let profile = doc.data().profile;
//             let title = doc.data().title;
//             var postID = doc.id;          //Use this to pass it into the URL
//             //console.log(postID);

//             const user = await getUserName(profile);
//         }
//     }