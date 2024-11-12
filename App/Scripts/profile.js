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

            //console.log("user is signed in");
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

var concated_posting = '';
function loadMyPosts() {        //posts under profile
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    //the posts ID from firebase, important so we can suck the info off it
    db.collection('posting')
        .get()
        .then(async (snapshot) => {
            for (const doc of snapshot.docs) {
                // This is a similar way for .forEach but it allows async functions to be called during it
                //we need to because we need to query the username
                let details = doc.data().details;
                let profile = doc.data().profile;
                let title = doc.data().title;
                var postID = doc.id;          //Use this to pass it into the URL

                if (ID == profile) {
                    console.log("IDS match");
                    const user = await getUserName(profile);
                    //calls the username function


                    //adds info to the post
                    concated_posting += `
        <div class="max-w-[690px] max-h-[1280px] p-3 mx-auto" >
          <a class="card-href" href="../Pages/view_posting.html?docID=${postID}";>
          <div class="border-solid border-4 border-black rounded-3xl p-7 space-y-3">

            <div class="flex flex-row justify-between">
              <h1 class="text-5xl font-bold font-oswald">${title}</h1>
              <a href="">
                <i class="material-icons text-6xl">bookmark_add</i>
              </a>
            </div>
            <div class="flex flex-row space-x-4">
              <a href="profile.html" class="px-2">
                <h1 class="text-3xl font-semibold font-roboto">${user}</h1>
              </a>
            </div>
            <button>

                <div class="flex flex-row justify-between space-x-3">
                  <i class="material-icons text-[150px]">image</i>
                  <p class="text-xl pt-7 font-roboto">
                    ${details}
                  </p>
                </div>

            </button>
          </div>
        </a>
      </div>`;
                    $('#feedProfile').append(
                        `<div id="post${current_post}">${concated_posting}</div>`
                    );
                }
                else{
                    console.log("does not match");
                }
            };

        });


}
loadMyPosts()