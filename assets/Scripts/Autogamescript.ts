import { _decorator, Component, Node,sys, Button,EventTouch,Label,randomRangeInt,Sprite, UITransform, SpriteFrame,instantiate} from 'cc';
import { BallPool } from './BallPool';
const { ccclass, property } = _decorator;

@ccclass('Autogamescript')
export class Autogamescript extends Component {

    @property(Button)
    Allbuttons:Button[]=[]

    @property(BallPool)
    ballpool:BallPool

    nooftimes
    number

    start() {
        this.node.active=false
        // this.create()
    }

    touchstartone(event:EventTouch){
        this.nooftimes=true
        // console.log("hi");
        let curnode=event.target as Node;
        this.number=Number(curnode.getComponentInChildren(Label).string)
        console.log(this.number);
        }

    create(){
        for(let i=0;i>this.Allbuttons.length;i++){
            this.Allbuttons[i].node.on(Node.EventType.TOUCH_START,this.touchstartone,this)
        }
    }
startauto(){
  console.log("kkkk");
  
    this.ballpool.Allbuttons[0].node.active=true
    for(let i=1;i< this.ballpool.Allbuttons.length;i++){
        this.ballpool.Allbuttons[i].interactable=false
    }
    // this.ballpool.Allbuttons[0].node.active=true
    let time=0
    let temptime=2300
    for(let i=0;i<this.number;i++){
        setTimeout(()=>{
            this.ballpool.amount.getComponent(Label).string=(Number(this.ballpool.amount.getComponent(Label).string)-Number(this.ballpool.editbox.getComponentInChildren(Label).string)).toFixed(2)
            this.iterate()
            if(i==this.number-1){
                this.ballpool.Allbuttons[0].node.active=false
            for(let i=1;i< this.ballpool.Allbuttons.length;i++){
                this.ballpool.Allbuttons[i].interactable=true
            }
        }
        },time)
        time=time+temptime
        
    }
}

    iterate(){
        let time=2000
        let temptime=3000
        this.node.active=false
        console.log("hi");
        this.ballpool.generate()
        let getnoOfSelection=this.ballpool.valuesArr.length
        let select=this.ballpool.noOfSelection[getnoOfSelection]
        let s1=select[0]
          let s2
          if(s1==1 || s1==2 || s1==3){
            let rand=randomRangeInt(1,11)
            console.log(rand,"random value generated");
             s2=select[rand]
             console.log(s2);
          }
          else if(s1==4 || s1==5 || s1==6 ||s1==7){
              let rand=randomRangeInt(1,52)
              console.log(rand,"random value generated")
              s2=select[rand]
          }
          else if(s1==8 ||s1==9 || s1==10){
            let rand=randomRangeInt(1,102)
              console.log(rand,"random value generated")
              s2=select[rand]
          }
          console.log(s1,"s1")
          console.log(s2,"s2");
          
          if(s2==1)
          this.ballpool.resultpoints[0]=this.ballpool.valuesArr[this.ballpool.valuesArr.length-1];
          else{
            let rand
            if(s2!=0){
                 rand=0
            }
            for(let i=rand;i<s2+rand;i++){
                this.ballpool.resultpoints[i]=this.ballpool.valuesArr[i];
              }
          }
         
          console.log(this.ballpool.resultpoints);
          console.log(this.ballpool.valuesArr);
          console.log( this.ballpool.correctcount,"cc");
          console.log(this.ballpool.resultpoints.length,"len");
          
          for (let k = 0; k < this.ballpool.resultpoints.length; k++) {
            this.ballpool.child[this.ballpool.resultpoints[k] - 1].getComponent(Sprite).spriteFrame =this.ballpool.wrongSprite
            // this.payoutchildren[k].setScale(0.7,0.7,1)
          }
          console.log(this.ballpool.payoutchildren);
          
          for (let q = 0; q < this.ballpool.resultpoints.length; q++) {
            for (let n = 0; n < this.ballpool.resultpoints.length; n++) {
              if (this.ballpool.resultpoints[q] == this.ballpool.valuesArr[n]) {           
                this.ballpool.payoutchildren[this.ballpool.correctcount].getComponent(Sprite).spriteFrame=this.ballpool.resultsprite
                this.ballpool.payoutchildren[this.ballpool.correctcount].getComponent(UITransform).width=62
                this.ballpool.payoutchildren[this.ballpool.correctcount].getComponent(UITransform).height=61
                this.ballpool.correctcount++
                this.ballpool.child[this.ballpool.resultpoints[q] - 1].getComponent(Sprite).spriteFrame=this.ballpool.resultsprite
                break;
              }
            }
          }
          for(let n=0;n<this.ballpool.valuesArr.length;n++){
            if(this.ballpool.payoutchildren[n].getComponent(Sprite).spriteFrame==this.ballpool.resultsprite){
              this.ballpool.gotananswer=true
              this.ballpool.anssprite++
            }
          }
          if(this.ballpool.gotananswer==false){
            this.ballpool.anssprite=0
          }
          this.ballpool.addamount()
          sys.localStorage.setItem("TotalAmount", this.ballpool.amount.getComponent(Label).string)   
          if(this.ballpool.increasedamount>0){     
            if(typeof(this.ballpool.increasedamount)){
            let createlabel=instantiate(this.ballpool.increasprefab)
            createlabel.getChildByName("Label").getComponent(Label).string="+"+this.ballpool.increasedamount+"USD"
            this.ballpool.topnode.addChild(createlabel)
            createlabel.setPosition(545,0,0)
            setTimeout(()=>{
              this.ballpool.topnode.removeChild(createlabel)
            },500)
          }
            }
          setTimeout(()=>{
            console.log("kkkkkyyyyyy");
            
            for(let i= 0 ;i<this.ballpool.resultpoints.length;i++)
            {
                // this.child[this.resultselectionpoints[i]-1].getComponent(Sprite).spriteFrame=this.initSprite
                this.ballpool.child[this.ballpool.resultpoints[i] - 1].getComponent(Sprite).spriteFrame=this.ballpool.initSprite
                if(i<this.ballpool.payoutchildren.length)
                this.ballpool.payoutchildren[i].getComponent(Sprite).spriteFrame=this.ballpool.payoutsprite
            }
            for(let i=0;i<this.ballpool.valuesArr.length;i++){
                this.ballpool.child[this.ballpool.valuesArr[i] - 1].getComponent(Sprite).spriteFrame=this.ballpool.selectedsprite
            }
          },time)
          time=time+temptime
          this.ballpool.correctcount=0
          this.ballpool.increasedamount=0
          this.ballpool.anssprite=0
    }
    
   
}

