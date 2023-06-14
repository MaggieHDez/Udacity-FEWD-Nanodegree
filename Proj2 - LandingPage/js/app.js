// Get Sections from document
const navSections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll('.navbar ul li a');

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
    navLinks.forEach(function(link) { //adding this to add a click listener in the navbar links
      link.addEventListener('click', scrollToSection);
    });
  });
}

// Function updates the active class in a section when a click, scroll or resize is fired
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

// prevents default scroll event, add a scrollto to the target offset and calls the function to update the active section
function scrollToSection(event) {
  event.preventDefault();

  var targetId = this.getAttribute("href");
  var targetElement = document.querySelector(targetId);

  if (targetElement) {
    var targetOffset = targetElement.offsetTop;

    window.scrollTo({
      top: targetOffset,
      behavior: "smooth",
    });

    updateActiveClass(); // Calls the function to update the active class in the section
  }
}


// Call the function to generate the navbar links once the DOM is loaded
document.addEventListener('DOMContentLoaded', generateNavLinks());

// Listening to scroll and resize events to add/remove active class from navbar-link
document.addEventListener('scroll', updateActiveClass, { passive: true });
document.addEventListener('resize', updateActiveClass);








