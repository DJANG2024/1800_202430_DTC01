//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadPosts() {
  let number_of_post = 10;
  for (let i = 0; i < number_of_post; i++) {
    $('#feedPostingPlaceholder').append(`<div id="post${i}"></div>`);
    $(`#post${i}`).load('../Assets/feed_posting.html');
  }
  //$('#feedPostingPlaceholder')
}

function loadSkeleton() {
  $(`#headerPlaceholder`).load('../Assets/header.html');
  $('#header_smallerPlaceholder').load('../Assets/header_smaller.html');
  loadPosts();
  $(`#navbarPlaceholder`).load('../Assets/navbar.html');
}

loadSkeleton();
