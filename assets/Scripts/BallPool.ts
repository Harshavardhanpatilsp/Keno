import { _decorator, Component, Node, Prefab, sys, screen, instantiate, UITransform, Label, EventTouch, Sprite, color, Vec3, randomRangeInt, EditBox, SpriteFrame, Button, Script } from 'cc';
import { AutoPlayManager } from '../MINESScripts/AutoPlayManager';
import { keyboard } from './keyboard';
const { ccclass, property } = _decorator;

@ccclass('BallPool')
export class BallPool extends Component {
  @property(Prefab)
  boxprefab: Prefab

  @property(Node)
  Ballpool: Node

  @property(Node)
  Selected: Node

  @property(Prefab)
  labelPrefab: Prefab

  @property(EditBox)
  editbox: EditBox

  @property(Node)
  Picktext: Node

  @property(SpriteFrame)
  payoutspritef: SpriteFrame

  @property(SpriteFrame)
  selectedsprite: SpriteFrame

  @property(SpriteFrame)
  resultsprite: SpriteFrame

  @property(SpriteFrame)
  initSprite: SpriteFrame

  @property(SpriteFrame)
  wrongSprite: SpriteFrame

  @property(SpriteFrame)
  payoutsprite: SpriteFrame

  @property(SpriteFrame)
  payoutback: SpriteFrame

  @property(SpriteFrame)
  redsprite:SpriteFrame

  @property(Label)
  amount: Label

  @property(Prefab)
  increasprefab: Prefab

  @property(Node)
  topnode: Node

  @property(Node)
  baground: Node

  @property(AutoPlayManager)
  auto:AutoPlayManager

  @property(Node)
  Allnodes: Node[] = []

  @property(Button)
  Allbuttons: Button[] = []
  


  createball
  selectionball = new Array
  selectedBall
  percent
  selectedheight = 20
  selectedwidth = -60
  multipoints = new Array
  valuesArr= new Array
  small: number = 6
  columns: number = this.small
  rows: number = 6
  height: number
  width: number
  u: number = 1
  v: number = 1
  child
  percentchild
  value
  strVal
  randomint
  randomintarr = new Array
  randomgeneration: boolean = false
  Allpoints = new Array
  resultpoints = new Array
  correctcount = 0
  payoutchildren
  betClicked: boolean = false
  noOfSelection = new Array
  incdec = new Array
  two = new Array
  payoutcheck: boolean = false
  increasedamount
  anssprite = 0
  gotananswer: boolean = false
  randompointarray = new Array
  resultselectionpoints = new Array
  iamt=0

