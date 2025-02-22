export interface IPackages {
  id: number;
  name: string;
  price: number;
  productId: number[];
  description: string;
}

export interface IPackagesAdmin{
  packageId : number;
  name :string;
  price : number;
  description : string; 
}


export interface IPackagesShow {
  packageId: number;
  name: string;
  price: number;
  description: string;
  img? : string;
}