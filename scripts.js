document.addEventListener("DOMContentLoaded", function() {
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

    // Initialize the Quill editor
    var quill = new Quill('#editor-container', {
        theme: 'snow'
    });
});
