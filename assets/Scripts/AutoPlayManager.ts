import { _decorator, Button, color, Component, EditBox, Label, Node, Sprite, SpriteFrame, tween, Vec3,instantiate,sys,UITransform,randomRangeInt,log, logID } from 'cc';
import { BallPool } from '../Scripts/BallPool';
const { ccclass, property } = _decorator;

@ccclass('AutoPlayManager')
export class AutoPlayManager extends Component {

    @property(SpriteFrame)
    AutoSprites : SpriteFrame []=[];

    @property(Button)
    Autostart:Button = null;

    @property(Node)
    keypad:Node = null;

    @property(Node)
    WinOrLosenode :Node []= [];

    @property(BallPool)
    ballpool:BallPool

    

    //230
    public static Roundsnum = 3;
    public static stopcashincby: object = {"enable": false, "value": 0};
    public static stopcashdecby: object = {"enable": false, "value": 0};
    public static stopcashsingleby: object = {"enable": false, "value": 0};
    public static Ifwon: Array<object> = [{ "enable": true, "value": null},{ "enable": false, "value": 0},{ "enable": false, "value": 0}];
    public static Iflost: Array<object> = [{ "enable": true, "value": null},{ "enable": false, "value": 0},{ "enable": false, "value": 0}]
    public static curEditbox:EditBox = null;

    public static Allarrays = [];
    Stopautoplay:boolean=false
    start() {
        this.node.active=false
        AutoPlayManager.Allarrays.push(AutoPlayManager.stopcashincby,AutoPlayManager.stopcashdecby,AutoPlayManager.stopcashsingleby,AutoPlayManager.Ifwon,AutoPlayManager.Iflost);
    }

    OneditorboxClicked(event,type){
        let curnode = event;
        
        console.log("event:",curnode.string)
        if(type == "EditBox"){
            AutoPlayManager.curEditbox = curnode;
            curnode.string = "";
            curnode.node.parent.addChild(this.keypad);
            this.keypad.setPosition(5,230,1);
            this.keypad.active = true;
        }
        else{
            this.keypad.active = false;
            console.log("keypad pressed", AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1])
            if(AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1] == "."){
                AutoPlayManager.curEditbox.string = AutoPlayManager.curEditbox.string.replace(AutoPlayManager.curEditbox.string[AutoPlayManager.curEditbox.string.length-1],".0");
                let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
                let statvar
                if(val >10){
                    statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
                }else{
                    statvar = AutoPlayManager.Allarrays[val];
                }
                statvar["value"] =  Number(AutoPlayManager.curEditbox.string);
            }
            if(Number(AutoPlayManager.curEditbox.string) >100){
                AutoPlayManager.curEditbox.string = '100';
                // let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
                // let statvar
                // if(val >10){
                //     statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
                // }else{
                //     statvar = AutoPlayManager.Allarrays[val];
                // }
                // statvar["value"] = 100;
            }
            if(AutoPlayManager.curEditbox.string == "" || AutoPlayManager.curEditbox.string == "0." || AutoPlayManager.curEditbox.string == "0" || AutoPlayManager.curEditbox.string =="."){
                AutoPlayManager.curEditbox.string = "1";
                // let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
                // let statvar
                // if(val >10){
                //     statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
                // }else{
                //     statvar = AutoPlayManager.Allarrays[val];
                // }
                // statvar["value"] = 1;
            }
            let val = this.Numset(AutoPlayManager.curEditbox.node.parent.parent.name);
            console.log(val,"val",AutoPlayManager.curEditbox.node.parent.parent.name);

