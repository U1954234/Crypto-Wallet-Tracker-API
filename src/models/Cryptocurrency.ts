 interface Cryptocurrency {
    name: string;
    symbol: string;
    value: number;
    walletId:number
    logo?:string
    currency?:string
}
export const cryptocurrencies : 
Cryptocurrency[] = [{name:"Binance",symbol:"BNB",value:20000,walletId:1,currency:'$',logo:"../assets/media/svg/BNB.svg"},{walletId:2,name:"Bitcoin",symbol:"BTC",value:5000,currency:'$'}]
export default Cryptocurrency
