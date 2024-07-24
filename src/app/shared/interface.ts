export interface IProduct{
    _id?: string;
    name : string;
    description : string;
    price : number;
    imageUrl : string;
    quantity?:number;
}

export interface IOrder{
    id?: number,
    customerName?:string;
    orderDate?:string;
    status?:string;
    totalAmount?:number;
    products?:IProduct
}
export interface NetworkResponse<Collection> {
    statusCode: number,
    message: string,
    data: Collection,
    extraData?: ExtraData
  }
  export interface ExtraData {
    perPage: number;
    page: number;
    total: number;
  }
  export interface Pagination{
    page: number,
    perPage: number,
    total?: number
  }