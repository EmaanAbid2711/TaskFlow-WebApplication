import multer from "multer";
import path from "path";


const storage =
  multer.diskStorage({

    destination:
      (
        req,
        file,
        cb
      ) => {

        cb(
          null,
          "uploads/profile-images"
        );

      },


    filename:
      (
        req,
        file,
        cb
      ) => {

        const uniqueName =
          Date.now()
          +
          "-"
          +
          Math.round(
            Math.random()*100000
          )
          +
          path.extname(
            file.originalname
          );


        cb(
          null,
          uniqueName
        );

      }

  });



const upload =
  multer({
    storage,

    limits:{
      fileSize:
        5 * 1024 * 1024
    },

    fileFilter:
      (
        req,
        file,
        cb
      )=>{

        if(
          file.mimetype.startsWith(
            "image/"
          )
        ){
          cb(null,true);
        }
        else{
          cb(
            new Error(
              "Only images allowed"
            )
          );
        }

      }

  });


export default upload;