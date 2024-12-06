function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:

    if (user) {
      //console.log("user is signed in");
      currentUser = db.collection('profile').doc(user.uid);
      currentUser.get().then((userDoc) => {
        let userLong = userDoc.data().longitude;
        let user_name = userDoc.data().username;
        let userLat = userDoc.data().latitude;
        document.getElementById('username').innerHTML = user_name;
        document.getElementById('userLat').innerHTML = userLat;
        document.getElementById('userLong').innerHTML = userLong;
      });

      currentUser = db.collection('users').doc(user.uid);
      //Grabs the full name from users db and puts a copy into the profile db
      currentUser.get().then((userDoc) => {
        let fullName = userDoc.data().name;
        document.getElementById('fullName').innerHTML = fullName;
      });
    } else {
      // console.log("No user is signed in");
      alert('No user is signed in');
    }
  });
}
populateUserInfo();

var current_post = 0;
var concated_posting = '';

function loadMyPosts() {
  //posts under profile
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('docID'); //get value for key "id"
  //the posts ID from firebase, important so we can suck the info off it
  post_list = [];
  var account = 0

  db.collection('posting')
    .get()
    .then(async (snapshot) => {
      for (const doc of snapshot.docs) {
        account++
        // This is a similar way for .forEach but it allows async functions to be called during it
        //we need to because we need to query the username
        let details = doc.data().details;
        let profile = doc.data().profile;
        let title = doc.data().title;
        var postID = doc.id; //Use this to pass it into the URL
        const user = await getUserName(profile);
        //console.log(ID);    //UNCOMMENT
        //console.log(profile); //UNCOMMENT
        //console.log(account);

        //post_list.push(postID)
        if (ID == profile) {
          concated_posting = `
        <div class="border-solid border-4 border-[#12263A] rounded-3xl bg-[#F4D1AE] mb-4 w-[90%] mx-auto min-h-[300px] transition hover:scale-[1.01] ease-in-out hover:bg-[#f5d5b6] shadow-lg">
          <a class="card-href" href="../Pages/view_posting.html?docID=${postID}";>
            <div class="p-6">
              <div class="font-bold font-oswald flex flex-row justify-between bg-[#f8dbbf] px-4 py-3 rounded-xl shadow-sm transition ease-in-out hover:shadow-lg">
                <div class="text-3xl">${title}</div>
                
                <a onclick="userDeletePost(${postID})" id="userDelete${postID}" class="text-2xl bg-brown-300  h-10 transition hover:scale-[1.05] ease-in-out hover:shadow-sm">
                  <i class="material-icons bg-[#f2b47b] text-4xl rounded-lg text-[#0e1f30] hover:text-[#1c3751] hover:shadow-sm">delete</i>
                </a>
              </div>
              <div class="flex flex-row space-x-4">
                <a href="profile.html" class="px-2">
                  <h1 class="text-xl font-semibold font-roboto">${user}</h1>
                </a>
              </div>
                <div class="">
                  <p class="text-lg pt-7 font-roboto">
                    ${details}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>`
          $('#feedProfile').append(
            `<div id="post${current_post}">${concated_posting}</div>`
          );
          document.getElementById(`userDelete${postID}`).addEventListener(
            'click', () => {
              userDeletePost(postID)
            })
          

        } else {
          //current_post += 1;
        }
      }
      //console.log(post_list);

    });
}
loadMyPosts();
// concated_posting = `
//         <div class="border-solid border-4 border-[#12263A] rounded-3xl bg-[#F4D1AE] mb-4 w-[90%] mx-auto min-h-[300px]">
//           <a class="card-href" href="../Pages/view_posting.html?docID=${postID}";>
//             <div class="p-8">
//               <div class="font-bold font-oswald flex flex-row justify-between">
//                 <div class="text-3xl">${title}</div>
                
//                 <a onclick="userDeletePost(${postID})" id="userDelete${postID}" class="text-2xl bg-brown-300 rounded-3xl px-3 h-10">
//                   <i class="material-icons text-4xl text-[#12263A]">delete</i>
//                 </a>
//               </div>
//               <div class="flex flex-row space-x-4">
//                 <a href="profile.html" class="px-2">
//                   <h1 class="text-xl font-semibold font-roboto">${user}</h1>
//                 </a>
//               </div>
//                 <div class="">
//                   <i class="material-icons text-[150px] h-32 float-left -ml-4">image</i>
//                   <p class="text-xl pt-7 font-roboto">
//                     ${details}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </a>
//         </div>`

async function userDeletePost(postID) {
  console.log("clicked");
  console.log(postID);
  firebase.auth().onAuthStateChanged(async user => {
    // Check if user is signed in:

    if (user) {

      let deleteRef = db.collection('posting').doc(postID)

      deleteRef.delete()
        .then(async() => {
          console.log("deleted post");
          location.reload();
        })
        .catch((error) => {
          console.error("Error deleting document: ", error);
        })

    }
    else {
      console.log("user is not logged in");
    }
  })

}
