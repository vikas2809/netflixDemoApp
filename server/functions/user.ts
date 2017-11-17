export interface User {
    firstName: {type:String},
    lastName: {type:String},
    email: { type: String, unique: true},
    password: {type:String},
    role: { type: String},
    image: { typr: String},
    created_at: { type: Date},
    updated_at: { type: Date}
  }

  exports.success=(res)=>{
    "success":true;
    "data":res;
}
