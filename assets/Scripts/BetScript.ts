import { _decorator, Component, Node, Prefab, instantiate, Label, EventTouch, EditBox, UITransform, SpriteFrame, Sprite } from 'cc';
import { BallPool } from './BallPool';
const { ccclass, property } = _decorator;

@ccclass('BetScript')
export class BetScript extends Component {
    @property(Node)
    Moneynode:Node

    @property(Prefab)
    buttonprefab:Prefab

    @property(EditBox)
    editbox:EditBox

    @property(BallPool)
    ballPool:BallPool

    @property(SpriteFrame)
    Allsprites:SpriteFrame[]=[]

    height=445
    width=130
    bet=new Array
    k=0
    showing:boolean=false
    AlllBalls
    m=0
    child
    start(){
        this.node.active=false
        this.show()
    }
    show(){
        if(this.showing==false){
        
            
        this.showing=true
        this.bet=[0.10,0.20,0.30,0.40,0.50,0.60,0.70,0.80,1.00,2.00,4.00,10.00,20.00,50.00,75.00,100.00]
        for(let i=0;i<7;i++){
            for(let j=0;j<2;j++){
                let button=instantiate(this.buttonprefab)
                button.getComponent(Sprite).spriteFrame=this.Allsprites[0]
                button.getComponent(UITransform).width=224
                button.getComponent(UITransform).height=34
                button.on(Node.EventType.TOUCH_START,this.OnAmtbtnClicked,this)
                button.getComponentInChildren(Label).string=this.bet[this.k]
                this.k++
                this.Moneynode.addChild(button)
                if(j==1){
                    button.setPosition(this.width,this.height,0)
                    this.height=this.height-50
                }else
                button.setPosition(-this.width,this.height,0)
            }
            if(i==6){
                this.k=0
            }
        }
        let button=instantiate(this.buttonprefab)
        button.getComponent(Sprite).spriteFrame=this.Allsprites[0]
        button.getComponent(UITransform).width=224
                button.getComponent(UITransform).height=34
                button.on(Node.EventType.TOUCH_START,this.OnAmtbtnClicked,this)
                this.Moneynode.addChild(button)
                button.getComponentInChildren(Label).string=this.bet[this.bet.length-1]
                button.setPosition(-130,95,0)

        this.child=this.Moneynode.children
    }
    }

    showbet(){
        // this.ballPool.touchoff()
        this.node.active=true
    }

    hide(){
        this.k=0
        this.showing=false
        // this.ballPool.touchon()
        this.node.active=false
          this.k=0
    }

    OnAmtbtnClicked(event:EventTouch){
        // console.log("called");
        // console.log(this.child);
        
        let curnode = event.target as Node;
       
        for(let i=2;i<this.child.length;i++){
            this.child[i].getComponent(Sprite).spriteFrame=this.Allsprites[0]
        }
       
        let Amount = Number(this.editbox.getComponentInChildren(Label).string)
        // console.log("Amount",Amount);
        // console.log(Number(this.editbox.getComponent(EditBox).string));
        this.editbox.getComponentInChildren(Label)
       
        let value=curnode.getChildByName("Label").getComponent(Label).string
        // console.log("Vaue",value);
        // console.log(this.editbox.getComponentInChildren(Label).string,"1");
        this.editbox.getComponentInChildren(Label).string=value
        this.child[curnode.getSiblingIndex()].getComponent(Sprite).spriteFrame=this.Allsprites[1]
        // console.log("hdfhg",Amount);
    }
}

