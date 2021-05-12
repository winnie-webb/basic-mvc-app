const fadeAnimations = (() => {
  const allElementsInDOM = document.querySelectorAll("*");

  allElementsInDOM.forEach((element) => {
    const doesElementHaveAttribute = element.getAttribute("data-animate");
    if (doesElementHaveAttribute) {
      const elementAnimation = element.getAttribute("data-animate");
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(elementAnimation);
          }
        });
      });
      observer.observe(element);
    } else return;
  });
})();
