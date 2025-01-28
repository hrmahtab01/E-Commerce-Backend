 
 const multer = require("multer");

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniquefilename = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extention = file.originalname.split(".");
      cb(null, file.fieldname + '-' + `${uniquefilename}.${extention[extention.length - 1]}`)
    }
  })
  
  const upload = multer({ storage: storage })

  module.exports = upload