function process_radio() {
  var checked = document.getElementById('bordered-radio-1').checked;
  console.log(checked);
  const x = document.getElementById('rate');

  z = document.getElementById('bordered-radio-1');
  z.addEventListener('click', () => {
    x.classList.remove('hidden');
    console.log('hidden');
  });

  y = document.getElementById('bordered-radio-2');
  y.addEventListener('click', () => {
    x.classList.add('hidden');

    console.log('visible');
  });
}
process_radio();

function upload_create_page_form() {
  const title = document.getElementById('title').value;
  const header = document.getElementById('header').value;
  //const image = document.getElementById("dropzone-file").value;
  const details = document.getElementById('details').value;
  const rate = document.getElementById('rate').value;

  //b) update user's document in Firestore
  var user = firebase.auth().currentUser;
  if (user) {
    if (title != '' && header != '' && details != '' && rate != '') {
      //make sure nothing is empty, if it is, tell them to enter it
      // var currentUser = db.collection("users").doc(user.uid);
      var userID = user.uid;
      postingRef = db.collection('posting');

      postingRef
        .add({
          //unique ids 1-to-many
          title: title,
          header: header,
          rate: rate,
          //image: image,             //DONT WORRY ABOUT THIS FOR NOW, FIREBASE WILL SHIT ITSELF IF LEFT EMPTY
          details: details,
          profile: userID,
        })
        .then(() => {
          //   console.log('SUccessfully created post');

          window.location.href = '../Pages/posting_thanks.html'; // Redirect to the thanks page
        });
    } else {
      //missing_form
      y = document.getElementById('missing_form');
      y.classList.remove('hidden');
      console.log('no worko');

      //the different <h> numbers are used to show asterixes when missed in the form, be careful
      //h2 = title, h3 = image (not set up) h4 = header, h5 = details
      //astrix will go away if field is no longer empty

      if (title == '') {
        a = document.getElementById('h2');
        console.log('no title');
        a.innerHTML = `Title: <span class="text-red-600">*</span>`;
      } else {
        a = document.getElementById('h6');
        a.innerHTML = `Title: `;
      }
      if (rate == '') {
        a = document.getElementById('h7');
        console.log('no title');
        a.innerHTML = `Rate: <span class="text-red-600">*</span>`;
      } else {
        a = document.getElementById('h7');
        console.log('no title');
        a.innerHTML = `Rate: `;
      }
      if (header == '') {
        a = document.getElementById('h4');
        console.log('no header');
        a.innerHTML = `Header: <span class="text-red-600">*</span>`;
      } else {
        a = document.getElementById('h4');
        a.innerHTML = `Header: `;
      }

      if (details == '') {
        a = document.getElementById('h5');
        console.log('no details');
        a.innerHTML = `Details: <span class="text-red-600">*</span>`;
      } else {
        a = document.getElementById('h5');
        a.innerHTML = `Details: `;
      }
    }
  } else {
    console.log('No user is signed in');
    window.location.href = '../Pages/home.html';
  }
}
