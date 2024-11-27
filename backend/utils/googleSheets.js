import { google } from "googleapis";
import formModal from "../modals/formModal.js";
import * as dotenv from "dotenv";
dotenv.config();

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "base64").toString(
      "utf-8"
    )
  ),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const spreadsheetId = process.env.GOOGLE_SHEET_ID;

export default async function exportToGoogleSheet() {
  try {
    const forms = await formModal.find();

    const uniqueBitsIds = [
      ...new Set(
        forms.flatMap((form) => form.students.map((student) => student.bitsId))
      ),
    ];
    const uniqueDates = [
      ...new Set(forms.map((form) => form.date.toISOString().split("T")[0])),
    ];

    const headerRow = ["Bits ID", ...uniqueDates];

    const rows = uniqueBitsIds.map((bitsId) => {
      const row = [bitsId];
      uniqueDates.forEach((date) => {
        const formsForDate = forms.filter(
          (form) => form.date.toISOString().split("T")[0] === date
        );

        const isPresent = formsForDate.some((form) =>
          form.students.some((student) => student.bitsId === bitsId)
        );

        row.push(isPresent ? "P" : "A");
      });
      return row;
    });

    const data = [headerRow, ...rows];

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1",
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
