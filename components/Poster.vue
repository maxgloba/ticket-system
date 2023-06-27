<template>
<div class="scene">
  <div class="canvas" style="transform: translate(-50%, -50%) rotateY(25.7241deg) rotateX(39.0361deg);">
    <div class="poster">
      <img :src="img" alt="">
    </div>
    <div class="glass" style="background-position: 371.38px 195.181px;"></div>
    <div class="frame-left-inner">
      <div class="frame-left-surface">
        <div class="frame-left-outter"></div>
      </div>
    </div>
    <div class="frame-right-inner">
      <div class="frame-right-surface">
        <div class="frame-right-outter"></div>
      </div>
    </div>
    <div class="frame-top-inner">
      <div class="frame-top-surface">
        <div class="frame-top-outter"></div>
      </div>
    </div>
    <div class="frame-bottom-inner">
      <div class="frame-bottom-surface">
        <div class="frame-bottom-outter"> </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  props: ['img'],
  mounted(){
    (function() {

      var scene = document.getElementsByClassName('scene')[0];
      var canvas = document.getElementsByClassName('canvas')[0];
      var glass = document.getElementsByClassName('glass')[0];

      try {
        document.createEvent("TouchEvent");
        scene.addEventListener('touchmove', onTouchMove);
      } catch (e) {
        scene.addEventListener('mousemove', onMouseMove);
      }

      function onTouchMove(event) {
        event.preventDefault();

        var x = event.touches[0].pageX;
        var y = event.touches[0].pageY;

        updateRotation(x, y);
      }

      function onMouseMove(event) {
        var x = event.x;
        var y = event.y;

        updateRotation(x, y);
      }

      function updateRotation(x, y) {
        var yAxisRotation = (x - (window.innerWidth / 2)) * (80 / window.innerWidth);
        var xAxisRotation = (y - (window.innerHeight / 2)) * (-80 / window.innerHeight);

        var transformations = [
          'translate(-50%, -50%)',
          'rotateY(' + yAxisRotation + 'deg)',
          'rotateX(' + xAxisRotation + 'deg)'
        ];

        glass.style.backgroundPosition = (500 - yAxisRotation * 5 + 'px ') + (xAxisRotation * 5 + 'px');
        canvas.style.transform = transformations.join(' ');
      };

    })();
  }
}
</script>
<style lang="scss" scoped>
$frame-height: 400px;
$frame-width: 400px;
$frame-color: rgb(10, 10, 10);

$frame-outside-depth: 15px;
$frame-inside-depth: 4px;
$frame-thickness: 5px;
$reflectiveness: 0.01;

.scene {
  position: relative;
  min-height: 100vh;
  perspective: 1000px;
  overflow: hidden;
  user-select: none;
}

.canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: $frame-width;
  height: $frame-height;
  transform-origin: center center 0px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  background: #28495B;

  .poster {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
  }

  .poster-title {
      position: absolute;
      width: 100px;
      left: 25px;
      bottom: 25px;
      font-weight: 100;
      color: rgba(255, 255, 255, 0.6);
      font-size: 40px;
      line-height: 45px;
    }

  div {
    position: absolute;
    transform-style: preserve-3d;
  }
}

.title {
  position: absolute;
  right: 0;
  font-weight: 100;
  font-size: 12px;
  color: white;
  transform: translateX(120%);

  .subtitle {
    margin-top: 10px;
    width: 110px;
    line-height: 17px;
    font-size: 9px;
    color: rgb(190, 190, 190)
  }
}

.glass {
  position: absolute;
  width: $frame-width;
  height: $frame-height;

  transform: translateZ(3px);
  background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/258608/room.png');
  background-position: 0px 0px;
  opacity: $reflectiveness;

}

.frame-left-inner {
  left: 0;
  width: $frame-inside-depth;
  height: $frame-height;
  transform-origin: left bottom;
  transform: rotateY(-90deg);

  background: lighten($frame-color, 5%);
}

.frame-left-surface {
  right: 0;
  width: $frame-thickness;
  height: $frame-height;
  transform-origin: right bottom;
  transform: rotateY(90deg);

  background: lighten($frame-color, 10%);
}

.frame-left-outter {
  top: -$frame-thickness;
  width: $frame-outside-depth;
  height: $frame-height + $frame-thickness * 2;
  transform-origin: left bottom;
  transform: rotateY(90deg);

  background: darken($frame-color, 15%);
}

.frame-right-inner {
  right: 0;
  width: $frame-inside-depth;
  height: $frame-height;
  transform-origin: right bottom;
  transform: rotateY(90deg);

  background: darken($frame-color, 15%);
}

.frame-right-surface {
  left: 0;
  width: $frame-thickness;
  height: $frame-height;
  transform-origin: left bottom;
  transform: rotateY(-90deg);

  background: lighten($frame-color, 10%);
}

.frame-right-outter {
  right: 0;
  top: -$frame-thickness;
  width: $frame-outside-depth;
  height: $frame-height + $frame-thickness * 2;
  transform-origin: right bottom;
  transform: rotateY(-90deg);

  background: lighten($frame-color, 15%);
}


.frame-top-inner {
  right: 0;
  width: $frame-width;
  height: $frame-inside-depth;
  transform-origin: right top;
  transform: rotateX(90deg);

  background: darken($frame-color, 20%);
}

.frame-top-surface {
  bottom: 0;
  left: -$frame-thickness;
  width: $frame-width + $frame-thickness*2;
  height: $frame-thickness;
  transform-origin: right bottom;
  transform: rotateX(-90deg);

  background: lighten($frame-color, 10%);
}

.frame-top-outter {
  width: $frame-width + $frame-thickness * 2;
  height: $frame-outside-depth;
  transform-origin: right top;
  transform: rotateX(-90deg);

  background: lighten($frame-color, 20%);
}

.frame-bottom-inner {
  bottom: 0;
  left: 0;
  width: $frame-width;
  height: $frame-inside-depth;
  transform-origin: right bottom;
  transform: rotateX(-90deg);

  background: lighten($frame-color, 15%);
}

.frame-bottom-surface {
  top : 0px;
  left: -$frame-thickness;
  width: $frame-width + $frame-thickness * 2;
  height: $frame-thickness;
  transform-origin: right top;
  transform: rotateX(90deg);

  background: lighten($frame-color, 10%);
}

.frame-bottom-outter {
  bottom: 0;
  width: $frame-width + $frame-thickness*2;
  height: $frame-outside-depth;
  transform-origin: right bottom;
  transform: rotateX(90deg);

  background: darken($frame-color, 20%);
}
</style>