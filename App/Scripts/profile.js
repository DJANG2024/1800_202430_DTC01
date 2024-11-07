var currentUser;               //points to the document of the user who is logged in
function populateUserInfo() {
    var user = firebase.auth().currentUser;
        // Check if user is signed in:
    
        if (user) {

            var currentUser = db.collection("profile").doc(user.uid);
                
                currentUser.get(userDoc => {
                    
                    //get the data fields of the user
                    
                    let userLong = userDoc.data().longitude;
                    let user_name = userDoc.data().username;
                    let userLat = userDoc.data().latitude;
                    document.getElementById("username").innerHTML = user_name
                    document.getElementById("userLat").innerHTML = userLat
                    document.getElementById("userLat").innerHTML = userLong
                    //if the data fields are not empty, then write them in to the form.
                    // document.getElementById("username").innerText = userDoc.data().username;
                    // document.getElementById("userLat").innerText = userDoc.data().latitude;
                    // document.getElementById("userLat").innerText = userDoc.data().longitude;

                    console.log("Passed");
                })
                .then(() => {
                    
                    //if the data fields are not empty, then write them in to the form.
                    
                    
                    // Redirect to the thanks page

                });
        }
        else {
            // No user is signed in.
            console.log("No user is signed in");
        }

}
function switchToProfile(){
    console.log("recieved");
    window.location.href = "../Pages/profile.html";


}
populateUserInfo()