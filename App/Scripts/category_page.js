async function categoryPage() {
    firebase.auth().onAuthStateChanged(async (user) => {
        // Check if user is signed in:
        if (user) {

            id_list = ['0DvNN04FVxP9kmvCHafV']
            
            for (const doc of id_list) {
                try {
                    // console.log(doc);
                    // const postID = db.collection('posting').doc.id;
                    await loadPosts(doc, `categoryPosting`);

                } catch (error) {
                    console.error("Error processing document:", error);
                }
            }
        }
        else {
            console.log('not logged in');

        }
    }

    )
}
categoryPage()