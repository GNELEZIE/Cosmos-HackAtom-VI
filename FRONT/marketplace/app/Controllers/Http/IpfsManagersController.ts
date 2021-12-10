import Application from "@ioc:Adonis/Core/Application";
import { cuid } from "@ioc:Adonis/Core/Helpers";

const ipfsAPI = require("ipfs-api");

const folderName = "nfts";

//Connceting to the ipfs network via infura gateway
const ipfs = ipfsAPI("ipfs.infura.io", "5001", { protocol: "https" });


//Creating buffer for ipfs function to add file to the system

export default class IpfsManagersController {

    async store({ request, response }) {

        const filepath = request.input("filepath");
        let fileBuffer = new Buffer("");
        if (!filepath) {
            //card identity file verso
            const nftfile_filename = request.file(
                "nftfile",
                {
                    size: "25mb",
                    extnames: ["png", "jpeg", "pdf", "jpg", "PNG", "PDF", "JPG", "JPEG"],
                }
            );

            let file_ext = nftfile_filename.extname
                ? nftfile_filename.extname
                : "png";

            await nftfile_filename.moveToDisk(Application.publicPath(`${folderName}`),
                {
                    name: cuid() + Date.now() + "." + file_ext,
                    overwrite: true,
                }
            );
            
            let fileUploadPath = Application.publicPath(`${folderName}`) + `/${nftfile_filename.fileName}`;
            fileBuffer = new Buffer(fileUploadPath);

        }else {
             fileBuffer = new Buffer(filepath);
        }


        const fileHash = await ipfs.files.add(fileBuffer);


        return response.json({
            error: false,
            message: "Uploaded with success",
            file: fileHash,
        });
  }

  async getfilewithhash({ request, response }) {
    let file_hash = request.input("file_hash");

    //This hash is returned hash of addFile router.
    const validCID = file_hash;

    if(!validCID){
        return response.json({
            error: false,
            message: "Please send valid cuid!",
        });
    }
    var filesData: any[] = [];

    const files = await ipfs.files.get(validCID);

    for (var i = 0; i < files.length; i++) {
        if (files[i]) {
            console.log(files[i].path);
            filesData.push(files[i]);
            console.log(files[i].content.toString("utf8"));
        } else {
            console.log("File not found!");
        }
    }

    return response.json({
        error: false,
        message: "Files return with success",
        file_url: "https://gateway.ipfs.io/ipfs/" + file_hash,
    });
}
}
