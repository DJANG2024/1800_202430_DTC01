var currentUser;
function userSavePost() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);
    //the posts ID from firebase, important so we can suck the info off it
    var user = firebase.auth().currentUser;

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid)
            currentUser.get()
                .then((userDoc) => {
                    var bookmarks = userDoc.data().bookmarks;
                    if (bookmarks.includes(ID)) {
                        currentUser.update({
                            // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
                            // This method ensures that the ID is added only if it's not already present, preventing duplicates.
                            bookmarks: firebase.firestore.FieldValue.arrayRemove(ID)
                        })
                            .then(function () {
                                console.log("bookmark has been removed for" + ID);
                                //let iconID = 'save-' + ID;
                                //console.log(iconID);
                                //this is to change the icon of the hike that was saved to "filled"
                                document.getElementById("saved").innerText = 'bookmark_border';
                            });
                        //document.getElementById('save-' + docID).innerText = 'bookmark_border';
                    }
                    else {
                        currentUser.update({
                            // Use 'arrayUnion' to add the new bookmark ID to the 'bookmarks' array.
                            // This method ensures that the ID is added only if it's not already present, preventing duplicates.
                            bookmarks: firebase.firestore.FieldValue.arrayUnion(ID)
                        })
                            // Handle the front-end update to change the icon, providing visual feedback to the user that it has been clicked.
                            .then(function () {
                                console.log("bookmark has been saved for" + ID);
                                //let iconID = 'save-' + ID;
                                //console.log(iconID);
                                //this is to change the icon of the hike that was saved to "filled"
                                document.getElementById("saved").innerText = 'bookmark';
                            });
                    }

                });
        } else {
            console.log("No user is signed in");
        }
    })

}
profileLink()





// function userSavePost() {
//     let params = new URL(window.location.href); //get URL of search bar
//     let ID = params.searchParams.get("docID"); //get value for key "id"
//     console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it
//     var user = firebase.auth().currentUser;

//     if (user) {
//         let y = db.collection('users').doc(user.uid);
//         let userSaved = y.collection('saved');
//         userSaved.doc(ID).set({})
//             .then(() => {
//                 console.log("added the favourite!");
//                 x = document.getElementById("saved")
//                 x.classList.add("text-red-300")
//             })


//     } else {
//         console.log("user is not logged in");
//     }
// }
// //fix soon -ethan
// var currentUser;
async function displaySavedIcon() {

    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it
    var user = firebase.auth().currentUser;

    if (user) {
        // Reference to the document in the profiles collection
        currentUser.get().then(userDoc => {
            //get the user name
            var bookmarks = userDoc.data().bookmarks;
            if (bookmarks.includes(ID)) {
                document.getElementById('saved').innerText = 'bookmark';
            }
            else{
                document.getElementById('saved').innerText = 'bookmark_add';
            }
        })
    } else {
        console.log("No such post!");
    }

}
