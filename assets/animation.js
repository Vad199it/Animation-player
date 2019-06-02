let intervalImg = null;

function startAnimation(interval = 12) {
  const frames = document.getElementById('list-image-animation').children;
  if (!frames.length) return;
  let i = 0;
  if (intervalImg) {
    clearInterval(intervalImg);
  }
  intervalImg = setInterval(() => {
      console.log();

    frames[i % frames.length].style.display = 'none';
    frames[++i % frames.length].style.display = 'block';
  }, interval * 100);
}

startAnimation();

document.getElementById('fps').addEventListener('change', (event) => {
  const { value } = event.target;
  document.getElementById('fps-label').innerHTML = value;
  startAnimation(value);
});
