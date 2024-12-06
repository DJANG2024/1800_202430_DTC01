async function categoryPage() {
    firebase.auth().onAuthStateChanged(async (user) => {
        // Check if user is signed in:
        if (user) {

            id_list = ['D670huSEPKyxFrC3LihX', 'C5KX7COLAAW1fqKbt67H', 'AVR5BedvvqPX5vNJFekk',]
            
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