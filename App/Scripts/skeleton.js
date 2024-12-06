//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------

// ============
//   METHOD 1
// ============
//   let number_of_post = 3;
//   let concated_posting = '';
//   for (let i = 0; i < number_of_post; i++) {
// concated_posting += `
//     <div
//       class="border-solid border-4 border-black rounded-3xl border-box p-7 space-y-3 z-0"
//     >
//       <div class="flex flex-row justify-between">
//         <h1 class="text-7xl font-bold">Posting</h1>
//         <a href="">
//           <i class="material-icons text-7xl p-2">bookmark_add</i>
//         </a>
//       </div>
//       <div class="flex flex-row space-x-6">
//         <h1 class="text-4xl font-semibold pt-2">User A</h1>
//         <a href="profile.html" class="px-2"
//           ><i class="material-icons text-6xl">account_circle</i></a
//         >
//       </div>
//       <button>
//         <div class="flex flex-row justify-between">
//           <i class="material-icons text-[300px]">image</i>
//           <p class="text-2xl pt-7">
//             Orci ornare tellus lacus tellus quisque. Natoque congue est lobortis
//             maximus quis urna a netus. Torquent dui tortor a quam curae dolor
//             ultrices dignissim.
//           </p>
//         </div>
//       </button>
//     </div>
//         `;
//   }
//   $('#feedPostingPlaceholder').append(concated_posting);
// ============
//   METHOD 2
// ============
// let number_of_post = 10;
// for (let i = 0; i < number_of_post; i++) {
//   $('#feedPostingPlaceholder').append(`<div id="post${i}"></div>`);
//   $(`#post${i}`).load('../Assets/feed_posting.html');
// }

// function getUserName(posting) {
//   var user = '';
//   db.collection('profile')
//     .get()
//     .then((profile_doc) => {
//       profile_doc.forEach((doc) => {
//         if (posting.data().profile == doc.id) {
//           console.log(posting.data().profile == doc.id);
//           // console.log(doc.data().username);
//           // return doc.data().username;
//           return "hello"
//         }
//       });
//     });
// }

// Use whenever you want to find the username from a userID

async function getUserName(profileId) {
  try {
    // Reference to the document in the profiles collection
    let profileRef = db.collection('profile').doc(profileId);

    // Fetch the document
    const userDoc = await profileRef.get();

    //if it exists, give the username!
    if (userDoc.exists) {
      let username = userDoc.data().username;
      //console.log("username passed");
      return username; // Return the username
    } else {
      //console.log("username didnt pass");
      x = 'unknown';
      return x; // If the profile doesn't exist, return null
    }
  } catch (error) {
    console.error('Error getting username:', error);
    return null;
  }
}

var current_post = 0;
var concated_posting = '';
//loadPosts() // use for the feed (all postings)
//loadPosts(the posts ID) // use for singular postings

