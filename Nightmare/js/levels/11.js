var oneone = Mario.oneone = function() {
  //The things that need to be passed in are basically just dependent on what
  //tileset we're in, so it makes more sense to just make one variable for that, so
  //TODO: put as much of this in the Level object definition as possible.
  level = new Mario.Level({
    playerPos: [56,192],
    loader: Mario.oneone,
    background: "#7974FF",
    scrolling: true,
    invincibility: [144, 192, 240],
    exit: 204,
    floorSprite:  new Mario.Sprite('sprites/tiles.png', [0,0],[16,16],0),
    cloudSprite:  new Mario.Sprite('sprites/tiles.png', [0,320],[48,32],0),
    wallSprite: new Mario.Sprite('sprites/tiles.png', [0, 16],[16,16],0),
    brickSprite: new Mario.Sprite('sprites/tiles.png', [16, 0], [16,16], 0),
    brickBounceSprite: new Mario.Sprite('sprites/tiles.png',[32,0],[16,16],0),
    rubbleSprite: function () {
      return new Mario.Sprite('sprites/items.png', [64,0], [8,8], 3, [0,1])
    },
    ublockSprite: new Mario.Sprite('sprites/tiles.png', [48, 0], [16,16],0),
    superShroomSprite: new Mario.Sprite('sprites/items.png', [0,0], [16,16], 0),
    fireFlowerSprite: new Mario.Sprite('sprites/items.png', [0,32], [16,16], 20, [0,1,2,3]),
    starSprite: new Mario.Sprite('sprites/items.png', [0,48], [16,16], 20, [0,1,2,3]),
    pipeLEndSprite: new Mario.Sprite('sprites/tiles.png', [0, 128], [16,16], 0),
    pipeREndSprite: new Mario.Sprite('sprites/tiles.png', [16, 128], [16,16], 0),
    pipeLMidSprite: new Mario.Sprite('sprites/tiles.png', [0, 144], [16,16], 0),
    pipeRMidSprite: new Mario.Sprite('sprites/tiles.png', [16, 144], [16,16], 0),

    pipeUpMid: new Mario.Sprite('sprites/tiles.png', [0, 144], [32,16], 0),
    pipeSideMid: new Mario.Sprite('sprites/tiles.png', [48, 128], [16,32], 0),
    pipeLeft: new Mario.Sprite('sprites/tiles.png', [32, 128], [16,32], 0),
    pipeTop: new Mario.Sprite('sprites/tiles.png', [0, 128], [32,16], 0),
    qblockSprite: new Mario.Sprite('sprites/tiles.png', [384, 0], [16,16], 8, [0,0,0,0,1,2,1]),
    bcoinSprite: function() {
      return new Mario.Sprite('sprites/items.png', [0,112],[16,16], 20,[0,1,2,3]);
    },
    cloudSprites:[
      new Mario.Sprite('sprites/tiles.png', [0,320],[16,32],0),
      new Mario.Sprite('sprites/tiles.png', [16,320],[16,32],0),
      new Mario.Sprite('sprites/tiles.png', [32,320],[16,32],0)
    ],
    hillSprites: [
      new Mario.Sprite('sprites/tiles.png', [128,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [144,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [160,128],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [128,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [144,144],[16,16],0),
      new Mario.Sprite('sprites/tiles.png', [160,144],[16,16],0)
    ],
    bushSprite: new Mario.Sprite('sprites/tiles.png', [176, 144], [48, 16], 0),
    bushSprites: [
     new Mario.Sprite('sprites/tiles.png', [176,144], [16,16],0),
     new Mario.Sprite('sprites/tiles.png', [192,144], [16,16],0),
     new Mario.Sprite('sprites/tiles.png', [208,144], [16,16],0)],
   goombaSprite: function() {
     return new Mario.Sprite('sprites/enemy.png', [0, 16], [16,16], 3, [0,1]);
   },
   koopaSprite: function() {
     return new Mario.Sprite('sprites/enemy.png', [96,0], [16,32], 2, [0,1]);
   },
   flagPoleSprites: [
     new Mario.Sprite('sprites/tiles.png', [256, 128], [16,16], 0),
     new Mario.Sprite('sprites/tiles.png', [256, 144], [16,16], 0),
     new Mario.Sprite('sprites/items.png', [128, 32], [16,16], 0)
   ]
 });
  ground = [[0,69],[71,86],[89,153],[155,212]];
  player.pos[0] = level.playerPos[0];
  player.pos[1] = level.playerPos[1];
  vX = 0;

  //build THE GROUND : 地面を作る
  ground.forEach(function(loc) {
    level.putFloor(loc[0],loc[1]);
  });

  //build scenery : 風景を作る
  clouds = [[7,3],[19, 2],[56, 3],[67, 2],[87, 2],[103, 2],[152, 3],[163, 2],[200, 3]];
  clouds.forEach(function(cloud){
    level.putCloud(cloud[0],cloud[1]);
  });

  twoClouds = [[36,2],[132,2],[180,2]];
  twoClouds.forEach(function(cloud){
    level.putTwoCloud(cloud[0],cloud[1]);
  });

  threeClouds = [[27,3],[75,3],[123,3],[171,3]];
  threeClouds.forEach(function(cloud){
    level.putThreeCloud(cloud[0],cloud[1]);
  });

  bHills = [0,48,96,144,192]
  bHills.forEach(function(hill) {
    level.putBigHill(hill, 12);
  });

  sHills = [16,64,111,160];
  sHills.forEach(function(hill) {
    level.putSmallHill(hill, 12);
  });

  bushes = [23,71,118,167];
  bushes.forEach(function(bush) {
    level.putBush(bush, 12);
  });

  twoBushes = [41,89,137];
  twoBushes.forEach(function(bush) {
    level.putTwoBush(bush, 12);
  });

  threeBushes = [11,59,106];
  threeBushes.forEach(function(bush) {
    level.putThreeBush(bush, 12);
  });

  //interactable terrain : 地形を生成
  level.putQBlock(16, 9, new Mario.Bcoin([256, 144]));
  level.putBrick(20, 9, null);
  level.putQBlock(21, 9, new Mario.Mushroom([336, 144]));
  //level.putBrick(22, 9, null);
  level.putQBlock(22, 5, new Mario.Bcoin([352, 80]));
  level.putQBlock(23, 9, new Mario.Bcoin([368, 144]));
  level.putBrick(24, 9, null);
  level.putBrick(25, 9, null);
  level.putBrick(26, 9, null);
  level.putBrick(27, 10, null);
  level.putPipe(28, 13, 2);
  level.putPipe(38, 13, 3);
  level.putPipe(46, 13, 4);
  level.putRealPipe(57, 9, 4, "DOWN", Mario.oneonetunnel);
  level.putBrick(77, 9, null);
  level.putQBlock(78, 9, new Mario.Mushroom([1248, 144]));
  level.putBrick(79, 9, null);
  level.putBrick(80, 5, null);
  level.putBrick(81, 5, null);
  level.putBrick(82, 5, null);
  level.putBrick(83, 5, null);
  level.putBrick(84, 5, null);
  level.putBrick(85, 5, null);
  level.putBrick(86, 5, null);
  level.putBrick(87, 5, null);
  level.putBrick(91, 5, null);
  level.putBrick(92, 5, null);
  level.putBrick(93, 5, null);
  level.putQBlock(94, 5, new Mario.Bcoin([1504, 80]));
  level.putBrick(94, 9, null);
  level.putBrick(100, 9, new Mario.Star([1600, 144]));
  level.putBrick(101, 9, null);
  level.putQBlock(105, 9, new Mario.Bcoin([1680, 144]));
  level.putQBlock(108, 9, new Mario.Bcoin([1728, 144]));
  level.putQBlock(108, 5, new Mario.Mushroom([1728, 80]));
  level.putQBlock(111, 9, new Mario.Bcoin([1776, 144]));
  level.putBrick(117, 9, null);
  level.putBrick(120, 5, null);
  level.putBrick(121, 5, null);
  level.putBrick(122, 5, null);
  level.putBrick(123, 5, null);
  level.putBrick(128, 5, null);
  level.putQBlock(129, 5, new Mario.Bcoin([2074, 80]));
  level.putBrick(129, 9, null);
  level.putQBlock(130, 5, new Mario.Bcoin([2080, 80]));
  level.putBrick(130, 9, null);
  level.putBrick(131, 5, null);

  //壁設置
  level.putWall(71, 13, 2);
  level.putBrick(71, 7, 4);
  level.putBrick(71, 8, 4);
  level.putBrick(71, 9, 4);

  level.putWall(134, 13, 1);
  level.putWall(135, 13, 2);
  level.putWall(136, 13, 3);
  level.putWall(137, 13, 4);
  level.putWall(140, 13, 4);
  level.putWall(141, 13, 3);
  level.putWall(142, 13, 2);
  level.putWall(143, 13, 1);
  level.putWall(148, 13, 1);
  level.putWall(149, 13, 2);
  level.putWall(150, 13, 3);
  level.putWall(151, 13, 4);
  level.putWall(152, 13, 4);
  level.putWall(155, 13, 4);
  level.putWall(156, 13, 3);
  level.putWall(157, 13, 2);
  level.putWall(158, 13, 1);
  level.putPipe(163, 13, 2);
  level.putBrick(168, 9, null);
  level.putBrick(169, 9, null);
  level.putQBlock(170, 9, new Mario.Bcoin([2720, 144]));
  level.putBrick(171, 9, null);
  level.putPipe(179, 13, 2);
  level.putWall(181, 13, 1);
  level.putWall(182, 13, 2);
  level.putWall(183, 13, 3);
  level.putWall(184, 13, 4);
  level.putWall(185, 13, 5);
  level.putWall(186, 13, 6);
  level.putWall(187, 13, 7);
  level.putWall(188, 13, 8);
  level.putWall(189, 13, 8);
  level.putFlagpole(198);
  level.putBrick(202, 9, 4);
  level.putBrick(202, 10, 4);
  level.putBrick(202, 11, 4);
  level.putBrick(202, 12, 4);
  level.putBrick(203, 7, 4);
  level.putBrick(203, 8, 4);
  level.putBrick(203, 9, 4);
  level.putBrick(203, 10, 4);
  level.putBrick(203, 11, 4);
  level.putBrick(203, 12, 4);
  level.putBrick(204, 8, 4);
  level.putBrick(204, 9, 4);
  level.putBrick(204, 10, 4);
  level.putBrick(205, 7, 4);
  level.putBrick(205, 8, 4);
  level.putBrick(205, 9, 4);
  level.putBrick(205, 10, 4);
  level.putBrick(205, 12, 4);
  level.putBrick(205, 11, 4);
  level.putBrick(206, 9, 4);
  level.putBrick(206, 10, 4);
  level.putBrick(206, 11, 4);
  level.putBrick(206, 12, 4);

  //and enemies : 敵を作成
  level.putGoomba(0, 2);
  level.putGoomba(0, 3);
  level.putGoomba(1, 2);
  level.putGoomba(1, 3);
  level.putGoomba(2, 2);
  level.putGoomba(5, 0);
  level.putGoomba(5, 1);
  level.putGoomba(6, 2);
  level.putGoomba(8, 12);
  level.putKoopa(9, 11);
  level.putGoomba(15, 12);
  level.putGoomba(17, 12);
  level.putGoomba(19, 12);
  level.putGoomba(20, 12);
  level.putGoomba(20, 3);
  level.putGoomba(20, 6);
  level.putGoomba(21, 12);
  level.putGoomba(22, 6);
  level.putGoomba(22, 12);
  level.putGoomba(23, 12);
  level.putGoomba(23, 3);
  level.putGoomba(24, 6);
  level.putGoomba(25, 12);
  level.putGoomba(27, 12);
  level.putGoomba(40, 12);
  level.putGoomba(42, 12);
  level.putGoomba(44, 12);
  level.putKoopa(49, 11);
  level.putGoomba(50, 12);
  level.putGoomba(51, 12);
  level.putGoomba(52, 12);
  level.putGoomba(53, 12);
  level.putGoomba(55, 12);
  level.putGoomba(56, 9);
  level.putKoopa(60, 11);
  level.putGoomba(62, 12);
  level.putGoomba(64, 12);
  level.putGoomba(79, 4);
  level.putGoomba(81, 12);
  level.putGoomba(82, 4);
  level.putGoomba(83, 12);
  level.putGoomba(84, 4);
  level.putGoomba(85, 12);
  level.putGoomba(86, 4);
  level.putGoomba(97, 2);
  level.putGoomba(99, 4);
  level.putGoomba(100, 12);
  level.putGoomba(101, 2);
  level.putGoomba(102, 4);
  level.putGoomba(102, 12);
  level.putGoomba(103, 3);
  level.putGoomba(114, 12);
  level.putGoomba(114, 3);
  level.putGoomba(115, 12);
  level.putGoomba(115, 3);
  level.putGoomba(117, 6);
  level.putGoomba(117, 1);
  level.putGoomba(122, 12);
  level.putGoomba(122, 3);
  level.putGoomba(122, 6);
  level.putGoomba(123, 12);
  level.putGoomba(125, 12);
  level.putGoomba(126, 12);
  level.putGoomba(170, 12);
  level.putGoomba(172, 12);
  level.putKoopa(35, 11);
  level.putGoomba(36, 12);
  level.putGoomba(37, 12);
  level.putGoomba(38, 12);
  level.putGoomba(39, 12);
  level.putGoomba(32, 6);

  //ゴール前段差クリボー
  level.putGoomba(185, 3);
  level.putGoomba(186, 3);
  level.putGoomba(187, 3);
  level.putGoomba(188, 3);
  level.putGoomba(189, 3);
  level.putGoomba(190, 3);

  //ゴール中クリボー
  level.putGoomba(200, 12);

  music.underground.pause();
  // music.overworld.currentTime = 0;
  music.overworld.play();
};
