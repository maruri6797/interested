class PuyoImage {
  static initialize() {
    this.puyoImages = [];
    for(let i = 0; i < 5; i++) {
      const image = document.getElementById(`puyo_${i + 1}`);
      image.removeAttribute('id');//removeAttribute()属性を削除
      image.width = Config.puyoImgWidth;
      image.height = Config.puyoImgHeight;
      image.style.position = 'absolute';
      this.puyoImages[i] = image;
    }
    this.batankyuImage = document.getElementById('batankyu');
    this.batankyuImage.width = Config.puyoImgWidth * 6;
    this.batankyuImage.style.position = 'absolute';
  }
  
  static getPuyo(index) {
    const image = this.puyoImages[index - 1].cloneNode(true);
    return image;
  }
  
  static prepareBatankyu(frame) {
    this.gameOverFrame = frame;
    Stage.stageElement.appendChild(this.batankyuImage);// appendChild()要素を追加
    this.batankyuImage.style.top = -this.batankyuImage.height + 'px';
  }
  
  static batankyu(frame) {
    const ratio = (frame - this.gameOverFrame) / Config.gameOverFrame;
    const x = Math.cos(Math.PI / 2 + ratio * Math.PI * 2 * 10) * Config.puyoImgWidth;
    const y = Math.cos(Math.PI + ratio * Math.PI * 2) * Config.puyoImgHeight * Config.stageRows/ 4 + Config.puyoImgHeight * Config.stageRows / 4 + Config.puyoImgHeight * Config.stageRows / 2;
    // Math.cos()コサインを返す Math.PI=円周率
    this.batankyuImage.style.left = x + 'px';
    this.batankyuImage.style.top = y + 'px';
  }
}