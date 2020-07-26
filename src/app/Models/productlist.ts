export class Productlist {
  public poductDetailsId: number;
  public productId: number;
  public productsubId: number;
  public productCategory: string;
  public productName: string;
  public productSubcategory: string;
  public productSize: string;
  public orientation: string;
  public paperGSM: string;
  public quantities: string;
  public productPrice: string;
  public productImage: any;
  public price: string;
  public productDescription: string;
  public producPreference: number;
  public productCode: string;
  public DesignPrice: number;
  public DesignGST: number;
  public DesignCommision: number;
  public PrintPrice: number;
  public PrintGST: number;
  public PrintCommision: number;
  public SlotTimeGap: number;
  public deliveryFees: number;
  public deliveryTime: string;
  public printPrice: Array<ProductprintPrice>;
}
export class ProductprintPrice {
  public Id:number;
  public prodDetailsId: number;
  public qunatity: number;
  public pricePerUnit: number;

  public deliveryDays: string;

  public printCommission: number;
}
