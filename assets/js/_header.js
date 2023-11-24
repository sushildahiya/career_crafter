// Select the dropdown content element in the HTML
const dropdownContent = document.querySelector('.dropdown-content');

// Select the container for the profile picture in the HTML
const picContainer = document.querySelector('.dropbtn');

// Initialize a variable to track whether the profile picture is clicked or not
let profilePicClicked = false;

// Add a click event listener to the profile picture container
picContainer.addEventListener('click', () => {
    // Toggle the value of profilePicClicked when the profile picture is clicked
    profilePicClicked = !profilePicClicked;

    // Set the display style of the dropdown content based on the profilePicClicked value
    // If profilePicClicked is true, display the dropdown content; otherwise, hide it
    dropdownContent.style.display = profilePicClicked ? 'block' : 'none';
});
