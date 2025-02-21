export interface IPackages {
  id: number;
  name: string;
  img?: string;
  price: number;
  productId: number[];
  description: string;
}

export interface IPackagesAdmin{
  packagesId : number;
  name :string;
  price : number;
  description : string; 
}
