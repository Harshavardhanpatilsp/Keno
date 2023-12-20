import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('AmountScript')
export class AmountScript extends Component {
    start() {
        this.node.active=false
    }

   show(){
    this.node.active=false
   }
}