  onLoad() {
    this.Allbuttons[0].node.active = false
    this.Allbuttons[3].interactable = false
    this.Allbuttons[1].interactable = false
    this.multipoints = [
      3.49,
      1.50, 4.92,
      1.00, 2.30, 8.20,
      0.50, 1.82, 4.20, 21.00,
      0.00, 1.10, 3.75, 15.00, 35.00,
      0.00, 0.50, 2.90, 7.60, 18.00, 55.00,
      0.00, 0.25, 2.30, 4.10, 10.00, 31.00, 60.00,
      0.00, 0.00, 1.40, 2.80, 11.40, 28.00, 40.00, 70.00,
      0.00, 0.00, 1.00, 2.20, 6.10, 17.00, 25.00, 55.00, 85.00,
      0.00, 0.00, 1.00, 1.50, 3.30, 10.20, 25.00, 40.00, 75.00, 100.00
    ]
    this.incdec = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70, 0.80, 0.90, 1.00, 2.00, 4.00, 10.00, 20.00, 50.00, 100.00]
    this.Allpoints = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36]
    this.noOfSelection = [[0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1], [2, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2], [3, 0, 0, 0, 0, 0, 0, 1, 1, 2, 3],
    [4, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 3, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 4],
    [5, 0, 0, 1, 2, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 3, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 0, 0, 4, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 5],
    [6, 0, 0, 1, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 3, 1, 0, 0, 1, 0, 0, 1, 2, 1, 4, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 0, 5, 0, 0, 6],
    [7, 0, 0, 1, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 3, 1, 0, 0, 1, 0, 1, 2, 1, 4, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 5, 0, 1, 0, 6, 7],
    [8, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 3, 1, 0, 0, 1, 0, 1, 2, 1, 4, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 5, 0, 2, 2, , 1,
      0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 1, 2, 1, 1, 1, 0, 0, 1, 0, 0, 1, 2, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 2, 0, 6, 7, 8],
    [9, 0, 2, 1, 2, 1, 1, 2, 0, 1, 0, 1, 0, 1, 1, 3, 1, 0, 2, 1, 0, 1, 2, 1, 4, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 0, 2,
      0, 2, 1, 2, 1, 1, 2, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0, 2, 1, 0, 1, 2, 1, 2, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 2, 1, 5, 0, 6, 7, 8, 9],
    [10, 0, 2, 1, 2, 1, 1, 0, 0, 1, 0, 1, 2, 1, 1, 3, 1, 0, 1, 1, 2, 1, 2, 1, 4, 1, 1, 0, 1, 0, 1, 2, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 2, 1, 0, 1, 2, 1, 0, 2, 1, 2,
      0, 2, 1, 2, 1, 1, 0, 3, 1, 0, 1, 2, 1, 1, 3, 1, 0, 1, 1, 2, 1, 2, 1, 1, 1, 1, 3, 1, 0, 1, 2, 1, 2, 1, 1, 0, 1, 1, 1, 0, 1, 2, 1, 0, 5, 6, 7, 8, 9, 10]]
    this.strVal = Number(this.editbox.getComponentInChildren(Label).string)
    this.height = this.Ballpool.getComponent(UITransform).height - 250 + 10
    this.width = this.Ballpool.getComponent(UITransform).width / 3 - 60
    this.child = this.Ballpool.children
    this.percentchild = this.Selected.children
    if (sys.localStorage.getItem("TotalAmount") == null || sys.localStorage.getItem("TotalAmount") == "0" || sys.localStorage.getItem("TotalAmount") == "NaN") {
      sys.localStorage.setItem("TotalAmount", String(Number(3000.00).toFixed(2)))
      this.amount.getComponent(Label).string = 3000.00 + ""
    } else {
      this.amount.getComponent(Label).string = String(sys.localStorage.getItem("TotalAmount"))
    }
    this.baground.on(Node.EventType.TOUCH_START, this.ontouch, this)
    this.Allbuttons[8].interactable = false
    this.generate()
    this.Creatball()
  }
  ontouch() {
    if (Number(this.editbox.getComponentInChildren(Label).string) > 100) {
      this.editbox.getComponentInChildren(Label).string = 100.00.toFixed(2) + ""
    } else if (this.editbox.getComponentInChildren(Label).string == "" || Number(this.editbox.getComponentInChildren(Label).string) <= 0.0 || this.editbox.getComponentInChildren(Label).string=="." || this.editbox.getComponentInChildren(Label).string=="0.") {
      this.editbox.getComponentInChildren(Label).string = "0.10"
    }else{
      this.editbox.getComponentInChildren(Label).string=Number(this.editbox.getComponentInChildren(Label).string).toFixed(2)
    }

    for (let i = 0; i < this.Allnodes.length; i++) {
      this.Allnodes[i].active = false
    }

  }

  Creatball() {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.small; j++) {
        if (j > 0) {
          this.width = this.width + 120
        }
        this.boxprefab.data.getChildByName("Label").getComponent(Label).string = this.u  
        this.createball = instantiate(this.boxprefab)
        this.createball.getChildByName("Label").getComponent(Label).string = this.u
        this.createball.on(Node.EventType.TOUCH_START, this.touchstart, this)
        this.u++
        this.Ballpool.addChild(this.createball)
        this.createball.setPosition(this.width, this.height, 0)
        if (j == 5) {
          this.height = this.height - 103
          this.width = this.Ballpool.getComponent(UITransform).width / 3 - 60
        }
      }
    }
  }

  maxtoch() {
    for (let j = 10; j <= 36; j++) {
      this.Ballpool.children[j].off(Node.EventType.TOUCH_START)
    }
  }

  sorting() {
    this.betClicked = true
    for (let m = 0; m < this.valuesArr.length; m++) {
      for (let n = m; n < 36; n++) {
        if (this.valuesArr[m] == this.Allpoints[n]) {
          let temp = this.Allpoints[m];
          this.Allpoints[m] = this.Allpoints[n];
          this.Allpoints[n] = temp;
          break;
        }
      }
    }
  }

  touchoff() {
    for (let i = 0; i < 36; i++) {
      this.Ballpool.children[i].off(Node.EventType.TOUCH_START)
    }
  }
  touchon() {
    for (let i = 0; i < 36; i++) {
      this.Ballpool.children[i].on(Node.EventType.TOUCH_START, this.touchstart, this)
    }
  }

  touchstart(event: EventTouch) {
    
    this.Allbuttons[1].interactable = true
    this.Allbuttons[3].interactable = true
    if (this.betClicked == true) {
      this.clear()
    }
    this.Picktext.active = false
    let curball = event.target as Node;
    this.selectionball.push(curball);
    this.value = curball.getChildByName("Label").getComponent(Label).string;
    if (this.v <= 10) {
      this.Allbuttons[8].interactable = true
      if (this.v == 1) {
        console.log("Selected valued array", this.valuesArr);
        this.valuesArr.push(this.value);
        curball.getComponent(Sprite).spriteFrame = this.selectedsprite
        this.Selected.removeChild(this.percentchild[this.percentchild.length - 1]);
        this.selected();
      } else {
        for (let j = 0; j < this.valuesArr.length; j++) {
          if (this.valuesArr[j] == this.value) {
            curball.getComponent(Sprite).spriteFrame = this.initSprite
            this.Selected.removeChild(this.percentchild[this.percentchild.length - 1]);
            this.removevalue(this.value)
            if (this.v > 1) {
              this.payoutcheck = true
              this.selected()
              this.v--;
              this.selectedheight = this.selectedheight - 65;
              this.payoutmultiple()
              break
            }
          }
          else if (this.valuesArr[j] != this.value && j == this.valuesArr.length - 1) {
            this.valuesArr.push(this.value);
            curball.getComponent(Sprite).spriteFrame = this.selectedsprite
            this.selected();
            j = 0
            break;
          }
        }
      }
    } else if (this.v >= 10) {
      let check: boolean = false
      for (let i = 0; i < this.valuesArr.length; i++) {
        if (this.value == this.valuesArr[i]) {
          check = true
          break
        }
      }
      if (check == true) {
        curball.getComponent(Sprite).spriteFrame = this.initSprite
        this.Selected.removeChild(this.percentchild[this.percentchild.length - 1]);
        this.removevalue(this.value)
        this.payoutcheck = true
        this.v--
        this.selectedheight = this.selectedheight - 65;
        this.payoutmultiple()
      }
    }
  }

  removevalue(n) {
    for (let i = 0; i < this.valuesArr.length; i++) {
      if (n == this.valuesArr[i]) {
        for (let j = i; j < this.valuesArr.length - 1; j++) {
          this.valuesArr[j] = this.valuesArr[j + 1]
        }
      }
    }
    this.valuesArr.pop()
  }

  payoutmultiple() {
    if (this.payoutcheck) {
      this.v--
      // this.payoutcheck=false
    }
    // this.v--
    switch (this.v) {
      case 1:
        this.payoutchildren[0].getChildByName("multi").getComponent(Label).string = this.multipoints[0].toFixed(2) + "x"
        break
      case 2:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 1].toFixed(2) + "x"
        }
        break
      case 3:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 3].toFixed(2) + "x"
        }
        break
      case 4:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 6].toFixed(2) + "x"
        }
        break
      case 5:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 10].toFixed(2) + "x"
        }
        break
      case 6:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 15].toFixed(2) + "x"
        }
        break
      case 7:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 21].toFixed(2) + "x"
        }
        break
      case 8:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 28].toFixed(2) + "x"
        }
        break
      case 9:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 36].toFixed(2) + "x"
        }
        break
      case 10:
        for (let n = 0; n < this.v; n++) {
          this.payoutchildren[n].getChildByName("multi").getComponent(Label).string = this.multipoints[n + 45].toFixed(2) + "x"
        }
        break
    }
    if (this.payoutcheck) {
      this.v++
      this.payoutcheck = false
    }

  }

  selected() {
    if (this.v <= 10) {
      if(this.payoutcheck){
        if(this.payoutchildren.length>1){
        let tempheight=this.payoutchildren[0].position.y
        this.selectedheight=tempheight+35
        for(let i=0;i<this.payoutchildren.length;i++){
          this.payoutchildren[i].setPosition(this.selectedwidth, this.selectedheight, 0)
          this.selectedheight = this.selectedheight + 65
        }
        tempheight=this.payoutchildren[1].position.y
       this.selectedheight=tempheight-32.5
      }
      }
      else{     
      this.labelPrefab.data.getChildByName("Label").getComponent(Label).string = this.v + ""
      this.selectedBall = instantiate(this.labelPrefab)
      this.Selected.addChild(this.selectedBall)
      this.payoutchildren = this.Selected.children
        for(let i=0;i<this.payoutchildren.length;i++){
        this.payoutchildren[i].setPosition(this.selectedwidth, this.selectedheight, 0) 
        }
      this.selectedBall.getChildByName("Label").getComponent(Label).string = this.v
      this.payoutmultiple()
      this.v++
    }
    this.payoutchildren = this.Selected.children
  }
  }

  clear() {
    for (let m = 0; m < 36; m++) {
      this.child[m].getComponent(Sprite).spriteFrame = this.initSprite
      this.Ballpool.children[m].on(Node.EventType.TOUCH_START, this.touchstart, this)
    }
    for (let n = 0; n < 10; n++) {
      this.randomintarr.pop()
      this.resultpoints.pop()
      this.valuesArr.pop()
    }
    for (let i = 0; i < this.randompointarray.length; i++) {
      this.randompointarray.pop()
    }
    this.Selected.removeAllChildren();
    this.selectedheight = 290;
    this.v = 1;
    this.Picktext.active = true
    this.correctcount = 0
    this.randomgeneration = false
    this.betClicked = false
    this.anssprite = 0
    this.gotananswer = false
    this.increasedamount = 0
    this.selectedheight=20
        this.selectedwidth=-60
        this.Allbuttons[0].node.active=false
    for(let i=1;i<4;i++){
      if(i!=2){
        this.Allbuttons[i].interactable = false
      }
    }
    this.Allbuttons[8].interactable = false
    console.log(this.randomintarr, "random arr");
    console.log(this.resultpoints, "result arr");
    console.log(this.valuesArr, "valuearr arr");
  }
  random() {
    for(let i=1;i< this.Allbuttons.length;i++){
      this.Allbuttons[i].interactable=true
  }
    if (this.betClicked == true) {
      this.clear()
      for(let i=1;i< this.Allbuttons.length;i++){
        this.Allbuttons[i].interactable=true
    }
    }
    if (this.randomgeneration == true) {
      this.clear()
      for(let i=1;i< this.Allbuttons.length;i++){
        this.Allbuttons[i].interactable=true
    }
    }
    if (this.randomgeneration == false) {
      this.randomgeneration = true
      this.Picktext.active = false
      if (this.valuesArr.length > 0) {
        this.Selected.removeAllChildren()
        this.selectedheight = 290
        for (let i = 0; i < 36; i++) {
          this.child[i].getComponent(Sprite).spriteFrame = this.initSprite
        }
        for (let i = 0; i < this.valuesArr.length; i++) {
          this.valuesArr.pop()
        }
      }
      for (let j = 0; j < 10; j++) {
        if (j == 0) {
          this.randomint = randomRangeInt(1, 36);
          this.randomintarr.push(this.randomint);
        } else {
          this.randomint = randomRangeInt(1, 36);
          for (let k = 0; k < this.randomintarr.length; k++) {
            if (this.randomint != this.randomintarr[k]) {
              if (k == this.randomintarr.length - 1) {
                this.randomintarr.push(this.randomint);
              }
            } else {
              j--;
              break;
            }
          }
        }
        if (this.randomintarr.length == 10) {
          j = 0;

          break;
        }
      }

      this.randomselection(this.randomintarr);
    }
  }

  randomselection(randompos) {
    this.v = 1
    this.selectedheight=-290
    for (let m = 0; m < randompos.length; m++) {
      this.child[randompos[m]].getComponent(Sprite).spriteFrame = this.selectedsprite
      let randomball = instantiate(this.labelPrefab)
      randomball.getChildByName("Label").getComponent(Label).string = this.v + ""
      randomball.getChildByName("multi").getComponent(Label).string = this.multipoints[m + 45].toFixed(2) + "x"
      this.v++
      this.Selected.addChild(randomball)
      randomball.setPosition(this.selectedwidth, this.selectedheight, 0)
      this.selectedheight = this.selectedheight + 65
    }
    this.valuesArr = randompos
    for (let i = 0; i < 10; i++) {
      randompos[i]++
    }
    this.payoutchildren = this.Selected.children
  }

  generaterandomresultpoints() {
    let j = 10
    for (let i = 0; i < 26; i++) {
      this.resultselectionpoints[i] = this.Allpoints[j]
      j++
    }
    console.log(this.resultselectionpoints, "result points");
    let no = 27
    let rand = randomRangeInt(0, no)
    for (let j = 0; j < 10; j++) {
      this.resultpoints[j] = this.resultselectionpoints[rand]
      this.removenumber(this.resultselectionpoints[rand])
      no--
      rand = randomRangeInt(0, no)
      console.log(rand, "random no");

    }
    console.log(this.resultselectionpoints, "result points");
  }

  generate() {
    let j = 10
    for (let i = 0; i < 26; i++) {
      this.resultselectionpoints[i] = this.Allpoints[j]
      j++
    }
    let n1 = new Array

    let no = 0
    let rand = randomRangeInt(1, 26)
    n1.push(rand)
    no++
    while (no < 10) {
      rand = randomRangeInt(1, 26)
      for (let i = 0; i < n1.length; i++) {
        if (rand == n1[i]) {
          break
        }
        else if (rand != n1[i] && i == n1.length - 1) {
          n1.push(rand)
          no++
        }
      }
    }
    for (let i = 0; i < n1.length; i++) {
      this.resultpoints[i] = this.resultselectionpoints[n1[i]]
    }
    console.log(this.resultpoints, "result points arr");


  }

  removenumber(n) {
    for (let i = 0; i < this.resultselectionpoints.length - 1; i++) {
      if (n == this.resultselectionpoints[i]) {
        for (let j = i; j < 27; j++) {
          this.resultselectionpoints[j] = this.resultselectionpoints[j + 1]
        }
      }
    }
    this.resultselectionpoints.pop()
    for (let i = 0; i < 10; i++) {
      this.resultpoints[i] = this.resultselectionpoints[i]
    }
  }

  bet() {

    if (Number(this.editbox.getComponentInChildren(Label).string) < Number(this.amount.getComponent(Label).string)) {

      for(let i=0;i<this.Allbuttons.length;i++){
        this.Allbuttons[i].interactable = false
      }
      this.Allbuttons[0].node.active=true
      // this.Allnodes[5].active = true
      let allpointsdup = this.Allpoints
    
      if (this.betClicked == true) {
        for (let i = 0; i < this.resultpoints.length; i++) {

          this.child[this.resultpoints[i] - 1].getComponent(Sprite).spriteFrame = this.initSprite
          if (i < this.payoutchildren.length)
            this.payoutchildren[i].getComponent(Sprite).spriteFrame = this.payoutsprite
        }
        for (let i = 0; i < this.valuesArr.length; i++) {
          this.child[this.valuesArr[i] - 1].getComponent(Sprite).spriteFrame = this.selectedsprite
        }
        this.resultpoints = new Array
        this.Allpoints = allpointsdup

        this.betClicked = false
        this.correctcount = 0
        this.anssprite = 0

      }
      if (this.valuesArr.length != 0 && this.betClicked == false) {
        this.betClicked = true

        for (let m = 0; m < this.valuesArr.length; m++) {
          for (let n = m; n < 36; n++) {
            if (this.valuesArr[m] == this.Allpoints[n]) {
              let temp = this.Allpoints[m];
              this.Allpoints[m] = this.Allpoints[n];
              this.Allpoints[n] = temp;
              break;
            }
          }
        }

        this.generate()

      }
      console.log(this.valuesArr, "value arr");
      console.log(this.Allpoints, "Allpoints arr");
      let getnoOfSelection = this.valuesArr.length
      let select = this.noOfSelection[getnoOfSelection]
      let s1 = select[0]
      let s2
      if (s1 == 1 || s1 == 2 || s1 == 3) {
        let rand = randomRangeInt(1, 11)
        console.log(rand, "random value generated to take value form multipoints array");
        s2 = select[rand]
        
      }
      else if (s1 == 4 || s1 == 5 || s1 == 6 || s1 == 7) {
        let rand = randomRangeInt(1, 52)
        console.log(rand, "random value generated to take value form multipoints array")
        s2 = select[rand]
      }
      else if (s1 == 8 || s1 == 9 || s1 == 10) {
        let rand = randomRangeInt(1, 102)
        console.log(rand, "random value generated to take value form multipoints array")
        s2 = select[rand]
        // s2=select[101]
      }


      console.log("s1 ie which array is selected", s1);
      console.log(s2, "s2 is index of value in s1 array");
      console.log(this.resultpoints, "result array");


      if (s2 == 1) {
        let rand = randomRangeInt(0, this.valuesArr.length)
        this.resultpoints[0] = this.valuesArr[rand];
      }
      else {
        if (s2 == 0) {

        }
        else if (s2 >= 2 || s2 <= 10) {
          
          let j=0;
          let temparr=new Array
          let randno=randomRangeInt(0,this.valuesArr.length)
          j++
          temparr.push(randno)
          while(j<s2){
             randno=randomRangeInt(0,this.valuesArr.length)
             for(let i=0;i<temparr.length;i++){
              if(randno==temparr[i]){
                break
              }
              if(randno!=temparr[i] && i==temparr.length-1){
                j++
                temparr.push(randno)
              }
             }
          }
          console.log(temparr,"temp arr");
          
          for (let i = 0; i < temparr.length ; i++) {
            this.resultpoints[i] = this.valuesArr[temparr[i]];
          }
        }
      }
      console.log(this.Allpoints,"Allpoint array");
      console.log("result", this.resultpoints,"result points array");
      console.log(this.valuesArr,"values array");
      this.resultpoints.sort((a,b)=>(a-b))
      console.log("resultpoints after sorting ", this.resultpoints);
      let k=0
      this.schedule(()=>{
        this.child[(this.resultpoints[k])-1].getComponent(Sprite).spriteFrame = this.wrongSprite
          for (let n = 0; n < this.resultpoints.length; n++) {
            if (this.resultpoints[k] == this.valuesArr[n]) {
              this.payoutchildren[this.correctcount].getComponent(Sprite).spriteFrame = this.payoutspritef
              // this.payoutchildren[this.correctcount].getComponent(UITransform).width = 41
              // this.payoutchildren[this.correctcount].getComponent(UITransform).height = 41
              this.correctcount++
              this.child[this.resultpoints[k] - 1].getComponent(Sprite).spriteFrame = this.resultsprite
              break;
            }
        }
        k++
      },0.1,this.resultpoints.length-1)
      let betvalue = Number(this.editbox.getComponentInChildren(Label).string)
      let amount = Number(this.amount.getComponent(Label).string)
      this.amount.getComponent(Label).string = String((amount - betvalue).toFixed(2))
      setTimeout(() => {
        for (let n = 0; n < this.valuesArr.length; n++) {
          if (this.payoutchildren[n].getComponent(Sprite).spriteFrame == this.payoutspritef) {
            this.gotananswer = true
            this.anssprite++
          }
        }
        if (this.gotananswer == false) {
          this.anssprite = 0
        }
        this.addamount()
        sys.localStorage.setItem("TotalAmount", this.amount.getComponent(Label).string)
        if (this.increasedamount > 0) {
          if (typeof (this.increasedamount)) {
            let createlabel = instantiate(this.increasprefab)
            if (this.increasedamount <= Number(this.editbox.getComponentInChildren(Label).string)) {
              createlabel.getComponent(Sprite).spriteFrame = this.payoutback
            }
            createlabel.getChildByName("Label").getComponent(Label).string = "+" + this.increasedamount + "USD"
            this.topnode.addChild(createlabel)
            createlabel.setPosition(545, 0, 0)
            setTimeout(() => {
              this.topnode.removeChild(createlabel)
            }, 700)
          }
        }
        for(let i=0;i<this.Allbuttons.length;i++){
          this.Allbuttons[i].interactable = true
        }
        this.Allbuttons[0].node.active = false
        // this.Allnodes[5].active = false
      }, 1500)
     
    }
    if (Number(this.editbox.getComponentInChildren(Label).string) > Number(this.amount.getComponent(Label).string)) {
      console.log(Number(this.amount.getComponent(Label).string),"top amt");
      
      this.Allnodes[4].active = true
    }
    
  }
  addamount() {
    switch (this.valuesArr.length) {
      case 1:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[0])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[0]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 2:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[this.anssprite + 1])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 3:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[this.anssprite + 3])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[this.anssprite + 2]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 4:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[5 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[5 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 5:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[9 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[9 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 6:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[14 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[14 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 7:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[20 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[20 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 8:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[27 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[27 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 9:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[35 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[35 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
      case 10:
        if (this.payoutchildren[0].getComponent(Sprite).spriteFrame == this.payoutspritef) {
          this.amount.getComponent(Label).string = String((((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[44 + this.anssprite])) + Number(this.amount.getComponent(Label).string)).toFixed(2))
          this.increasedamount = Number((Number(this.editbox.getComponentInChildren(Label).string) * this.multipoints[44 + this.anssprite]).toFixed(2))
        } else
          this.increasedamount = 0
        break
    }
    this.iamt=this.increasedamount
  }

  increase() {
    this.strVal = Number(this.editbox.getComponentInChildren(Label).string)
    for (let n = 0; n < this.incdec.length; n++) {
      if (this.strVal! < this.incdec[n]) {
        this.editbox.getComponentInChildren(Label).string = this.incdec[n]
        break
      }
    }
  }

  decrease() {
    this.strVal = Number(this.editbox.getComponentInChildren(Label).string)
    for (let n = this.incdec.length; n >= 0; n--) {
      if (this.strVal > this.incdec[n]) {
        this.editbox.getComponentInChildren(Label).string = this.incdec[n]
        break
      }
    }
  }
  
}