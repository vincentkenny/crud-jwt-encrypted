export class Purchase {
    id: number;
    productId: number;
    quantity: number;
    totalPrice: number;
    userId: number;

    constructor(id: number,productId: number, quantity: number, totalPrice: number, userId: number) {
        this.id = id;
        this.productId= productId;
        this.quantity= quantity;
        this.totalPrice = totalPrice;
        this.userId = userId;
    }
}