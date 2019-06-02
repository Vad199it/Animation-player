const menu = document.getElementById('menu');
const colorMenu = document.getElementById('color-menu');
const figure = document.getElementById('edit');

const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
let currColor = rootStyles.getPropertyValue('--curr-bg-color');
let prevColor = rootStyles.getPropertyValue('--prev-bg-color');

if (!sessionStorage.getItem('first_reloaded')) {
  sessionStorage.setItem('prevColor', prevColor);
  sessionStorage.setItem('currColor', currColor);
}
sessionStorage.setItem('first_reloaded', true);

currColor = sessionStorage.getItem('currColor');
prevColor = sessionStorage.getItem('prevColor');
root.style.setProperty('--prev-bg-color', prevColor);
root.style.setProperty('--curr-bg-color', currColor);

if (sessionStorage.getItem('is_reloaded')) {
  document.getElementById('edit').innerHTML = sessionStorage.getItem('figureContent');
}

$('.figure').draggable({ disabled: true });

function checkAttribute(name, target) {
  return target.getAttribute('data-action') === name;
}
function saveColorInSession(prev, curr) {
  sessionStorage.setItem('prevColor', prev);
  sessionStorage.setItem('currColor', curr);
}
function transform(e) {
  const { target } = e;
  if (target.className.split(' ')[0] !== 'figure') return;
  if (target.style.borderRadius === '119px') {
    target.style.borderRadius = '0px';
  } else {
    target.style.borderRadius = '119px';
  }
  sessionStorage.setItem('figureContent', figure.innerHTML);
  sessionStorage.setItem('is_reloaded', true);
}

function paint(e) {
  const { target } = e;
  if (target.className.split(' ')[0] !== 'figure') return;
  target.style.background = currColor;
  sessionStorage.setItem('figureContent', figure.innerHTML);
  sessionStorage.setItem('is_reloaded', true);
}

function addColor(e) {
  const { target } = e;
  if (target.className.split(' ')[0] !== 'figure') return;
  prevColor = currColor;
  root.style.setProperty('--prev-bg-color', prevColor);
  currColor = getComputedStyle(target).backgroundColor;
  root.style.setProperty('--curr-bg-color', currColor);
  saveColorInSession(prevColor, currColor);
  sessionStorage.setItem('figureContent', figure.innerHTML);
}

function run() {
  window.move();
}

function removeClickListeners() {
  figure.removeEventListener('click', transform);
  figure.removeEventListener('click', run);
  figure.removeEventListener('click', paint);
}

function changeColorMenuState(newColor) {
  prevColor = currColor;
  root.style.setProperty('--prev-bg-color', prevColor);
  currColor = newColor;
  root.style.setProperty('--curr-bg-color', currColor);
}

function swapColorMenuState() {
  root.style.setProperty('--prev-bg-color', currColor);
  root.style.setProperty('--curr-bg-color', prevColor);
  const color = currColor;
  currColor = prevColor;
  prevColor = color;
}

function ColorMenu(e) {
  const { target } = e;

  let name = 'prevColor';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    saveColorInSession(currColor, prevColor);
    swapColorMenuState();
  }

  name = 'red';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    changeColorMenuState('#F74141');
    saveColorInSession(prevColor, currColor);
  }

  name = 'blue';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    changeColorMenuState('#41B6F7');
    saveColorInSession(prevColor, currColor);
  }

  name = 'green';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    changeColorMenuState('#0abe59');
    saveColorInSession(prevColor, currColor);
  }

  name = 'purple';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    changeColorMenuState('#800080');
    saveColorInSession(prevColor, currColor);
  }

  name = 'brown';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeClickListeners();
    changeColorMenuState('#a52a2a');
    saveColorInSession(prevColor, currColor);
  }
}

function removeAllListeners() {
  figure.removeEventListener('click', transform);
  figure.removeEventListener('click', run);
  figure.removeEventListener('click', paint);
  colorMenu.removeEventListener('click', ColorMenu);
  figure.removeEventListener('click', addColor);
  $('.figure').draggable('disable');
}

function interactWithMenu(e) {
  const { target } = e;
  let name = 'transform';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeAllListeners();
    figure.addEventListener('click', transform);
  }

  name = 'move';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeAllListeners();
    figure.addEventListener('click', run);
  }

  name = 'paintBucket';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeAllListeners();
    figure.addEventListener('click', paint);
  }

  name = 'chooseColor';
  if (checkAttribute(name, target)
        || checkAttribute(name, target.parentElement)
        || checkAttribute(name, target.parentElement.parentElement)) {
    removeAllListeners();
    colorMenu.addEventListener('click', ColorMenu);
    figure.addEventListener('click', addColor);
  }
}

menu.addEventListener('click', interactWithMenu);


function interactWithKeyboardMenu(e) {
  switch (e.which) {
    case 81: // Q
      removeAllListeners();
      figure.addEventListener('click', paint);
      break;
    case 69: // E
      removeAllListeners();
      colorMenu.addEventListener('click', ColorMenu);
      break;
    case 82: // R
      removeAllListeners();
      figure.addEventListener('click', run);
      break;
    case 84: // T
      removeAllListeners();
      figure.addEventListener('click', transform);
      break;
    default:
  }
}

document.addEventListener('keydown', interactWithKeyboardMenu);
