// var currentUser;               //points to the document of the user who is logged in
// function populateUserInfo() {
//     var user = firebase.auth().currentUser;
//         // Check if user is signed in:

//         if (user) {

//             currentUser = db.collection("profile").doc(user.uid)
//                 currentUser.get()
//                 .then((userDoc) => {

//                     let userLong = userDoc.data().longitude;
//                     let user_name = userDoc.data().username;
//                     let userLat = userDoc.data().latitude;
//                     document.getElementById("username").innerHTML = user_name
//                     document.getElementById("userLat").innerHTML = userLat
//                     document.getElementById("userLat").innerHTML = userLong

//                     console.log("Passed");

//                 });
//         }
//         else {
//             // No user is signed in.
//             console.log("No user is signed in");
//         }

// }
function populateUserInfo() {

    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:

        if (user) {

            console.log("user is signed in");
            currentUser = db.collection("profile").doc(user.uid)
            currentUser.get(
            )
                .then((userDoc) => {

                    let userLong = userDoc.data().longitude;
                    let user_name = userDoc.data().username;
                    let userLat = userDoc.data().latitude;
                    document.getElementById("username").innerHTML = user_name
                    document.getElementById("userLat").innerHTML = userLat
                    document.getElementById("userLong").innerHTML = userLong

                });

            currentUser = db.collection("users").doc(user.uid)
                //Grabs the full name from users db and puts a copy into the profile db
            currentUser.get(
            )
                .then((userDoc) => {

                    let fullName = userDoc.data().name;
                    document.getElementById("fullName").innerHTML = fullName

                });
        } else {
            console.log("No user is signed in");
        }
    })
}
populateUserInfo()
