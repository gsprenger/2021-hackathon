document.addEventListener('DOMContentLoaded', function () {
  var TOP_TURN = false;
  const PORTRAIT = true;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');
  context.globalAlpha = .1;
  var fps = 1000 / 60;
  var then = Date.now();
  var startTime = then;

  var speedUpSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABdElEQVRYR82W0RXCIAxF0zXcpG7jnyP55xwuYDdxjXpSm/oIoQlHetA/BJLLy4N0IPxN5zkZlwbjc7CmbhOF9l9H2vZ/A3HyQuAsmbGWk2PgvYPg2g9ATXKJDHtqkst22TOYyaUUoogeA8SNnmSdXMohc3rMIfi/FACViEBM5xkBvKTWfA7AaKWTG1BagQgEqpKXwDu5UskqgQeBPmjqATRjBCL3ADp8rxQFE7YB6FqCSHKlTFsTdr+GP3oAn9+4Cbs/xcbb7nbE5s1IS+8RHNKOuSleYv18vH/7efI5cQrufxnfA5y8FFgLYq2dTjSPEHhPRFy7fA/UJN+qBcA1ybf9K/CAyaUEokRo/CDCkzPM8latalhjnEsARI0lwFpnCyKZUwBLDAcCVcgAIhBYBgIALEUEgtdkJYjKv4EqAE9+Pf9fHgiZTvujpQlrbsQhJUjMtXMTDjNh5AZkKrW8hl080P0ptt52rxs3b0bafB5Ay3b8BvT6cqvw5EPXAAAAAElFTkSuQmCC';

  var powerUpSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAABwCAYAAAAXB/A7AAACGklEQVRYR+1ZsXHDMAwk1/AY6egVMkHKdBkpXcpM4BWiLmNkDeVAkcoLhEjAlKy7nFxZJv75AB+QbXmHr+E6Lq7XLsKXz0vzG0dgWKgSQexEYAFn5oTxC3AtBUndcB2XBKoCQJBIYFGxj4JcVMURUv3+XQ0sJ5BqtUENuq3MvK0yY9FMSKJhENvZOfc+ONU8eAuunAcExoWaEIyNTBZwJs4YvwaW0uEKKWaVQFPLJkFLRZOgpUJFUFOhImgdZ7WIx9agtXs2YL8Puq3Mvd06e77h3925t53jZHvVzYPwIcwDAuNCLRWMjSlYwPP0Sxt6DRhTQ5X0uYpgLR0TgaTCRCCpMBNwFWYCrsJEcGwN9vVBt5W5tzXzoGgmJNEQiO0cU7ko58GPNA8ubgywUJ0HEDvNAwN4TjdhvBac00OV9JmaQOxGKwFX8XgFeNRUi8crOLYG+/mg28rc25p2Rvsvvh90tXNMxX2qfi8E91L+XiAwLlTnAcRO88AAnmuWMN4C5rF0bSIo7o33EKCKYxRg0Y9RcGwN9vFBt5W5t1XzgDcTkmgIxHaOwKdBNQ/cdxD+TyQwLFSVQOzEZAFn5oTxd4GB5CQYxrMGm9Sg28rM25p2Rvsvvh/0tXOcbTfdPAjP0vOF2+hgoZoKbZRi0/MFA3iefxPGR9nanYv7+43+Wz8Jzhps4YPcRFY3JgPCwzqDI4tmwgbRTBRQ+wsmv4hBGUclzwAAAABJRU5ErkJggg=='

  var bulletSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAYAAADwdn+XAAAAQ0lEQVQoU2NkSPr/n4FUMI+REaYFzgALfPn//z83AwPjVwYGYmlUA6DG/v9PvKswDCBFM8g+6hsAMpUUV1AhECmMRgChtzPdurGgmgAAAABJRU5ErkJggg==';
  const bulletSpriteY = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAQCAYAAAArij59AAAAAXNSR0IArs4c6QAAAGJJREFUKFPdkDsOgDAMQ+0ZTll2DsMOpyzzQ6EUqagSAxue8nGs6FmhDAxndcu7pNF2TADadekcek9IwNq7lzxJVgItUveH+TL8JyGgVaK1bjgE9wZXBlUO2h7L6kxQSH4xHAd5V/HxzFg4AAAAAElFTkSuQmCC'

  var burnSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAABACAYAAAB7jnWuAAAAw0lEQVRoQ+2ZwQ3AIAwDYY7uP1rnoAIJBFXfPkt1F8A4l5CktcBfhc8vPgLu0tpVqlxQ7QfPMCAC+uFTBCJgd6CLUYsYMSdFhIHDAQsG5BCSAHbHvbLgnwy8C1EgVHOQQuTlgDoDRiW0asmI3jAMeDAw3wMkCzIbxoE4EAfiwO4AsSlZSylsSYXviGYICPs/p2P1k3wwoJ6KPPYDFgzsIjAGqL4wEPo5gEFoUYrVt1+VkErBQwD1LMv/kr170AiIA3HgARYMhEG2cflOAAAAAElFTkSuQmCC';

  var popCornSprite = 'data:image/png;base64,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';

  var shipSprite = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAFACAYAAADd+X4aAAAAAXNSR0IArs4c6QAABPxJREFUeF7tnb+KFEEQxmfhInHBjUXByERMTEzkEA4NFMwVBB/DJ7j3MDA/8DJBfAefQDE+8B5gpPaopaan/1V39fSsfhv2/qna38z0VH39zcxm6PzadI4/IAEQAAEvgd/DONLheXfYTN5/dPll/PHq9ew7z3/9HL/duz8b/3R9Pb7fbqOUJ29yYJ4bbr0dht3nmyQoOI/LJCg4j8skKDiPx5LY/7gbmMYoOL+evbuczFecgAxOH+AEzq+ubgienBy+F0oiSSAU/M3X7+Ofhw8OATg4JfXi9naSMCfiSyK6D7y89P9zCs4RKAkZnMfdJHj84243iRncQeQ2py8zdhmcxi/OTve/4W4OGstJwpuANri7OST/VBKzBEqCy83hO7vGklgfAf4HWhKm+wDPC4sfBb6Z0GIeCB2CNN50JpQ7pHv883vJmbD0XMDTMQUKBT8QcA8dq7MhJRELHkzAdyy3GkNFBAIgAAIgAAIgAAIzArIwXVQf8FXEVAWV1oTZ+kBKG6AktPqADM6lXFIfCBHQ9gVUiEphQtaSWfqATETbGclSPDcJc31AdsI5STTrjlOJ8OZYXB9whatmBHK1IvN9QCPPeFuzmqNAihQpbWjWHVvNAz6dMKoPtJgJ5XwQCz7ZBNbngmJ9wPJsCH0gR9RASQYCIAACIAACILBOAlYrJv+vf6BIH6DyyWLdsFofkIkclT7ga0YW1QeePnnsLYJTSZjqAyVJmOsDIQOLiyeokFj4BziJFP7k2rH2KGB9gBLICT5LwGIeiCUR1AlTGoFWKZUiRczElEWgVCuWScA/EGvT11mQ5AgLVp8BARAAARAAARAAgab+AdWKSbc1o1RFXOIf8K2iL+Yf8JXkMRNDdB9YvDOSdV6Nt7y6N9QGl9cXVHfHJcGZXFd9oCR41FmtJWGmEdX4B6pcNFb+AbVO2GImLFJKrc8F2V6y0LUFNL6om86q29X+DioiEAABEAABEAABEPASsPIPqPSB0Op56ZqRylOaqoy1q2ZFrlor/4DaV+wrIrtdeW2lD+Qa24PNqbYxPZr7D7gL2iRcmfsH3H0qtJLe1D/ASXy4s/M2SlKyi86EWpWsSh+wmgfU+oAvMI3V3ImlSB+wPhcU6wMyEegDWrGh5PMoyUAABEAABEAABNZHoNsVl9ZrRtn6QEobqPUPcJWUvCuX1bphtT5Qs3JadeW1W1BqW3TTe9Npgx+NPuBSph1zEX3A1y/wURGcCbWbwWwf6HYUtJgHfJqQuzk2LWbCIn3A+lxQrA9Yng3VV9uVtNe131lfQVL7j7TfBwEQAAEQAAEQAAH4B/YEUpUx/ANcZvkeIYDnFxAd6AOmBHiH66YPyHlB6x+oVsms7j+Qe3PEg4tm1TPhIl4yt6Hs5qbTdrYWn0dFBAIgAAIgAAIgAAIzApYrJqrrC6zXjOAfiC3Xyvei+8DinZHMrGtvqA1u2h2XBGdy8pmXkiaeb+hzTvDYeo6CFv6B2D8/EEhpA92dVIvrA93Ohha9fslvoCICARAAARAAARAAAfgH4B+I7gPQB2LOCXrv4ux0TxD6gCkB+Adkf0e3ANA+57ToOqOURtDVSbW4PiA9JLX3H1Cp5SW9vcV3UBGBAAiAAAiAAAiAAPwDTa66Lbo/Ybd1w5CjlsahD0Af6EKguz7wT91/AP4BJqB6viH8Axaig+Y3UJKBAAh0J/AX9XJPuZD7OioAAAAASUVORK5CYII=';
  const shipSpriteY = 'data:image/png;base64,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'

  var explosionSprite = 'data:image/png;base64,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';

  canvas.id = 'viewport';
  canvas.width = window.innerWidth*.5;
  canvas.height = window.innerHeight*.5;
  context.imageSmoothingEnabled = false;
  document.getElementsByTagName('body')[0].appendChild(canvas);
  WAVE = 1800;
  if (TOP_TURN) {
    canvas.style.transform = 'scaleX(-1)';
    UP = 39;
    DOWN = 37;
    LEFT = 40;
    RIGHT = 38;
    SHOOT = 32;
    RESET = 82;
    START = 13;
  } else {
    UP = 38;
    DOWN = 40;
    LEFT = 37;
    RIGHT = 39;
    SHOOT = 32;
    RESET = 82;
    START = 13;
  }

  function State(name, updater, renderer)
  {
    this.name = name;
    this.updater = updater;
    this.renderer = renderer;
  }

  function Intersection() {

  }

  Intersection.rectanglesIntersect = function(rect1, rect2) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect1.x + rect1.width > rect2.x &&
      rect1.y < rect2.y + rect2.height &&
      rect1.height + rect1.y > rect2.y
    );
  }

  function Star(x, y) {
    var r = Math.max(50,Math.floor(Math.random()*256));
    var g = Math.max(125, Math.floor(Math.random()*256));
    var b = Math.max(240, Math.floor(Math.random()*256));
    this.x = Math.floor(x);
    this.y = Math.floor(y);
    var size = Math.floor(Math.random() * Star.MAX_SIZE);
    this.width = size;
    this.height = size;
    this.variance = Math.max(Math.random(), .2);
    this.color = 'rgb('+r+', '+g+', '+b+')';
  }

  Star.SPEED = 5;
  Star.MAX_SIZE = 2;
  Star.prototype.updateX = function() {
    if (game.overdrive) {
      var travel = Star.SPEED*this.variance*6;
      this.width = 50;
    } else {
      var travel = Star.SPEED*this.variance;
      this.width = this.height;
    }
    this.x -= travel;
    if(this.x + this.width < 0) {
      this.x = canvas.width;
    }
  }
  Star.prototype.updateY = function() {
    if (game.overdrive) {
      var travel = Star.SPEED*this.variance*6;
      this.height = 50;
    } else {
      var travel = Star.SPEED*this.variance;
      this.height = this.width;
    }
    this.y += travel;
    if(this.y > canvas.height) {
      this.y = 0;
    }
  }
  Game.prototype.updateScore = function() {
    document.getElementById('score').innerHTML = 'SCORE: ' + this.score;
  }

  Game.prototype.updateLives = function() {
    document.getElementById('lives').innerHTML = 'LIVES: ' + this.lives;
  }
  Star.prototype.render = function(context) {
    if (game.overdrive) {
      context.globalAlpha = .6;
    }
    context.fillStyle = (game.overdrive) ? 'rgba(125, 135, 255, 1)' : this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    context.globalAlpha = 1;
  }

  function Explosion(x, y) {
    this.currentFrame = 0;
    this.frames = 12;
    this.buffer = 4;
    this.currentBuffer = 0;
    this.alive = false;
    this.img = document.createElement('img');
    this.img.src = explosionSprite;
  }

  Explosion.prototype.reset = function() {
    this.currentFrame = 0;
    this.frames = 12;
    this.buffer = 4;
    this.currentBuffer = 0;
    this.alive = false;
  };

  Explosion.prototype.updateX = function() {
    if (!this.alive) {
       return;
    }
    this.x -= Popcorn.SPEED;
    if (this.currentBuffer === this.buffer) {
      this.currentBuffer = 0;
      this.currentFrame++;
      if (this.currentFrame === this.frames) {
        this.reset();
      }
    }
    this.currentBuffer++;
  }

  Explosion.prototype.updateY = function() {
    if (!this.alive) {
       return;
    }
    this.y += Popcorn.SPEED;
    if (this.currentBuffer === this.buffer) {
      this.currentBuffer = 0;
      this.currentFrame++;
      if (this.currentFrame === this.frames) {
        this.reset();
      }
    }
    this.currentBuffer++;
  }

  Explosion.prototype.render = function(context) {
    if (!this.alive) {
       return;
    }
    context.drawImage(
      this.img,
      0, this.currentFrame * 32, 32, 32,
      this.x-16, this.y-16, 64, 64
    );
  }

  function TitleState(name)
  {
    State.call(this, name, this.update, this.render);
  }

  TitleState.prototype = new State();

  TitleState.prototype.init = function() {
    game.overdrive = true;
    context.setTransform(1, 0, 0, 1, 0, 0);
    game.showUI('title');
    this.entities = [];
    this.starField = [];
    for (var i = 0; i < 1024; i++) {
      this.starField.push(
        new Star(
          Math.random()*canvas.width,
          Math.random()*canvas.height
        )
      );
    }
  }

  TitleState.prototype.update = function() {
    if (inputManager.start) {
      game.setState(game.states.game);
      game.currentState.init();
    }
    this.starField.forEach(function(entity) {
      if (PORTRAIT === true) {
        entity.updateY();
      } else {
        entity.updateX();
      }
    })
  }

  TitleState.prototype.render = function(context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    this.starField.forEach(function(entity) {
      entity.render(context);
    })
  }

  function GameOverState(name)
  {
    State.call(this, name, this.update, this.render);
  }

  GameOverState.prototype = new State();

  GameOverState.prototype.init = function() {
    context.setTransform(1, 0, 0, 1, 0, 0);
    this.timer = 0;
    console.log('Game Over');
    game.showUI('game_over');
    document.querySelector('#final_score').innerHTML = 'FINAL SCORE: ' + game.score;
  }

  GameOverState.prototype.update = function() {
    if (inputManager.start) {
      game.setState(game.states.game);
      game.currentState.init();
      game.reset();
    }
    this.timer++;
  }

  GameOverState.prototype.render = function(context) {
    for (var i = 0; i < canvas.width; i++) {
      context.drawImage(
        canvas,
        i, 0, 1, canvas.height,
        i, Math.sin((i*20*Math.PI/180))*2, 1, canvas.height
      );
    }
    for (var i = 0; i < canvas.height; i++) {
      context.drawImage(
        canvas,
        i, 0, canvas.width, 1,
        i, Math.sin((i*12*Math.PI/180))*2, canvas.width, 1
      );
    }
    if (this.timer > 60) {
      context.globalAlpha = .3;
    }
  }


  function GameState(name)
  {
    State.call(this, name, this.update, this.render);
  }

  GameState.prototype = new State();

  GameState.prototype.init = function() {
    game.overdrive = true;
    this.overdriveTimer = 90;
    context.setTransform(1, 0, 0, 1, 0, 0);
    game.showUI('game');
    this.timer = 0;
    this.tier1 = 1 * WAVE;
    this.tier2 = 2 * WAVE;
    this.tier3 = 3 * WAVE;
    this.tier4 = 4 * WAVE;
    this.enemyTimerEasy = 120;
    this.enemyTimerMedium = 60;
    this.enemyTimerHard = 30;
    this.enemyTimerNightmare = 5;
    this.currentEnemyTimer = this.enemyTimerEasy;
    this.powerUpTimer = 1600;
    this.starField = [];
    for (var i = 0; i < 1024; i++) {
      this.starField.push(
        new Star(
          Math.random()*canvas.width,
          Math.random()*canvas.height
        )
      );
    }

    if (PORTRAIT === true) {
      this.player = new Player(Math.floor(canvas.width * .5), Math.floor(canvas.height - 20), 100, null);

      for (var i = 0; i < 256; i++) {
        this.player.bulletPool.push(new Bullet(this.player.x + 16, this.player.y, 1, 15));
      }
    } else {
      this.player = new Player(20, Math.floor(canvas.height * .5), 100, null);

      for (var i = 0; i < 256; i++) {
        this.player.bulletPool.push(new Bullet(this.player.x + 32, this.player.y + 16, 1, 15));
      }
    }
    this.enemyList = [];
    if (PORTRAIT === true) {
      for (var i = 0; i < 32; i++) {
        this.enemyList.push(new Popcorn(Math.random() * (canvas.width - 32), 0));
      }
    } else {
      for (var i = 0; i < 32; i++) {
        this.enemyList.push(new Popcorn(canvas.width, Math.random() * (canvas.height - 32)));
      }
    }

    this.explosions = [];
    for (var i = 0; i < 32; i++) {
      this.explosions.push(new Explosion(0, 0));
    }

    this.powerUps = [];
    for (var i = 0; i < 32; i++) {
      this.powerUps.push(new PowerUp(0, 0));
    }

    this.entities = [this.player];
    this.entities = this.entities.concat(
      this.enemyList,
      this.explosions,
      this.powerUps,
      this.player.bulletPool
    );

    console.log('game initialised');
  }

  GameState.prototype.deployEnemies = function() {
    if (this.timer && (this.timer % this.currentEnemyTimer === 0) ) {
      var enemy = this.enemyList.find(function(enemy) {
        return !enemy.alive;
      });
      enemy.reset();
      enemy.alive = true;
      if (PORTRAIT === true) {
        enemy.y = 0;
        enemy.x = Math.max(4, (canvas.width * Math.random()) - 24);
      } else {
        enemy.x = canvas.width;
        enemy.y = Math.max(4, (canvas.height * Math.random()) - 24);
      }
    }
  }

  GameState.prototype.deployPowerUps = function() {
    if (this.timer && (this.timer % this.powerUpTimer === 0) ) {
      if (Math.random() >= .01) {
        var powerup = this.powerUps.find(function(powerup) {
          return !powerup.alive;
        });
        powerup.alive = true;
        if (PORTRAIT === true) {
          powerup.y = 0;
          powerup.x = (canvas.width * Math.random()) - 16;
        } else {
          powerup.x = canvas.width;
          powerup.y = (canvas.height * Math.random()) - 16;
        }
      }
    }
  }

  GameState.prototype.update = function() {

    if (this.timer > this.tier2) {
        this.currentEnemyTimer = this.enemyTimerMedium;
    }

    if (this.timer > this.tier3) {
        this.currentEnemyTimer = this.enemyTimerHard;
    }

    if (this.timer > this.tier4) {
        this.currentEnemyTimer = this.enemyTimerNightmare;
    }

    if (this.overdriveTimer < this.timer) {
      game.overdrive = false;
    }
    this.timer++;

    this.deployEnemies();
    this.deployPowerUps();

    if (PORTRAIT === true) {
      this.entities.forEach(function(entity) {
        entity.updateY();
      });
    } else {
      this.entities.forEach(function(entity) {
        entity.updateX();
      });
    }

    this.player.bulletPool.forEach(function(bullet) {
      if (!bullet.alive) {
        return;
      }

      game.currentState.enemyList.forEach(function(enemy) {
        if (!enemy.alive) {
          return;
        }
        if (Intersection.rectanglesIntersect(bullet, enemy)) {
          enemy.takeDamage(10);
          bullet.alive = false;
          if (!enemy.alive) {
            game.score += enemy.value;
            game.updateScore();
            enemy.hit = true;
            var explosion = game.currentState.explosions.find(notAlive);
            explosion.x = enemy.x;
            explosion.y = enemy.y;
            explosion.alive = true;
          }
        }
      });
    });
    var player = game.currentState.player;
    if (player.alive) {
      this.enemyList.forEach(function(enemy) {
        if(!enemy.alive) {
          return;
        }
        var playerHitBox = player.getHitBox();
        if(Intersection.rectanglesIntersect(enemy, playerHitBox)) {
          player.takeDamage(500);
          enemy.takeDamage(500);
          game.lives--;
          game.updateLives();
          var explosion = game.currentState.explosions.find(notAlive);
          explosion.x = enemy.x;
          explosion.y = enemy.y;
          explosion.alive = true;

          var explosion = game.currentState.explosions.find(notAlive);
          explosion.x = player.x;
          explosion.y = player.y;
          explosion.alive = true;

          if (game.lives === 0) {
            game.setState(game.states.game_over);
            game.currentState.init();
          }
        }
      });

      this.powerUps.forEach(function(powerup) {
        if (!powerup.alive) {
          return;
        }
        if (Intersection.rectanglesIntersect(powerup, player.getHitBox())) {
          player.powerLevel++;
          powerup.reset();
          game.score += powerup.value;
          game.updateScore();
        }
      });
    }
  }
  notAlive = function(item){
    return !item.alive;
  }
  alive = function(item) {
    return alive;
  }
  GameState.prototype.renderBackground = function(context) {
    if (PORTRAIT === true) {
      this.starField.forEach(function(star) {
        star.updateY();
        star.render(context);
      })
    } else {
      this.starField.forEach(function(star) {
        star.updateX();
        star.render(context);
      })
    }
  }

  GameState.prototype.render = function(context)  {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalAlpha = 1;
    this.renderBackground(context);
    this.entities.forEach(
      function(entity){
        entity.render(context);
      }
    );
  }

  function Game()
  {
    this.reset();
    this.states = {};
    this.states['game'] = new GameState('game');
    this.states['title']  = new TitleState('title');
    this.states['game_over'] = new GameOverState('game_over');
    this.entities = [];
  }

  Game.prototype.reset = function() {
    this.score = 0;
    this.lives = 3;
    this.updateScore();
    this.updateLives();
  }

  Game.prototype.setState = function(state) {
    this.currentState = state;
  }

  Game.prototype.showUI = function(name)  {
    document.querySelectorAll('.state-ui-container').forEach(function(element) {
      element.style.display = 'none';
    });
    document.querySelector('#'+name).style.display = 'flex';
  }

  function Ship(x, y, width, height, health)
  {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.health = health;
    this.hit = false;

    this.alive = true;
    this.vx = 0;
    this.vy = 0;
  }

  Ship.prototype.render = function(context) {
    context.fillStyle = '#666';
    context.fillRect(this.x, this.y, this.width, this.height);
  }

  Ship.prototype.takeDamage = function(damage) {
    this.health -= damage;
    if (this.health <= 0) {
      this.alive = false;
    }
  }

  function Bullet(x, y, dir, speed) {
    this.vx = 0;
    this.vy = 0;
    if (PORTRAIT === true) {
      this.width = 8;
      this.height = 16;
    } else {
      this.width = 16;
      this.height = 8;
    }
    this.x = x;
    this.y = y;
    this.dir = dir;
    this.speed = speed;
    this.alive = false;
    this.img = document.createElement('img');
    if (PORTRAIT === true) {
      this.img.src = bulletSpriteY;
    } else {
      this.img.src = bulletSprite;
    }
  }

  Bullet.prototype.updateX = function() {
    if (!this.alive) {
      return;
    }
    if (this.dir === 1) this.vx = this.speed + (Math.min(game.currentState.player.powerLevel * 2, 20));
    if (this.dir === -1) this.vx = this.speed;
    this.x += this.vx;
    if (this.x > canvas.width) {
      this.alive = false;
    }
  }

  Bullet.prototype.updateY = function() {
    if (!this.alive) {
      return;
    }
    if (this.dir === 1) this.vy = this.speed + (Math.min(game.currentState.player.powerLevel * 2, 20));
    if (this.dir === -1) this.vy = this.speed;
    this.y -= this.vy;
    if (this.y <= 0) {
      this.alive = false;
    }
  }

  Bullet.prototype.render = function(context) {
    if (!this.alive) {
      return
    }
    if (PORTRAIT === true) {
      context.drawImage(this.img, 0, 0, 8, 16, this.x, this.y, this.width, this.height);
    } else {
      context.drawImage(this.img, 0, 0, 16, 8, this.x, this.y, this.width, this.height);
    }
  }

  function PowerUp(x, y) {
    this.x = x;
    this.y = y;
    this.timer = Math.random() * 256;
    this.currentFrame = 0;
    this.currentBuffer = 0;
    this.buffer = 4;
    if (PORTRAIT === true) {
      this.jump = canvas.width * .4;
    } else {
      this.jump = canvas.height * .5;
    }
    this.speed = 3;
    this.frames = 7;
    this.width = 16;
    this.height = 16;
    this.img = document.createElement('img');
    this.img.src = powerUpSprite;
    this.value = 20;
  }

  PowerUp.prototype.updateX = function() {
    this.vy = Math.cos(this.timer) * this.jump;
    this.timer += .03;
    this.y = canvas.height * .5 + this.vy;
    this.x -= this.speed;
    if (this.x + this.width <= 0) {
      this.reset();
    }
  }

  PowerUp.prototype.updateY = function() {
    this.vx = Math.cos(this.timer) * this.jump;
    this.timer += .03;
    this.x = canvas.width * .5 + this.vx;
    this.y += this.speed;
    if (this.y + this.height >= canvas.height) {
      this.reset();
    }
  }

  PowerUp.prototype.reset = function() {
    this.alive = false;
  }

  PowerUp.prototype.render = function(context) {
    if (!this.alive) {
      return;
    }
    if (this.currentBuffer === this.buffer) {
      this.currentBuffer = 0;
      this.currentFrame ++;
      if (this.currentFrame === this.frames) {
        this.currentFrame = 0;
      }
    }
    this.currentBuffer++;
    context.drawImage(
      this.img, 0, this.currentFrame * 16, 16, 16,
      this.x, this.y, this.width, this.height
    )
  }

  function Player(x, y, health, weapon)
  {
    Ship.call(this, x, y, 32, 32, health);
    this.burning = false;
    this.frame = 0;
    this.burnFrame = 0;
    this.weapon = weapon;
    this.speed = 5;
    this.powerLevel = 1;
    this.bulletTimer = 5;
    this.bulletCoolDown = 5;
    this.img = document.createElement('img');
    this.burnImg = document.createElement('img');
    if (PORTRAIT === true) {
      this.img.src = shipSpriteY;
    } else {
      this.img.src = shipSprite;
    }
    this.burnImg.src = burnSprite;
    this.bulletPool = [];
    this.hitBoxSize = [8, 8];
  }

  Player.prototype = new Ship();

  Player.prototype.getHitBox = function() {
    return {
      x: this.x + (this.width * .5) - (this.hitBoxSize[0] * .5),
      y: this.y + (this.height * .5) - (this.hitBoxSize[1] * .5),
      width: this.hitBoxSize[0],
      height: this.hitBoxSize[1],
    }
  }

  Player.prototype.update = function() {
    if (!this.alive) {
      if (inputManager.start) {
        game.currentState.init();
      }
      return;
    }
    this.vx = 0;
    this.vy = 0;
    if (inputManager.upPressed) {
      this.vy -= this.speed;
    }

    if (inputManager.downPressed) {
      this.vy += this.speed;
    }

    if (inputManager.rightPressed) {
      this.vx += this.speed;
      this.burning = true;
    } else {
      this.burning = false;
    }

    if (inputManager.leftPressed) {
      this.vx -= this.speed;
      this.burning = false;
    }

    if (inputManager.shooting || game.autoShoot) {
      if (this.bulletCoolDown === this.bulletTimer) {
        if (PORTRAIT === true) {
          this.shootY();
        } else {
          this.shootX();
        }
        this.bulletTimer = 0;
      } else {
        this.bulletTimer++;
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y < 0) {
      this.y = 0;
    }

    if (this.x+this.width > canvas.width) {
      this.x = canvas.width - this.width;
    }

    if (this.y+this.height > canvas.height) {
      this.y = canvas.height - this.height;
    }
  }

  Player.prototype.updateX = function() {
    this.update()
  }

  Player.prototype.updateY = function() {
    this.update()
  }

  Player.prototype.shootX = function() {
    var bullet = this.bulletPool.find(notAlive);
    if (!bullet) {
      return;
    }
    bullet.alive = true;

    const bulletW = bullet.width
    const bulletH = bullet.height
    const bulletX = this.x + this.width - bulletW
    const bulletY = this.y + this.height * .5 - bulletH * .5

    if (this.powerLevel === 1) {
      bullet.x = bulletX;
      bullet.y = bulletY;
    }

    if (this.powerLevel === 2) {
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet) {
        return;
      }
      bullet2.alive = true;

      bullet.x = bulletX;
      bullet.y = bulletY - 6;
      bullet2.x = bulletX;
      bullet2.y = bulletY + 6;
    }

    if (this.powerLevel >= 3) {
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet2) {
        return;
      }
      bullet2.alive = true;

      var bullet3 = this.bulletPool.find(notAlive);
      if (!bullet3) {
        return;
      }
      bullet3.alive = true;

      bullet.x = bulletX;
      bullet.y = bulletY - 12;
      bullet2.x = bulletX + 8;
      bullet2.y = bulletY;
      bullet3.x = bulletX;
      bullet3.y = bulletY + 12;
    }

    if (this.powerLevel >= 5) {
      var bullet = this.bulletPool.find(notAlive);
      if (!bullet) {
        return;
      }
      bullet.alive = true;
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet2) {
        return;
      }
      bullet2.alive = true;
      bullet.x = bulletX - 8;
      bullet.y = bulletY - 24;
      bullet2.x = bulletX - 8;
      bullet2.y = bulletY + 24;
    }
  }

  Player.prototype.shootY = function() {
    var bullet = this.bulletPool.find(notAlive);
    if (!bullet) {
      return;
    }
    bullet.alive = true;

    const bulletW = bullet.width
    const bulletH = bullet.height
    const bulletX = bullet.x = this.x + (this.width * .5) - (bulletW * .5);
    const bulletY = this.y

    if (this.powerLevel === 1) {
      bullet.x = bulletX;
      bullet.y = bulletY;
    }

    if (this.powerLevel === 2) {
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet) {
        return;
      }
      bullet2.alive = true;
      bullet.x = bulletX - 6;
      bullet.y = bulletY;
      bullet2.x = bulletX + 6;
      bullet2.y = bulletY;
    }

    if (this.powerLevel >= 3) {
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet2) {
        return;
      }
      bullet2.alive = true;

      var bullet3 = this.bulletPool.find(notAlive);
      if (!bullet3) {
        return;
      }
      bullet3.alive = true;

      bullet.x = bulletX;
      bullet.y = bulletY - 12;
      bullet2.x = bulletX + 8;
      bullet2.y = bulletY;
      bullet3.x = bulletX;
      bullet3.y = bulletY + 12;

      bullet.x = bulletX - 12;
      bullet.y = bulletY;
      bullet2.x = bulletX;
      bullet2.y = bulletY - 8;
      bullet3.x = bulletX + 12;
      bullet3.y = bulletY;
    }

    if (this.powerLevel >= 5) {
      var bullet = this.bulletPool.find(notAlive);
      if (!bullet) {
        return;
      }
      bullet.alive = true;
      var bullet2 = this.bulletPool.find(notAlive);
      if (!bullet2) {
        return;
      }

      bullet2.alive = true;
      bullet.x = bulletX - 24;
      bullet.y = bulletY + 8;
      bullet2.x = bulletX + 24;
      bullet2.y = bulletY + 8;
    }
  }

  Player.prototype.render = function(context) {
    if (!this.alive) {
      return;
    }
    this.buffer = this.buffer ? this.buffer + 1 : 1;
    if(this.buffer && this.buffer == 4) {
      this.frame += 1;
      if (this.frame >= 10) this.frame = 0;
      this.burnFrame += 1;
      if (this.burnFrame >= 2) this.burnFrame = 0;
      this.buffer = 0;
    }

    context.drawImage(
      this.img, 0, this.frame * 32, 32, 32,
      this.x, this.y, this.width, this.height
    )

    // if (this.burning) {
    //   context.drawImage(
    //     this.burnImg, 0, this.burnFrame * 32, 32, 32,
    //     this.x, this.y, this.width, this.height
    //   )
    // }

    this.bulletPool.forEach(function(bullet) {
      if (!bullet.alive) {
        return false;
      }
      bullet.render(context);
    })

  }

  function Popcorn(x, y)
  {
    Ship.call(this, x, y, 32, 32, Popcorn.HEALTH);
    this.img = document.createElement('img');
    this.img.src = popCornSprite;
    this.frames = 12;
    this.buffer = 4;
    this.speed = Popcorn.SPEED;
    this.value = 5;
    this.healthMax = Popcorn.HEALTH;
    this.reset();
  }

  Popcorn.prototype = new Ship();
  Popcorn.SPEED = 5;
  Popcorn.HEALTH = 80;

  Popcorn.prototype.reset = function() {
    if (PORTRAIT === 0) {
      this.y = 0;
      this.x = Math.random() * canvas.width - this.width;
    } else {
      this.x = canvas.width;
      this.y = Math.random() * canvas.height - this.height;
    }
    this.currentFrame = 0;
    this.currentBuffer = 0;
    this.alive = false;
    this.health = Popcorn.HEALTH;
  }

  Popcorn.prototype.updateX = function() {
    this.vx = -this.speed;
    this.x += this.vx;
    if (this.x + this.width <= 0) {
      this.reset();
    }
  }

  Popcorn.prototype.updateY = function() {
    this.vy = this.speed;
    this.y += this.vy;
    if (this.y + this.width >= canvas.height) {
      this.reset();
    }
  }

  Popcorn.prototype.render = function(context) {
    if (!this.alive) {
      return;
    }
    if (this.currentBuffer === this.buffer) {
      this.currentBuffer = 0;
      this.currentFrame ++;
      if (this.currentFrame === this.frames) {
        this.currentFrame = 0;
      }
    }
    context.drawImage(
      this.img, 0, this.currentFrame * 32, 32, 32,
      this.x, this.y, this.width, this.height
    )
    context.fillStyle = '#f00';
    context.fillRect(this.x, this.y - 2, this.width, 1);

    context.fillStyle = '#0f0';
    this.perc = this.health/ this.healthMax;

    context.fillRect(this.x, this.y - 2, this.width * this.perc , 1)

    if (this.hit) {
      var tmpOperation = context.globalCompositeOperation
      context.globalCompositeOperation = 'color-dodge';
      context.drawImage(
        this.img, 0, this.currentFrame * 32, 32, 32,
        this.x, this.y, this.width, this.height
      )
      context.drawImage(
        this.img, 0, this.currentFrame * 32, 32, 32,
        this.x, this.y, this.width, this.height
      )
      context.globalCompositeOperation = tmpOperation;
      this.hit = false;
    }

    this.currentBuffer++;
  }

  Game.prototype.update = function() {
    this.currentState.update();
  }

  Game.prototype.render = function(context) {
    this.currentState.render(context);
  }

  Game.prototype.loop = function() {
    window.requestAnimationFrame(function(){this.loop()}.bind(this));
    now = Date.now();
    dt = now - then;
    if (dt <= fps) { return }
    then = now - (dt % fps);
    this.update();
    this.render(context);
  }

  Game.prototype.init = function() {
    if (PORTRAIT === true) {
      this.autoShoot = true;
    } else {
      this.autoShoot = false;
    }
    this.setState(this.states.title);
    this.currentState.init();
    window.requestAnimationFrame(function(){ this.loop() }.bind(this));
  }

  var game = new Game();

  function InputManager() {
    this.upPressed = false;
    this.downPressed = false;
    this.leftPressed = false;
    this.rightPressed = false;
    this.shooting = false;
    this.start = false;
  }

  InputManager.prototype.handleKey = function(e, state) {
    switch(e.keyCode) {
      case InputManager.UP:
        this.upPressed = state;
        break;
      case InputManager.DOWN:
        this.downPressed = state;
        break;
      case InputManager.LEFT:
        this.leftPressed = state;
        break;
      case InputManager.RIGHT:
        this.rightPressed = state;
        break;
      case InputManager.SHOOT:
        this.shooting = state;
        break;
      case InputManager.RESET:
        game.reset();
        game.setState(game.states.title);
        game.currentState.init();
        break;
      case InputManager.START:
        this.start = state;
        break;
    }
  }

  InputManager.UP = UP;
  InputManager.DOWN = DOWN;
  InputManager.LEFT = LEFT;
  InputManager.RIGHT = RIGHT;
  InputManager.SHOOT = SHOOT;
  InputManager.RESET = RESET;
  InputManager.START = START;

  var inputManager = new InputManager();

  window.addEventListener(
    'keydown',
    function(e) {
      this.handleKey(e, true)
    }.bind(inputManager)
  );

  window.addEventListener(
    'keyup',
    function(e){
      this.handleKey(e, false)
    }.bind(inputManager)
  );

  document.getElementById('move-left').addEventListener(
    'touchstart',
    function(e){
      this.leftPressed = true
    }.bind(inputManager)
  );

  document.getElementById('move-left').addEventListener(
    'touchend',
    function(e){
      this.leftPressed = false
    }.bind(inputManager)
  );

  document.getElementById('move-right').addEventListener(
    'touchstart',
    function(e){
      this.rightPressed = true
    }.bind(inputManager)
  );

  document.getElementById('move-right').addEventListener(
    'touchend',
    function(e){
      this.rightPressed = false
    }.bind(inputManager)
  );

  game.init();
});
