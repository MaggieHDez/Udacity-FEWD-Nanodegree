// Get number of section from documents
const navSections = document.querySelectorAll("section");


  // Function to dynamically generate the navbar links
  function generateNavLinks() {
    const navLinksContainer = document.getElementById('navbar-links');
    navSections.forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      let sectionName = link.getAttribute("data-navigation");
      li.setAttribute('class', 'navbar-item');
      a.setAttribute('class', 'navbar-link');
      a.textContent = sectionName;
      a.href = `#${sectionName.toLowerCase()}`;
      li.appendChild(a);
      navLinksContainer.appendChild(li);
    });
  }

  function updateActiveClass() {
    const navLinks = document.querySelectorAll('.navbar ul li a');
    let sectionPos = [];
    navSections.forEach((section) => sectionPos.push(section.getBoundingClientRect().top + section.getBoundingClientRect().bottom));
    let index = sectionPos.findIndex((position) => position >= 0);
    navLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    navLinks[index].classList.add('active');
  }


  // Call the function to generate the navbar links once the DOM is loaded
  document.addEventListener('DOMContentLoaded', generateNavLinks());

  // Listening to scroll event and add/remove active class from navbar-link
  document.addEventListener('scroll', updateActiveClass);
  document.addEventListener('resize', updateActiveClass);







