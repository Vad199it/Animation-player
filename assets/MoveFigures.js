function getPosition(item) {
  const tmpItem = document.getElementById(`item${item}`);
  return { left: tmpItem.offsetLeft, top: tmpItem.offsetTop };
}
window.move = () => {
  $('.figure').draggable('enable');
  $('.figure').draggable({
    start() {
      const target = document.getElementById(this.id);
      target.style.zIndex = 100;
    },
    stop() {
      const newPosition = [];

      for (let i = 1; i < 1296; i += 1) {
        const positionData = getPosition(i);
        const nowPosition = {
          name: `item${i}`,
          positionLeft: positionData.left,
          positionTop: positionData.top,
        };

        newPosition.push(nowPosition);
      }

      newPosition.sort((a, b) => {
        if (a.positionTop === b.positionTop) {
          return b.positionLeft - a.positionLeft;
        }
        if (a.positionTop < b.positionTop) {
          return 1;
        }
        if (a.positionTop > b.positionTop) {
          return -1;
        }

        return 0;
      });


      let number = 0;
      for (let i = newPosition.length; i -= 1;) {
        const tmpItem = document.getElementById(newPosition[i].name);
        tmpItem.style.order = number;
        tmpItem.style.left = 0;
        tmpItem.style.top = 0;

        number += 1;
      }

      const target = document.getElementById(this.id);
      target.style.zIndex = 0;
      sessionStorage.setItem('figureContent', document.getElementById('edit').innerHTML);
      sessionStorage.setItem('is_reloaded', true);
    },

  });
};
