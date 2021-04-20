export interface TokenDetail
{
    userId:number,
    expDate:number,
    email:string,
    roles?:string[],
    issuer?:string,
    audience?:string
}