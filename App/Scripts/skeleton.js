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
let number_of_post = 10;
for (let i = 0; i < number_of_post; i++) {
  $('#feedPostingPlaceholder').append(`<div id="post${i}"></div>`);
  $(`#post${i}`).load('../Assets/feed_posting.html');
}

var current_post = 0;
var concated_posting = '';
function loadPosts() {
  db.collection('posting')
    .get()
    .then((allPostings) => {
      allPostings.forEach((doc) => {
        var details = doc.data().details;
        var profile = doc.data().id;
        var title = doc.data().title;
        var user = '';
        db.collection('profile')
          .get()
          .then((profile_doc) => {
            if (profile_doc == profile) {
              user = profile_doc.username;
            }
          });

        concated_posting += `
        <div
          class="border-solid border-4 border-black rounded-3xl border-box p-7 space-y-3 z-0"
        >
          <div class="flex flex-row justify-between">
            <h1 class="text-7xl font-bold">${title}</h1>
            <a href="">
              <i class="material-icons text-7xl p-2">bookmark_add</i>
            </a>
          </div>
          <div class="flex flex-row space-x-6">
            <h1 class="text-4xl font-semibold pt-2">${user}</h1>
            <a href="profile.html" class="px-2"
              ><i class="material-icons text-6xl">account_circle</i></a
            >
          </div>
          <button>
            <div class="flex flex-row justify-between">
              <i class="material-icons text-[300px]">image</i>
              <p class="text-2xl pt-7">
                ${details}
              </p>
            </div>
          </button>
        </div>
        `;
        $('#feedPostingPlaceholder').append(
          `<div id="post${current_post}">${concated_posting}</div>`
        );
        // $(`#post${current_post}`).load('../Assets/feed_posting.html');

        // document.querySelector($(`#post${current_post}`)).innerHTML = 'testing';
        // $(`h1:nth-child(1)`).innerHTML = title;
        // $(`h1:nth-child(2)`).innerHTML = user;
        // $(`p:nth-child(1)`).innerHTML = details;
        // document.querySelector('p').innerHTML = details;
        // document.getElementById('userName').innerText = 'testing';
        current_post += 1;
      });
    });
  // let number_of_post = 10;
  // for (let i = 0; i < number_of_post; i++) {
  //   $('#feedPostingPlaceholder').append(`<div id="post${i}"></div>`);
  //   $(`#post${i}`).load('../Assets/feed_posting.html');
  // }
}

function loadSkeleton() {
  console.log($('#headerPlaceholder').load('../Assets/header.html'));
  console.log(
    $('#header_smallerPlaceholder').load('../Assets/header_smaller.html')
  );
  loadPosts();
  console.log($('#navbarPlaceholder').load('../Assets/navbar.html'));
  console.log($('#create_posting').load('../Assets/posting_form.html'));
}
loadSkeleton(); //invoke the function
