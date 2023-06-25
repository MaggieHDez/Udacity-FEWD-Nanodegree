// Get Sections from document
const navSections = document.querySelectorAll("section");
let activeSection = document.querySelector('.active-class');
let activeLink = document.querySelector('.active');
const navLinks = document.querySelectorAll('.navbar ul li a');
let topButton = document.getElementById("topBtn");

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
    a.id = `${sectionName.toLowerCase()}__link`
    li.appendChild(a);
    navLinksContainer.appendChild(li);
    navLinks.forEach(function(link) { //adding this to add a click listener in the navbar links
      link.addEventListener('click', scrollToSection);
    });
  });
}

// Setting section and navigation link to active

function setActive(section) {
  let navLink = document.getElementById(`${section.id}__link`);
  if( activeSection !== null){
    activeSection.classList.remove('active-class');
    activeLink.classList.remove('active');
  }
  section.classList.add('active-class');
  navLink.classList.add('active');
  activeSection = section;
  activeLink = navLink;
}

// Removes active section and link if at the top of page
function atHeroSection(){
  if (activeSection !== null){
    activeSection.classList.remove('active-class');
    activeLink.classList.remove('active');
  }
}


// Function updates the active class in a section when a click, scroll or resize is fired
function updateActiveClass() {
    const viewportHeight = window.innerHeight + 500;
    // Show top button when scrolling down over 20 pixels
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      topButton.classList.remove('hidden');
    } else {
      topButton.classList.add('hidden');
      atHeroSection()
    }
    for (const section of navSections) {
        const position = section.getBoundingClientRect();
        if (position.top >= 0 && position.bottom <= viewportHeight) {
          setActive(section);
        }
    }

}

// Prevents default scroll event, add a scrollto to the target offset and calls the function to update the active section
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
    console.log(targetOffset)
    updateActiveClass(); // Calls the function to update the active class in the section
  }
}

  // When the user clicks on the button, scroll to the top of the document
  function topTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

// Call the function to generate the navbar links once the DOM is loaded
document.addEventListener('DOMContentLoaded', generateNavLinks());

// Listening to scroll and resize events to add/remove active class from navbar-link
document.addEventListener('scroll', updateActiveClass, { passive: true });
document.addEventListener('resize', updateActiveClass);








