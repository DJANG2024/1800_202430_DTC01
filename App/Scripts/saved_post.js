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
// //fix soon -ethan
// var currentUser;
// async function displaySavedIcon() {

//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it
//     var user = firebase.auth().currentUser;

//     if (user) {
//         // Reference to the document in the profiles collection
//         currentUser.get().then(userDoc => {
//             //get the user name
//             var bookmarks = userDoc.data().bookmarks;
//             if (bookmarks.includes(ID)) {
//                 document.getElementById('saved').innerText = 'bookmark';
//             }
//             else{
//                 document.getElementById('saved').innerText = 'bookmark_add';
//             }
//         })
//     } else {
//         console.log("No such post!");
//     }

// }