            let statvar
            if(val >10){
                statvar = AutoPlayManager.Allarrays[Math.floor(val/10)][val%10];
            }else{
                statvar = AutoPlayManager.Allarrays[val];
            }
            statvar["value"] =  Number(AutoPlayManager.curEditbox.string);
            AutoPlayManager.curEditbox.string =  statvar["value"].toString();
        }
        
    }

    Numset(curnode){
        switch (curnode) {
            case "StopCashBG1":
                    return 1;
                break;

            case "StopCashBG2":
                 return 2;

            break;

            case "StopCashBG3":
                return 0;

            break;

            case "Winincby":
                return 31;

            break;

            case "WinDecby":
                return 32;

            break;

            case "Loseincby":
                return 41;

            break;

            case "Losedecby":
               return 42;

            break;
            default:
                break;
        }
    
    }

    onKeyspressed(event){
        let curnode = event.target as Node;
        let val = curnode.children[0].getComponent(Label).string;
        console.log("event:",curnode)
        if(val!= "x"){
            AutoPlayManager.curEditbox.string += val;
        }else{
            let str = AutoPlayManager.curEditbox.string;
            if(str != ""){
                AutoPlayManager.curEditbox.string = str.replace(str[str.length-1],"");
            }
           
        }
        
       
    }

    OnMoreOptionClick(event) {
        let curnode = event.target as Node;
        let container = curnode.parent.parent;
        container.children[2].active = !container.children[2].active;
    }

    OntoggleClick(event){
        let curnode = event.target as Node;
        
        if(curnode.children[0].position.x == 14){
            tween(curnode.children[0]).to(0.1,{position: new Vec3(-14,0,0) }).start();
            this.Toggleswitch(curnode.name)
            curnode.parent.children[2].active = true;
            curnode.getComponent(Sprite).color = color(213,213,213,255);
        }else{
            tween(curnode.children[0]).to(0.1,{position: new Vec3(14,0,0) }).start();
            curnode.parent.children[2].active = false;
            this.Toggleswitch(curnode.name)
            curnode.getComponent(Sprite).color = color(0,252,0,255);
        }
    }

    Toggleswitch(curnode){
        switch (curnode) {
            case "StopCashToggle_Off1":
                if(AutoPlayManager.stopcashdecby["enable"] == true)
                    AutoPlayManager.stopcashdecby["enable"] = false;
                else
                    AutoPlayManager.stopcashdecby["enable"] = true
                break;
            case "StopCashToggle_Off2":
                if(AutoPlayManager.stopcashsingleby["enable"] == true)
                    AutoPlayManager.stopcashsingleby["enable"] = false;
                else
                    AutoPlayManager.stopcashsingleby["enable"] = true;
            break;                                    
            case "StopCashToggle_Off3":
                if(AutoPlayManager.stopcashincby["enable"] == true)
                    AutoPlayManager.stopcashincby["enable"] = false;
                else
                    AutoPlayManager.stopcashincby["enable"] = true;
                break;
        
            default:
                break;
        }
    }

    OnPlusorMinusClick(event){
        let curnode = event.target as Node;
        let curnum = Number(curnode.parent.children[0].getComponent(EditBox).string);
        if(curnode.name == "StopCash_MinusButton"){
            
            if(curnum>0){
                curnum -= 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum.toFixed(2);
            }
            
        }else{
            if(curnum<100){
                curnum += 1;
                curnode.parent.children[0].getComponent(EditBox).string = curnum.toFixed(2);
            }
            
        }
        let value = this.Numset(curnode.parent.parent.name);
        console.log('Auto val check :',value)
        let statvar
        if(value >10){
            statvar = AutoPlayManager.Allarrays[Math.floor(value/10)][value%10];
        }else{
            statvar = AutoPlayManager.Allarrays[value];
        }
        
        statvar["value"] = Number(curnode.parent.children[0].getComponent(EditBox).string);
       
    }
    OnRoundNumberClick(event){
        let curnode = event.target as Node;
        let parent = curnode.parent;
        console.log(parent);
        
        curnode.getComponent(Sprite).color = color(255,255,255,255);
        curnode.children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[1];
        AutoPlayManager.Roundsnum = Number(curnode.children[1].getComponent(Label).string);
        console.log(AutoPlayManager.Roundsnum);
        for(let i =0 ; i < parent.children.length;i++){
            if(parent.children[i] != curnode){
                parent.children[i].getComponent(Sprite).color = color(213,213,213,255);
                parent.children[i].children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[0];
            }
        }

    }

    WinOrLose(event){
        let curnode = event.target as Node;
        let parent = curnode.parent;
        curnode.getComponent(Sprite).color = color(255,255,255,255);
        curnode.children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[1];
        if(curnode.name == "LoseReturnToInitial" || curnode.name == "WinReturnToInitial"){
            this.Autostart.interactable = true;
        }
        if(parent.name == "WinAutoPlayBG"){
            console.log("csadsa",curnode.getSiblingIndex())
            AutoPlayManager.Ifwon[curnode.getSiblingIndex()-1]["enable"] = true;
            // AutoPlayManager.Ifwon[curnode.getSiblingIndex()]["value"] = 0;
        }else{
            console.log("csadsa",curnode.getSiblingIndex())
            AutoPlayManager.Iflost[curnode.getSiblingIndex()-1]["enable"] = true;
            // AutoPlayManager.Iflost[curnode.getSiblingIndex()]["value"] = 0;
        }
        for(let i =1 ; i < parent.children.length;i++){
            if(parent.children[i] != curnode){
                AutoPlayManager.Iflost[i-1]["enable"] = false;
                parent.children[i].getComponent(Sprite).color = color(213,213,213,255);
                parent.children[i].children[0].getComponent(Sprite).spriteFrame = this.AutoSprites[0];
            }
        }
    }
    startauto(){
    //     if(this.ballpool.AutoButton.getComponent(Sprite).spriteFrame==this.AutoSprites[2]){
    //         console.log("oioioioio");
    //         // this.unschedule(this.startauto)
       this.Stopautoplay=false
    //     }
    //     else{
        let check:boolean=false
        let inside:boolean=false
        let no
        let presetAmt=Number(this.ballpool.amount.getComponent(Label).string)
          this.node.active=false
          this.ballpool.Allbuttons[0].node.active=true
          for(let i=1;i< this.ballpool.Allbuttons.length-1;i++){
              this.ballpool.Allbuttons[i].interactable=false
          }
          
        let i=0
        let autono=AutoPlayManager.Roundsnum
        const editAmt=Number(this.ballpool.editbox.getComponentInChildren(Label).string)
        this.ballpool.Allbuttons[4].getComponentInChildren(Label).string=autono+""
        this.ballpool.Allbuttons[4].node.getChildByName("Label").active=true
        this.ballpool.Allbuttons[4].getComponent(Sprite).spriteFrame=this.AutoSprites[2]
       
          this.schedule(()=>{
            if(this.Stopautoplay){
                this.ballpool.Allbuttons[4].getComponent(Sprite).spriteFrame=this.AutoSprites[3]
       
                for(let i=1;i< this.ballpool.Allbuttons.length-1;i++){
                    this.ballpool.Allbuttons[i].interactable=true
                }
                this.unscheduleAllCallbacks()
              
            }
            if(this.Stopautoplay==false){
            this.ballpool.Allbuttons[4].getComponentInChildren(Label).string=autono+""
      
            autono--
            this.ballpool.amount.getComponent(Label).string=(Number(this.ballpool.amount.getComponent(Label).string)-Number(this.ballpool.editbox.getComponentInChildren(Label).string)).toFixed(2)
          
           
            if(AutoPlayManager.Ifwon[1]["enable"]==true){
                if(this.ballpool.iamt>Number(this.ballpool.editbox.getComponentInChildren(Label).string)){
               
                let incamt=AutoPlayManager.Ifwon[1]["value"]
                this.ballpool.editbox.getComponentInChildren(Label).string=(Number(this.ballpool.editbox.getComponentInChildren(Label).string)+(incamt/100)).toFixed(2)
           
                }else{
                    this.ballpool.editbox.getComponentInChildren(Label).string=editAmt.toFixed(2)
                }
            }
            if(AutoPlayManager.Ifwon[2]["enable"]==true){
                if(this.ballpool.iamt>Number(this.ballpool.editbox.getComponentInChildren(Label).string)){
      
                let incamt=AutoPlayManager.Ifwon[2]["value"]
                this.ballpool.editbox.getComponentInChildren(Label).string=(Number(this.ballpool.editbox.getComponentInChildren(Label).string)-(incamt/100)).toFixed(2)
   
                }else{
                    this.ballpool.editbox.getComponentInChildren(Label).string=editAmt.toFixed(2)
                }
            }

            if(AutoPlayManager.Iflost[1]["enable"]==true){
                if(this.ballpool.iamt<Number(this.ballpool.editbox.getComponentInChildren(Label).string)){
             
                let incamt=AutoPlayManager.Iflost[1]["value"]
                this.ballpool.editbox.getComponentInChildren(Label).string=(Number(this.ballpool.editbox.getComponentInChildren(Label).string)+(incamt/100)).toFixed(2)
       
                }else{
                    this.ballpool.editbox.getComponentInChildren(Label).string=editAmt.toFixed(2)
                }
            }

            if(AutoPlayManager.Iflost[2]["enable"]==true){
                if(this.ballpool.iamt<Number(this.ballpool.editbox.getComponentInChildren(Label).string)){
     
                let incamt=AutoPlayManager.Iflost[2]["value"]
                this.ballpool.editbox.getComponentInChildren(Label).string=(Number(this.ballpool.editbox.getComponentInChildren(Label).string)-(incamt/100)).toFixed(2)
            
                }else{
                    this.ballpool.editbox.getComponentInChildren(Label).string=editAmt.toFixed(2)
                }
            }

            if(check){
                    
                const incamt=presetAmt+AutoPlayManager.stopcashincby["value"]
                const decamt=presetAmt-AutoPlayManager.stopcashdecby["value"]
                console.log(no,"no");
                
                switch(no){
                    case 1:
                        console.log(Number(this.ballpool.amount.getComponent(Label).string),decamt,"ttttttt");
                      var amt=Number(this.ballpool.amount.getComponent(Label).string)
                    if(amt<=decamt){
                        console.log("key",Number(this.ballpool.amount.getComponent(Label).string));
                            inside=true
                    }
                    break
                    case 2:
                        console.log("inn");
                        console.log(this.ballpool.iamt,"inn");
                        
                     if(this.ballpool.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                        console.log("innn");
                     
                        inside=true
                     }
                        break
                    case 3:
                        console.log("33");
                    if(Number(this.ballpool.amount.getComponent(Label).string)>=incamt){
                            inside=true
                    }
                        break
                    case 4:
                        console.log("case 4");
                        
                        if(Number(this.ballpool.amount.getComponent(Label).string)<=decamt || this.ballpool.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                            inside=true
                    }
                        break
                    case 5:
                        console.log("case 5");
                        
                        if(Number(this.ballpool.amount.getComponent(Label).string)<=decamt || Number(this.ballpool.amount.getComponent(Label).string)>=incamt){
                            inside=true
                    }
                        break
                    case 6:
                        console.log("case 6");
                        if(Number(this.ballpool.amount.getComponent(Label).string)>=incamt || this.ballpool.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                            inside=true
                    }
                        break
                    case 7:
                        console.log("case 7");
                        if(Number(this.ballpool.amount.getComponent(Label).string)<=decamt ||Number(this.ballpool.amount.getComponent(Label).string)>=incamt ||this.ballpool.iamt>=AutoPlayManager.stopcashsingleby["value"]){
                            inside=true 
                    }
                        break
                } 
            }
               this.ballpool.iamt=0
                this.iterate()
                if(inside){
                    this.unscheduleAllCallbacks()
                    console.log("logged");
                    for(let i=1;i< this.ballpool.Allbuttons.length;i++){
                        this.ballpool.Allbuttons[i].interactable=true
                    }
                }
                i++
              console.log("i value",i);
              if(i== AutoPlayManager.Roundsnum){
                setTimeout(()=>{
                    this.ballpool.Allbuttons[4].getComponent(Sprite).spriteFrame=this.AutoSprites[3]
                    this.ballpool.Allbuttons[4].node.getChildByName("Label").active=false
                              this.ballpool.Allbuttons[0].node.active=false
                          for(let i=1;i< this.ballpool.Allbuttons.length;i++){
                              this.ballpool.Allbuttons[i].interactable=true
                          }
                },1000)
               

          }
        }
          },2,AutoPlayManager.Roundsnum-1,1)
        // }
      }


      iterate(){
        let time=1000
        let temptime=2000
        this.node.active=false
        console.log("hi");
        for (let m = 0; m < this.ballpool.valuesArr.length; m++) {
            for (let n = m; n < 36; n++) {
              if (this.ballpool.valuesArr[m] == this.ballpool.Allpoints[n]) {
                let temp = this.ballpool.Allpoints[m];
                this.ballpool.Allpoints[m] = this.ballpool.Allpoints[n];
                this.ballpool.Allpoints[n] = temp;
                break;
              }
            }
          }
        this.ballpool.generate()
        let getnoOfSelection=this.ballpool.valuesArr.length
        let select=this.ballpool.noOfSelection[getnoOfSelection]
        let s1=select[0]
          let s2
          if(s1==1 || s1==2 || s1==3){
            let rand=randomRangeInt(1,11)
            console.log(rand,"random value generated1");
             s2=select[rand]
             console.log(s2);
          }
          else if(s1==4 || s1==5 || s1==6 ||s1==7){
              let rand=randomRangeInt(1,52)
              console.log(rand,"random value generated2")
              s2=select[rand]
          }
          else if(s1==8 ||s1==9 || s1==10){
            let rand=randomRangeInt(1,102)
              console.log(rand,"random value generated3")
              s2=select[rand]
          }
         
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
         
          console.log(this.ballpool.resultpoints,"reesult array");
          console.log(this.ballpool.valuesArr,"values arr");

          
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
            if (this.ballpool.increasedamount <= Number(this.ballpool.editbox.getComponentInChildren(Label).string)) {
                createlabel.getComponent(Sprite).spriteFrame = this.ballpool.payoutback
              }
            createlabel.getChildByName("Label").getComponent(Label).string="+"+this.ballpool.increasedamount+"USD"
            this.ballpool.topnode.addChild(createlabel)
            createlabel.setPosition(545,0,0)
            setTimeout(()=>{
              this.ballpool.topnode.removeChild(createlabel)
            },800)
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

    update(deltaTime: number) {
        // let presetAmt=Number(this.ballpool.amount.getComponent(Label).string)
        if((AutoPlayManager.stopcashdecby["enable"] == true && AutoPlayManager.stopcashdecby["value"] > 0)|| AutoPlayManager.stopcashdecby["enable"] == false){
            // console.log("play1",AutoPlayManager.stopcashdecby["value"])
            this.Autostart.interactable = true;            
            // console.log(presetAmt,"amt");
        }
        if((AutoPlayManager.stopcashdecby["enable"] == true && AutoPlayManager.stopcashdecby["value"] <= 0)){
            // console.log("play")
            if(this.Autostart.interactable)
                this.Autostart.interactable = false;
                return
        }

        if((AutoPlayManager.stopcashincby["enable"] == true && AutoPlayManager.stopcashincby["value"] > 0)|| AutoPlayManager.stopcashincby["enable"] == false){
            this.Autostart.interactable = true;
            // console.log("play2",AutoPlayManager.stopcashincby["value"])
        }
        else if((AutoPlayManager.stopcashincby["enable"] == true && AutoPlayManager.stopcashincby["value"] <= 0)){
            this.Autostart.interactable = false;
            return
        }

        if((AutoPlayManager.stopcashsingleby["enable"] == true && AutoPlayManager.stopcashsingleby["value"] > 0)|| AutoPlayManager.stopcashsingleby["enable"] == false){
            this.Autostart.interactable = true;

        }
        else if((AutoPlayManager.stopcashsingleby["enable"] == true && AutoPlayManager.stopcashsingleby["value"] <= 0)){
            this.Autostart.interactable = false;
            return
        }
        if(this.WinOrLosenode[0].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            if(AutoPlayManager.Iflost[1]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[1].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            if(AutoPlayManager.Iflost[2]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[2].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            if(AutoPlayManager.Ifwon[1]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
        if(this.WinOrLosenode[3].children[0].getComponent(Sprite).spriteFrame == this.AutoSprites[1]){
            if(AutoPlayManager.Ifwon[2]["value"] > 0){
                this.Autostart.interactable = true;
            }else{
                this.Autostart.interactable = false;
            }
        }
    }
    hide(){
        this.node.active=false
    }
}
