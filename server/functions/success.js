// exports.success=(res)=>{
//     "success"=true;
//     "data"=res;
// }
// function success1(res)
// {
//     let success=true;
//     let data=res;
// }


exports.successResponse=function(message){
  return {
    "statusCode":"Enjoy your info detail",
    "success":true,
    "data":message
  }
}
