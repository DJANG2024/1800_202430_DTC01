// function process_response() {
//   //this is for the form
//   var checked = document.getElementById('bordered-radio-1').checked;
//   const x = document.getElementById('description');

//   z = document.getElementById('bordered-radio-1');
//   z.addEventListener('click', () => {
//     x.classList.add('hidden');
//     console.log('hidden');
//   });

//   y = document.getElementById('bordered-radio-2');
//   y.addEventListener('click', () => {
//     x.classList.remove('hidden');
//     console.log('visible');
//   });
// }
// process_response();

var currentUser;

function saveUserInfo() {

  const lat = document.getElementById('latitude').value;
  const long = document.getElementById('longitude').value;
  const profile_username = document.getElementById('profile_username').value;

  //b) update user's document in Firestore
  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection('users').doc(user.uid);

    db.collection('profile')
      .doc(user.uid) //unique ids 1-to-1
      .set({

        latitude: lat,
        longitude: long,
        username: profile_username,
      })
      .then(() => {
        // console.log("Successfully added");
        window.location.href = '../Pages/home.html'; // Redirect to the thanks page
      });
  } else {
    console.log('No user is signed in');
    window.location.href = '../Pages/home.html';
  }

  //c) disable edit
}
