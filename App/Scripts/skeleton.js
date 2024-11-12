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

async function getUserName(profileId) {
  try {
    // Reference to the document in the profiles collection
    let profileRef = db.collection('profile').doc(profileId);

    // Fetch the document
    const userDoc = await profileRef.get();

    //if it exists, give the username!
    if (userDoc.exists) {
      let username = userDoc.data().username;
      console.log('username passed');
      return username; // Return the username
    } else {
      console.log('username didnt pass');
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

function loadPosts() {
  db.collection('posting')
    .get()
    .then(async (snapshot) => {
      for (const doc of snapshot.docs) {
        // This is a similar way for .forEach but it allows async functions to be called during it
        //we need to because we need to query the username
        let details = doc.data().details;
        let profile = doc.data().profile;
        let title = doc.data().title;
        var postID = doc.id; //Use this to pass it into the URL

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
        $('#feedPostingPlaceholder').append(
          `<div id="post${current_post}">${concated_posting}</div>`
        );
        current_post += 1;
      }
    });
  // ============
  //   METHOD 2
  // ============
  // let number_of_post = 10;
  // for (let i = 0; i < number_of_post; i++) {
  //   $('#feedPostingPlaceholder').append(`<div id="post${i}"></div>`);
  //   $(`#post${i}`).load('../Assets/feed_posting.html');
  // }
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
  console.log($('#headerPlaceholder').load('../Assets/header.html'));
  console.log(
    $('#header_smallerPlaceholder').load('../Assets/header_smaller.html')
  );
  loadPosts(); //source of duplicates?
  console.log($('#navbarPlaceholder').load('../Assets/navbar.html'));
  console.log($('#create_posting').load('../Assets/posting_form.html'));
  console.log($('#full_post').load('../Assets/fullscreen_single_posting.html'));
}
loadSkeleton(); //invoke the function
