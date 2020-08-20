/*File name: app.ts
  Author's Name: Anirudh Babu
  Student no.: 301105250
  File description: Responsible for being a base for button objects
*/
var UIObjects;
(function (UIObjects) {
    class Button extends Core.GameObject {
        // PRIVATE FIELDS (CLASS MEMBERS)
        // CONSTRUCTOR(S)
        constructor(bitmap_asset, x = 0, y = 0, isCentered = false) {
            super(bitmap_asset, x, y, isCentered);
            this.isCentered = isCentered;
            // mouse events
            this.on("mouseover", this.m_mouseOver);
            this.on("mouseout", this.m_mouseOut);
        }
        // PRIVATE METHOD(S)
        m_mouseOver() {
            this.alpha = 0.7; // 70% opaque - 30% transparent
        }
        m_mouseOut() {
            this.alpha = 1.0; // 100% opaque - 0% transparent
        }
    }
    UIObjects.Button = Button;
})(UIObjects || (UIObjects = {}));
//# sourceMappingURL=button.js.map