const { test, expect, request } = require("@playwright/test");
const ExcelJs = require("exceljs");
const path = require("path");
const fs = require("fs");

async function getCellCoordinate(worksheet, searchText) {
  let returnCell;

  worksheet.eachRow((row, rowNumber) => {
    row.eachCell((cell, columnNumber) => {
      if (cell.value === searchText) {
        console.log(
          "row: " +
            rowNumber +
            " column: " +
            columnNumber +
            " value: " +
            cell.value,
        );
        returnCell = cell;
      }
    });
  });
  return { row: returnCell.row, column: returnCell.col };
}

async function replaceTextInExcel(
  filePath,
  newFilePath,
  sheetName,
  searchText,
  replaceText,
  changeCell = {
    row: 0,
    column: 0,
  },
) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);
  const { row, column } = await getCellCoordinate(worksheet, searchText);
  let cell = worksheet.getCell(
    row + changeCell.row,
    column + changeCell.column,
  );

  if (cell !== null) {
    cell.value = replaceText;
    await workbook.xlsx.writeFile(newFilePath);
  } else {
    console.log("Cell not found");
  }
}

test("Replace text in excel", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/upload-download-test/", {
    timeout: 60000,
  });

  // Wait for download
  // await page.waitForTimeout(3000);

  // Handle download file name
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.click("//button[@id='downloadButton']"),
  ]);

  let fileName = download.suggestedFilename();

  // Fix missing extension
  if (!fileName.endsWith(".xlsx")) {
    fileName += ".xlsx";
  }

  const filePath = path.join(__dirname, "downloads", fileName);
  const newFilePath = path.join(__dirname, "downloads", "download-new.xlsx");

  await download.saveAs(filePath);

  console.log("Saved to:", filePath);

  await replaceTextInExcel(
    filePath,
    newFilePath,
    "Sheet1",
    "Banana",
    "999999",
    { row: 0, column: 2 },
  );

  const uploadTextbox = page.locator(
    "//input[@type='file' and @id='fileinput']",
  );
  await uploadTextbox.setInputFiles(newFilePath);

  await page.waitForTimeout(3000);
});
