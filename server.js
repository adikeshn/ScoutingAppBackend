const express = require("express");
const { google } = require("googleapis")
const app = express();
app.use(express.static("public"));
app.use(express.json({ limit: '1mb' }))

app.post("/sheets", async (req, res) => {

    const data = req.body
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/spreadsheets"
    });
    const client = await auth.getClient()

    const googleSheets = google.sheets({ version: "v4", auth: client })

    const spreadSheetId = "1zflTQdinpHe2MIk5_vy-QtYxo9v5kNqfltcjkVX7Trc"

    googleSheets.spreadsheets.values.append({
        auth: auth,
        spreadsheetId: spreadSheetId,
        range: "Match Data!A:AE",
        valueInputOption: "USER_ENTERED",
        resource: {
            values: data
        },
    })
        .then(() => res.status(200).end())
        .catch((err) => {
            res.status(400).end()
        })
})


app.listen(process.env.PORT || 4000, () => { console.log("Listening on 4000") })
