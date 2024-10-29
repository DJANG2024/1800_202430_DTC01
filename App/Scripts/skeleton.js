//---------------------------------------------------
// This function loads the parts of your skeleton 
// (navbar, footer, and other things) into html doc. 
//---------------------------------------------------
function loadSkeleton() {



    console.log($('#headerPlaceholder').load('../Assets/header.html'));
    console.log($('#navbarPlaceholder').load('../Assets/navbar.html'));
    

}
loadSkeleton(); //invoke the function