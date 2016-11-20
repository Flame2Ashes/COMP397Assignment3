//Salt object
//If touched, player dies

module objects {
    export class Salt extends objects.GameObject {

          constructor(defaultPosition : objects.Vector2) {
            super("salt");
          }

        public setPosition(pos : objects.Vector2) : void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public getPosition() : objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }

        public doDamage(life : number) : void {
                life -= 0.5;
        }
    }

}