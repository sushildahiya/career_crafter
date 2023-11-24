// Get the reference to the 'Sign Up' button element in the HTML
const signUpButton = document.getElementById('signUp');

// Get the reference to the 'Sign In' button element in the HTML
const signInButton = document.getElementById('signIn');

// Get the reference to the container element in the HTML
const container = document.getElementById('container');

// Add a click event listener to the 'Sign Up' button
signUpButton.addEventListener('click', () => {
    // Add the "right-panel-active" class to the container, triggering a visual transition
    container.classList.add("right-panel-active");
});

// Add a click event listener to the 'Sign In' button
signInButton.addEventListener('click', () => {
    // Remove the "right-panel-active" class from the container, reversing the visual transition
    container.classList.remove("right-panel-active");
});
