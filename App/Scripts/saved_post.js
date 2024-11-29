var currentUser;

async function userSavePost() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get('docID'); //get value for key "id"
  //console.log(ID);                        //the posts ID from firebase, important so we can suck the info off it

  firebase.auth().onAuthStateChanged(async (user) => {
    // Check if user is signed in:

    if (user) {
      let savedRef = db
        .collection('users')
        .doc(user.uid)
        .collection('saved')
        .doc(ID);
      const userDoc = await savedRef.get();

      //if it exists, give the username!
      if (userDoc.exists) {
        removeRef = db
          .collection('users')
          .doc(user.uid)
          .collection('saved')
          .doc(ID);
        removeRef
          .delete()
          .then(() => {
            // console.log('unsaved post');
            document.getElementById('saved').innerText = 'bookmark_add';
            //delete the Doc
          })
          .catch((error) => {
            console.error('Error deleting document: ', error);
          });
      } else {
        let y = db.collection('users').doc(user.uid);
        let userSaved = y.collection('saved');
        userSaved
          .doc(ID)
          .set({})
          .then(() => {
            console.log('added the favourite!');
            document.getElementById('saved').innerText = 'bookmark';
            //add the Doc (with extra steps)
          });
      }
    } else {
      //   console.log('user is not logged in');
      alert('No user is signed in');
    }
  });
}

//grabs all saved posts and then passes it to loadPosts in the skeleton
async function savedPage() {
  firebase.auth().onAuthStateChanged(async (user) => {
    // Check if user is signed in:
    if (user) {
      let collectionRef = db
        .collection('users')
        .doc(user.uid)
        .collection('saved');

            // Fetch all documents in the collection
            const querySnapshot = await collectionRef.get();
            console.log(querySnapshot);
            // Check if the collection is empty
            if (querySnapshot.empty) {
                console.log("No documents found.");
                return;
            }

            var account = 0
            for (const doc of querySnapshot.docs) {
                try {
                    console.log(`Processing document ID: ${doc.id}`);
                    account++
                    console.log(account);
                    const postID = doc.id;
                    await loadPosts(postID, `savedFeedPosting`);
                    
                } catch (error) {
                    console.error("Error processing document:", error);
                }
            }
        }
      }
    } else {
      console.log('not logged in');
    }
  });
}

savedPage();