function loadPosts(postID, placementID) {
  if (postID && placementID) {
    db.collection('posting')
      .doc(postID)
      .get()
      .then(async (postDoc) => {
        let details = postDoc.data().details;
        let profile = postDoc.data().profile;
        let title = postDoc.data().title;
        let rate = postDoc.data().rate;
        var postID = postDoc.id;
        console.log(details);
        const user = await getUserName(profile);
   
        concated_posting = `
        <div class="border-solid border-4 border-[#12263A] rounded-3xl bg-[#F4D1AE] mb-4 w-[90%] mx-auto min-h-[300px] transition hover:scale-[1.01] ease-in-out hover:bg-[#f5d5b6] shadow-lg ">
          <a class="card-href" href="../Pages/view_posting.html?docID=${postID}";>
            <div class="p-6">
              <div class="font-bold font-oswald flex flex-row justify-between  bg-[#f8dbbf] px-4 py-3 rounded-xl shadow-sm transition ease-in-out hover:shadow-lg">
                <div class="text-3xl ">${title}</div>
                <div id="userRate" class="text-2xl bg-green-500 rounded-2xl px-3 h-10">
                  $${rate}
                </div>
              </div>
              <div class="flex flex-row">
                <a href="profile.html" class="px-2">
                  <h1 class="text-xl font-semibold font-roboto pt-2">${user}</h1>
                </a>
              </div>
                <div class="">
                  <p class="text-lg pt-7 font-roboto px-2">
                    ${details}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>`;
        $(`#${placementID}`).append(
          `<div id="post${current_post}">${concated_posting}</div>`
        );
        // $('#savedFeedPosting').append(
        //   `<div id="post${current_post}">${concated_posting}</div>`
        // );
        current_post += 1;
      });
  } else {

    db.collection('posting')
      .get()
      .then(async (snapshot) => {
        for (const doc of snapshot.docs) {
 
          
          // This is a similar way for .forEach but it allows async functions to be called during it
          //we need to because we need to query the username
          let details = doc.data().details;
          let profile = doc.data().profile;
          let title = doc.data().title;
          let rate = doc.data().rate;
          var postID = doc.id; //Use this to pass it into the URL
          //console.log(postID);

          const user = await getUserName(profile);
          //calls the username function

          //adds info to the post
          concated_posting = `
        <div class="border-solid border-4 border-[#12263A] rounded-3xl bg-[#F4D1AE] mb-4 w-[90%] mx-auto min-h-[300px] transition hover:scale-[1.01] ease-in-out hover:bg-[#f5d5b6] shadow-md  hover:shadow-xl ">
          <a class="card-href" href="../Pages/view_posting.html?docID=${postID}";>
            <div class="p-6">
              <div class="font-bold font-oswald flex flex-row justify-between bg-[#f8dbbf] px-4 py-3 rounded-xl shadow-sm transition ease-in-out hover:shadow-lg">
                <div class="text-3xl">${title}</div>
                <div id="userRate" class="text-2xl bg-green-500 rounded-2xl px-3 h-10">
                  $${rate}
                </div>
              </div>
              <div class="flex flex-row ">
                <a href="profile.html" class="px-2">
                  <h1 class="text-xl font-semibold font-roboto pt-2">${user}</h1>
                </a>
              </div>
                <div class="">
                  
                  <p class="text-lg pt-7 font-roboto px-2">
                    ${details}
                  </p>
                </div>
              </div>
            </div>
          </a>
        </div>`;

          $('#feedPostingPlaceholder').append(
            `<div id="post${current_post}">${concated_posting}</div>`
          );

          current_post += 1;
        }
      });
  }
}

// db.collection('posting')
//   .get()
//   .then((allPostings) => {
//     allPostings.forEach(async (doc) => {

//       let details = doc.data().details;
//       let profile = doc.data().profile;
//       let title = doc.data().title;
//       const user = await getUserName(profile);

//       console.log(user)
//       concated_posting += `

function profileLink() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:

    if (user) {
      currentUser = db.collection('profile').doc(user.uid);
      currentUser.get().then((userDoc) => {
        var profileID = userDoc.id;
        document.getElementById(
          'profile_button'
        ).href = `../Pages/profile.html?docID=${profileID}`;
        //Adds the users firebase ID to the URL
      });
    } else {
      console.log('No user is signed in');
    }
  });
}
profileLink();

//back button logic
function backButton() {
  const previousPage = sessionStorage.getItem('previousVisitedPage');
  if (previousPage) {
    //document.getElementById('backButton').href = previousPage;
    window.location.href = previousPage;
  } else {
    //document.getElementById('backButton').href = "../Pages/home.html";
    window.location.href = 'home.html';
  }
}


//for back button, pls do not touch :3
window.addEventListener('load', () => {
  const previousPage = sessionStorage.getItem('currentVisitedPage');
  sessionStorage.setItem('previousVisitedPage', previousPage);
  //backButton(previousPage)
  sessionStorage.setItem('currentVisitedPage', window.location.href);
  const currentPage = sessionStorage.getItem('currentVisitedPage');
});

function loadSkeleton() {
  $('#headerPlaceholder').load('../Assets/header.html');
  $('#header_smallerPlaceholder').load('../Assets/header_smaller.html');
  $('#header_profilePlaceholder').load('../Assets/header_profile.html');
  loadPosts(); //source of duplicates? NOPE
  $('#navbarPlaceholder').load('../Assets/navbar.html');
  $('#create_posting').load('../Assets/posting_form.html');
  $('#full_post').load('../Assets/fullscreen_single_posting.html');
}
loadSkeleton(); //invoke the function
