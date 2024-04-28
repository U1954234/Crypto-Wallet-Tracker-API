interface UserInterface {
    firstname:string
    lastname:string
    auth_key:string
}
interface UserModel {
    id:number
    firstname:string
    lastname:string
    email:string
    auth_key:string
    password:string
}

const User : UserModel[] = [{firstname:'Test',lastname:'User',auth_key:'12345678900',password:'12345',email:"test@test.com",id:1}]
export {
    User,UserModel,UserInterface
}