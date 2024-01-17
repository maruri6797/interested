class Score {
  static initialize() {
    this.fontTemplateList = [];
    let fontWidth = 0;
    for(let i = 0; i < 10; i++) {
      const fontImage = document.getElementById(`font${i}`);
      if(fontWidth === 0) {
        fontWidth = fontImage.width / fontImage.height * Config.fontHeight;
      }
      fontImage.height = Config.fontHeight;
      fontImage.width = fontWidth;
      this.fontTemplateList.push(fontImage);// push()中身を追加
    }
    this.fontLength = Math.floor(Config.stageCols * Config.puyoImgWidth / this.fontTempleteList[0].width);
    // Math.floor()与えられた数値以下の最大の整数を返す
    this.score = 0;
    this.showScore();
  }
  static showScore() {
    let score = this.score;
    const scoreElement = Stage.scoreElement;
    while(scoreElement.firstChild) {
      scoreElement.removeChild(scoreElement.firstChild);
      // removeChild()指定のノードを削除する
    }
    for(let i = 0; i < this.fontLength; i++) {
      const number = score % 10;
      scoreElement.insertBefore(this.fontTemplateList[number].cloneNode(true), scoreElement.firstChild);
      // insertBefore(追加したい要素, 追加したい場所)
      // cloneNode(true or false)html要素を取得
      score = Math.floor(score / 10);
    }
  }

  static calculateScore(rensa, piece, color) {
    rensa = Math.min(rensa, Score.rensaBonus.length - 1);
    piece = Math.min(piece, Score.pieceBonus.length - 1);
    color = Math.min(color, Score.colorBonus.length - 1);
    let scale = Score.rensaBonus[rensa] + Score.pieceBonus[piece] + Score.colorBonus[color];
    if(scale === 0) {
      scale = 1;
    }
    this.addScore(scale * piece * 10);
  }
  static addScore(score) {
    this.score += score;
    this.showScore();
  }
};

Score.rensaBonus = [0, 8, 16, 32, 64, 96, 128, 160, 192, 224, 256, 320, 352, 384, 416, 448, 480, 512, 544, 576, 608, 640, 672];
Score.pieceBonus = [0, 0, 0, 0, 2, 3, 4, 5, 6, 7, 10, 10];
Score.colorBonus = [0, 0, 3, 6, 12, 24];