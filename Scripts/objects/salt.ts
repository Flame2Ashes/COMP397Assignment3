//Salt object
//If touched, player dies

module objects {
    export class Salt extends objects.GameObject {

          constructor() {
            super("salt");
          }

        public setPosition(pos : objects.Vector2) : void {
            this.x = pos.x;
            this.y = pos.y;
        }

        public getPosition() : objects.Vector2 {
            return new objects.Vector2(this.x, this.y);
        }
    }

}