export interface Rating {
    id: number;
    email : string;
    ratingIndex : number;
    comment? : string;
}

export interface RatingShow {
    ratingId :number;
    email : string;
    ratingIndex : number;
    content : string;
    createdAt : Date;
    ipUser : string;
}