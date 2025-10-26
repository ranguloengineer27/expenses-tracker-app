import express, { Request, Response } from 'express';
import cors from 'cors';
import multer from "multer";
import fetch from "node-fetch";
import FormData from "form-data";
import dotenv from "dotenv";

dotenv.config();

const upload = multer(); // usa memory storage por simplicidad
const app = express();
const PORT = process.env.PORT || 3009;

// Middleware
app.use(cors());
app.use(express.json());


const API_KEY = `apikey ${process.env.API_KEY}`;

// Routes
app.post("/api/readReceipt", upload.single("file"), async (req: Request, res: Response) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file provided" });
        }

        const formData = new FormData();
        formData.append("file", file.buffer, file.originalname);

        const resp = await fetch("https://api.veryfi.com/api/v8/partner/documents", {
            method: "POST",
            headers: {
                "CLIENT-ID": process.env.CLIENT_ID!,
                "AUTHORIZATION": API_KEY,
                "Accept": "application/json",
            },
            body: formData as any,
        });

        if (!resp.ok) {
            const text = await resp.text();
            return res.status(resp.status).json({ error: text });
        }

        const json = await resp.json();
        return res.json(json);

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message || "Server error" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
