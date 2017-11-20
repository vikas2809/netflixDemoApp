var FileSystem=require('fs');
exports.saveUploadImage=function(upload_image,info){
  console.log("uploaded image");
  console.log(upload_image);
    let image=upload_image;
    let imageGroup=info;

    //regex for checking the valid image
    var matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
           response = {};  //an empty response

    //validating the image
    if(matches.length !==3)
      return new Error("invalid image!!! Please try again");

    response.type =matches[1];
    console.log(matches[1]+" match 1");

    response.data=new Buffer(matches[2],'base64');


    var data=ValidImageExtension(image);

    function ValidImageExtension(data)
    {
      var imageName = imageGroup + '_' + Math.random();
    if (data.indexOf('image/jpeg') > -1) {
        return imageName + '.jpeg';
    }
    if (data.indexOf('image/png') > -1) {
        return imageName + '.png';
    }
    if (data.indexOf('image/gif') > -1) {
        return imageName + '.gif';
    }
    }

    //saving the image valid path. provide the path here.
      var imageName = '/Node JS/New folder (2)/changing approach/netflixDemoApp-master/src/assets/adminImages' + '/' + data;

      console.log(imageName);

      //saving the image in the vaid path in the folder
      FileSystem.writeFile(imageName, response.data, function (error) {
          // console.log(response.data);
          if (error) throw error
      })
      //user.image = data;
      return data;
}
