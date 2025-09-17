(function () {
  const startButton = document.querySelector('.start-button');
  const startMenu = document.querySelector('.start-menu');

  if (!startButton || !startMenu) {
    return;
  }

  const firstMenuLink = startMenu.querySelector('a');

  const isMenuOpen = () => startButton.getAttribute('aria-expanded') === 'true';

  const openMenu = () => {
    if (isMenuOpen()) {
      return;
    }

    startButton.setAttribute('aria-expanded', 'true');
    startMenu.setAttribute('aria-hidden', 'false');
    if (firstMenuLink) {
      firstMenuLink.focus();
    }
  };

  const closeMenu = ({ returnFocus = true } = {}) => {
    if (!isMenuOpen()) {
      return;
    }

    startButton.setAttribute('aria-expanded', 'false');
    startMenu.setAttribute('aria-hidden', 'true');

    if (returnFocus) {
      startButton.focus();
    }
  };

  startButton.addEventListener('click', (event) => {
    event.preventDefault();
    if (isMenuOpen()) {
      closeMenu({ returnFocus: false });
    } else {
      openMenu();
    }
  });

  document.addEventListener('click', (event) => {
    if (!isMenuOpen()) {
      return;
    }

    if (startButton.contains(event.target) || startMenu.contains(event.target)) {
      return;
    }

    closeMenu({ returnFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMenu();
    }

    if ((event.key === 'ArrowDown' || event.key === 'Enter') && document.activeElement === startButton) {
      event.preventDefault();
      openMenu();
    }
  });

  startMenu.addEventListener('keydown', (event) => {
    if (event.key === 'Tab' && isMenuOpen()) {
      const focusableItems = Array.from(startMenu.querySelectorAll('a'));
      if (focusableItems.length === 0) {
        return;
      }

      const currentIndex = focusableItems.indexOf(document.activeElement);
      if (event.shiftKey && currentIndex === 0) {
        event.preventDefault();
        focusableItems[focusableItems.length - 1].focus();
      } else if (!event.shiftKey && currentIndex === focusableItems.length - 1) {
        event.preventDefault();
        focusableItems[0].focus();
      }
    }
  });
})();
