import { google } from "googleapis";
import formModal from "../modals/formModal.js"; // Adjust this path
import * as dotenv from "dotenv";
dotenv.config();

// Google Sheets Authentication
const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "base64").toString("utf-8")),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

// The ID of your Google Sheet
const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Replace with your Google Sheets ID

export default async function exportToGoogleSheet() {
    try {
        // Fetch all forms from the database
        const forms = await formModal.find();

        // Collect unique Bits IDs and dates
        const uniqueBitsIds = [
            ...new Set(forms.flatMap((form) => form.students.map((student) => student.bitsId))),
        ];
        const uniqueDates = [
            ...new Set(forms.map((form) => form.date.toISOString().split("T")[0])),
        ];

        // Create the header row (dates)
        const headerRow = ["Bits ID", ...uniqueDates];

        // Create rows for each Bits ID
        const rows = uniqueBitsIds.map((bitsId) => {
            const row = [bitsId];
            uniqueDates.forEach((date) => {
                // Find all forms for the same date
                const formsForDate = forms.filter(
                    (form) => form.date.toISOString().split("T")[0] === date
                );

                // Check if the student is present in any of these forms
                const isPresent = formsForDate.some((form) =>
                    form.students.some((student) => student.bitsId === bitsId)
                );

                row.push(isPresent ? "P" : "A");
            });
            return row;
        });

        // Combine header and data rows
        const data = [headerRow, ...rows];

        // Write data to Google Sheets
        await sheets.spreadsheets.values.update({
            spreadsheetId,
            range: "Sheet1", // Adjust to the desired sheet name or range
            valueInputOption: "RAW",
            requestBody: {
                values: data,
            },
        });

        console.log("Data exported to Google Sheets successfully!");
    } catch (error) {
        console.error("Error exporting to Google Sheets:", error);
    }
}
