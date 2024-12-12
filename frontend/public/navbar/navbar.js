const openNavButton = document.getElementById('open-nav');
const closeNavButton = document.getElementById('close-nav');
const navDialog = document.getElementById('nav-dialog');

// Open the navigation dialog
openNavButton.addEventListener('click', () => {
  navDialog.showModal();
  document.body.classList.add('nav-open'); // Disable scrolling
});

// Close the navigation dialog
closeNavButton.addEventListener('click', () => {
  navDialog.close();
  document.body.classList.remove('nav-open'); // Enable scrolling
});

// Light dismiss (close dialog when clicking outside the modal content)
navDialog.addEventListener('click', (event) => {
  if (event.target.nodeName === 'DIALOG') {
    navDialog.close();
    document.body.classList.remove('nav-open'); // Enable scrolling
  }
});
