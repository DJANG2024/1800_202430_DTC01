function displayPostInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('docID'); //get value for key "id"
  //   console.log(ID); //the posts ID from firebase, important so we can suck the info off it
  db.collection('posting')
    .doc(ID)
    .get()
    .then(async (postDoc) => {
      let title = postDoc.data().title;
      let header = postDoc.data().header;
      let details = postDoc.data().details;
      let profile = postDoc.data().profile;

      let user = await getUserName(profile);

      //this is the function from skeleton.js, it just gives us the persons username
      //we just have to put aSync and await to make it work here
      //if we wanna do this, make sure to import skeleton.js BEFORE the others

      document.getElementById('title').innerHTML = title;
      document.getElementById('header').innerHTML = header;
      document.getElementById('details').innerHTML = details;
      document.getElementById('username').innerHTML = user;
    });
}
displayPostInfo();

var currentUser;

//we have to keep this, this helps the bookmark see if its checked when loaded in
// actual clicking code is in saved_post

async function displaySaveIcon() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('docID'); //get value for key "id"
  //console.log(ID);

  firebase.auth().onAuthStateChanged(async (user) => {
    if (user) {
      let savedRef = db
        .collection('users')
        .doc(user.uid)
        .collection('saved')
        .doc(ID);
      const userDoc = await savedRef.get();

      if (userDoc.exists) {
        document.getElementById('saved').innerText = 'bookmark';
        //return true;
      } else {
        document.getElementById('saved').innerText = 'bookmark_add';
        // false;
      }
    } else {
      console.log('user is not logged in');
    }
  });
}
displaySaveIcon();
