class WalletClass {
    public walletbalance : number = 10000    
    getBalance() : number {
        return this.walletbalance
    }
    setBalance(newbalance:number) :void {
        this.walletbalance = newbalance
    }

}

const Wallet = new WalletClass()
export default Wallet