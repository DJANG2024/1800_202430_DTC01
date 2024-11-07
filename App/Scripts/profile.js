var currentUser; //points to the document of the user who is logged in
function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      var currentUser = db
        .collection('users')
        .doc(user.uid)
        .collection('profile');

      currentUser
        .get((userDoc) => {
          //get the data fields of the user
          // let userFullName = userDoc.data().name;
          // let user_name = userDoc.data().username;
          // let userLat = userDoc.data().latitude;

          //if the data fields are not empty, then write them in to the form.
          document.getElementById('userFullname').innerText =
            userDoc.data().name;
          document.getElementById('username').innerText = username;
          document.getElementById('userLat').innerText =
            userDoc.data().latitude;
        })
        .then(() => {
          window.location.href = '../Pages/home.html'; // Redirect to the thanks page
        });
    } else {
      // No user is signed in.
      console.log('No user is signed in');
    }
  });
}
