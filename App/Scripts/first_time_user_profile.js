
function process_response() {

    var checked = document.getElementById('bordered-radio-1').checked;
    const x = document.getElementById("description");

    z = document.getElementById('bordered-radio-1')
    z.addEventListener("click", () => {
        x.classList.add("hidden")
        console.log("hidden");
    });

    y = document.getElementById('bordered-radio-2')
    y.addEventListener("click", () => {
        x.classList.remove("hidden")
        console.log("visible");
    });

}
process_response()


var currentUser;

function saveUserInfo() {
    //enter code here

    //a) get user entered values
    

    const lat = document.getElementById("latitude").value;
    const long = document.getElementById("longitude").value;
    const profile_username = document.getElementById("profile_username").value;


    //b) update user's document in Firestore
    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        // Get the document for the current user.
        db.collection("profiles").add({
            userID: userID,
            latitude: lat,
            longitude: long,
            username: profile_username,  

        }).then(() => {
            window.location.href = "../Pages/home.html"; // Redirect to the thanks page
        });
    } else {
        console.log("No user is signed in");
        window.location.href = '../Pages/home.html';
    }

    //c) disable edit 
 
}

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    let userName = userDoc.data().name;
                    let userSchool = userDoc.data().school;
                    let userCity = userDoc.data().city;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSchool != null) {
                        document.getElementById("schoolInput").value = userSchool;
                    }
                    if (userCity != null) {
                        document.getElementById("cityInput").value = userCity;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

// function getInfoNewProfile() {
//     firebase.auth().onAuthStateChanged(user => {
//         // Check if a user is signed in:
//         if (user) {

//             console.log(user.uid); //print the uid in the browser console
//             console.log(user.displayName);  //print the user name in the browser console
//             userName = user.displayName;

//             const lat = document.getElementById("latitude").value;
//             const long = document.getElementById("longitude").value;
//             const profile_username = document.getElementById("profile_username").value;
            

//             db.collection("users").doc(user.uid).set({         

//                 latitude: lat,
//                 longitude: long,
//                 username: profile_username,                         
                               
                            
//             }).then(function () {
//                     console.log("New user added to firestore");
//                     window.location.assign("../Pages/home.html");       //re-direct to main.html after signup
//                 }).catch(function (error) {
//                     console.log("Error adding new user: " + error);
//                 });

//         } else {
//             // No user is signed in.
//             console.log("No user is logged in");
//         }
//     });
    
// }
// //getInfoNewProfile()