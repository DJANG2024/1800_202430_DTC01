//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadPosts() {
  // ============
  //   METHOD 1
  // ============
  let number_of_post = 3;
  let concated_posting = '';
  for (let i = 0; i < number_of_post; i++) {
    concated_posting += `
  <div
    class="border-solid border-4 border-black rounded-3xl border-box p-7 space-y-3 z-0"
  >
    <div class="flex flex-row justify-between">
      <h1 class="text-7xl font-bold">Posting</h1>
      <a href="">
        <i class="material-icons text-7xl p-2">bookmark_add</i>
      </a>
    </div>
    <div class="flex flex-row space-x-6">
      <h1 class="text-4xl font-semibold pt-2">User A</h1>
      <a href="profile.html" class="px-2"
        ><i class="material-icons text-6xl">account_circle</i></a
      >
    </div>
    <button>
      <div class="flex flex-row justify-between">
        <i class="material-icons text-[300px]">image</i>
        <p class="text-2xl pt-7">
          Orci ornare tellus lacus tellus quisque. Natoque congue est lobortis
          maximus quis urna a netus. Torquent dui tortor a quam curae dolor
          ultrices dignissim.
        </p>
      </div>
    </button>
  </div>
      `;
  }
  $('#feedPostingPlaceholder').append(concated_posting);
  // ============
  //   METHOD 2
  // ============
  //   let number_of_post = 3;
  //   let list_of_postings = '';
  //   for (let i = 0; i < number_of_post; i++) {
  //     $('#feedPostingPlaceholder').load('../Assets/feed_posting.html');
  //   }
  //   $('#feedPostingPlaceholder').append(concated_posting);
}

function loadSkeleton() {
  console.log($('#headerPlaceholder').load('../Assets/header.html'));
  loadPosts();
  console.log($('#navbarPlaceholder').load('../Assets/navbar.html'));
}
loadSkeleton(); //invoke the function
