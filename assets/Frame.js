const listScroller = document.getElementById('preview-list-scroller');
const containerAnimation = document.getElementById('list-image-animation');
let mass = [];

function initArray() {
  containerAnimation.innerHTML = '';
  mass.forEach(img => containerAnimation.innerHTML += `<img class="frames" src= ${img} style="width: 24px height:24px"/>`);
}

function deleteFrame(btn, index) {
  mass.splice(index, 1);
  ((btn.parentNode).parentNode).removeChild(btn.parentNode);
  initArray();
}

function copyFrame(btn, index) {
  let clone = (btn.parentNode).cloneNode(true);
  ((btn.parentNode).parentNode).appendChild(clone);
  mass.push(mass[index]);
  initArray();
}

function frame() {
  html2canvas(document.getElementById('edit'), {
    onrendered(canvas) {
      let img = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
      mass.push(img);
      const interval = document.getElementById('fps').value;
      window.startAnimation(interval);
      containerAnimation.innerHTML += `<img class="frames" src= ${img} style="width: 24px height:24px"/>`;
      listScroller.innerHTML += `<div class="item-scroller">
            <img class="frames" src= ${img} style="width: 24px height:24px"/>
            <button class="del" onclick="deleteFrame(this, mass.length - 1)">delete</button>
            <button class="copy" onclick="copyFrame(this, mass.length - 1)">copy</button>
       </div>`;
    },
  });
}

