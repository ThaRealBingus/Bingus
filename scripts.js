document.addEventListener("DOMContentLoaded", function() {
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFr9w3uXRQTrupvYlv6aYIU2Cv0eiTsPA",
    authDomain: "real-bingus-site.firebaseapp.com",
    projectId: "real-bingus-site",
    storageBucket: "real-bingus-site.appspot.com",
    messagingSenderId: "972564015722",
    appId: "1:972564015722:web:1b95338bc11637d061f813",
};
    firebase.initializeApp(firebaseConfig);

    var db = firebase.firestore();

    document.getElementById("addPage").addEventListener("click", function() {
        var pageCount = document.querySelectorAll('.page').length + 1;

        var newPageLink = document.createElement("a");
        newPageLink.href = "#";
        newPageLink.textContent = "Page " + pageCount;
        newPageLink.addEventListener("click", function() {
            showPage(pageCount);
        });

        var plusButton = document.getElementById("addPage");
        plusButton.parentElement.insertBefore(newPageLink, plusButton);

        var newPageDiv = document.createElement("div");
        newPageDiv.classList.add("page");
        newPageDiv.innerHTML = "<h2>Page " + pageCount + "</h2><p>This is page " + pageCount + "</p>";
        document.querySelector('.container').appendChild(newPageDiv);

        // Save the created page to Firestore
        savePageToFirestore(pageCount);
    });

    document.getElementById("homePage").addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the default action of navigating to a "#" link
        showPage(1); // Show the first page
    });

    function showPage(pageNumber) {
        var pages = document.querySelectorAll('.page');
        pages.forEach(function(page) {
            page.style.display = 'none'; // Hide all pages
        });
        if (pages.length >= pageNumber) {
            pages[pageNumber - 1].style.display = 'block'; // Show the requested page
        }
    }

    function savePageToFirestore(pageNumber) {
        var pageTitle = "Page " + pageNumber;
        var pageContent = ""; // You can get the content from Quill editor if needed

        db.collection("pages").add({
            title: pageTitle,
            content: pageContent
        })
        .then(function(docRef) {
            console.log("Page created with ID: ", docRef.id);
        })
        .catch(function(error) {
            console.error("Error adding page: ", error);
        });
    }

    // Initialize the Quill editor
    var quill = new Quill('#editor-container', {
        theme: 'snow'
    });
});
