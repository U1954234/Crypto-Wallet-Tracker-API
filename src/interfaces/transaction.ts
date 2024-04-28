interface TransactionInterface {
    id: string | number 
    userId: number
    type:'BUY' | 'SELL'
    amount:number
    address?:string
    currency:string
    date:Date

}
export default TransactionInterface