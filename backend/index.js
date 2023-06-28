import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import UserRoutes from "./src/routes/UserRoutes.js";
import multer from "multer";

const app = express();
const port = 2000;

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname)
    }
});

const upload = multer({storage: fileStorageEngine});

app.post("/users/upload", upload.single("file"), (req, res) => {
    const file = req.file;
    res.status(200).json(file.filename);
});

// middlewares
app.use(cors());
app.use(express.json());
app.use(FileUpload());
app.use(UserRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));