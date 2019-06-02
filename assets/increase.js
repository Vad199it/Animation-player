(function () {
  const root = document.querySelector(':root');
  const rootStyles = getComputedStyle(root);
  const currWidth = rootStyles.getPropertyValue('--width-animation');
  const currHeight = rootStyles.getPropertyValue('--height-animation');
  const currTop = rootStyles.getPropertyValue('--top-animation');
  const prevRight = rootStyles.getPropertyValue('--right-animation');
  const prevMargin = rootStyles.getPropertyValue('--margin');
  let i = 0;

  function increase() {
    if (i === 0) {
      root.style.setProperty('--width-animation', '80%');
      root.style.setProperty('--height-animation', '80%');
      root.style.setProperty('--top-animation', '0');
      root.style.setProperty('--right-animation', '5%');
      root.style.setProperty('--margin', '-10%');
      i += 1;
    } else {
      root.style.setProperty('--width-animation', currWidth);
      root.style.setProperty('--height-animation', currHeight);
      root.style.setProperty('--top-animation', currTop);
      root.style.setProperty('--right-animation', prevRight);
      root.style.setProperty('--margin', prevMargin);
      i -= 1;
    }
  }

  window.increase = increase;
}());
