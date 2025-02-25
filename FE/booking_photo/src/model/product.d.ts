export interface IProductShow{
    productId : number;
    image : string;
    packageId : number;
    namePackage : string;
    pricePackage : number;
    descriptionPackage : string;
}   

export interface ISlider{
    productId : number[];
    image : string[];
    packageId : number;
    namePackage : string;
    descriptionPackage : string;
}

