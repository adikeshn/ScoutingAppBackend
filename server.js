const express = require("express");
const { google } = require("googleapis")
const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }))
app.get("/", async (req, res) => {

    res.send("hello world");
})
app.post("/sheets", async (req, res) => {

    const data = req.body
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient()

    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadSheetId = "18kWMUWZuIifPgPKdaI8jy29GRUWt_coTt5oflNNDUyI"

    await googleSheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: spreadSheetId,
        range: "Match Data!A:B",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: data
        },
    })
    res.end()
})


app.listen(process.env.PORT || 4000, () => { console.log("Listening on 3000") })
