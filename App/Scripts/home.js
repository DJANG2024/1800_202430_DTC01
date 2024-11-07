var currentUser; //points to the document of the user who is logged in

function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (profiles) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("profiles").doc(profiles.uid);
      //get the document for current user.
      console.log(currentUser);
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        let profileName = userDoc.data();
        console.log(profileName);
        // let profileSchool = userDoc.data().username;
        // let profileCity = userDoc.data().userID;

        //if the data fields are not empty, then write them in to the form.
        if (profileName != null) {
          document.getElementById("nameInput").value = profileName;
        }
        // if (userSchool != null) {
        //   document.getElementById("schoolInput").value = userSchool;
        // }
        // if (userCity != null) {
        //   document.getElementById("cityInput").value = userCity;
        // }
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
    }
  });
}

//call the function to run it
populateUserInfo();
