const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/download", (req, res) => {
    const { url, format } = req.body;
    console.log("Received Download Request:", url, format);

    if (!url) {
        console.log("Error: No URL provided!");
        return res.status(400).json({ error: "YouTube URL is required" });
    }

    const command = `python3 downloader.py "${url}" "${format}"`;

    console.log("Executing command:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log("Download Error:", stderr);
            return res.status(500).json({ error: stderr });
        }
        console.log("Download Success! File saved:", stdout.trim());
        res.json({ message: "Download started!", file: stdout.trim() });
    });
});


app.listen(5000, () => console.log("Server running on port 5000"));
