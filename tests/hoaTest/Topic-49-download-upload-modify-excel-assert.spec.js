const { test, expect, request } = require("@playwright/test");
const ExcelJs = require("exceljs");
const path = require("path");
const fs = require("fs");

async function getWorksheet(filePath, sheetName) {
  const workbook = new ExcelJs.Workbook();
  await workbook.xlsx.readFile(filePath);
  return workbook.getWorksheet(sheetName);
}

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

async function getCellCoordinateFromFile(filePath, sheetName, searchText) {
  const worksheet = await getWorksheet(filePath, sheetName);
  return await getCellCoordinate(worksheet, searchText);
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

test("Replace text in excel...", async ({ browser }) => {
  const options = {
    args: ["--start-maximized", "--window-position=0,0"],
    viewport: { width: 1920, height: 1080 },
  };
  const context = await browser.newContext(options);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/upload-download-test/", {
    timeout: 60000,
  });

  const downloadButton = page.locator("//button[@id='downloadButton']");

  // Handle download file name
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    downloadButton.click(),
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

  const searchText = "Banana";
  const replaceText = "999999";

  const cellCoordinate = await getCellCoordinateFromFile(
    filePath,
    "Sheet1",
    searchText,
  );
  const searchRow = cellCoordinate.row;
  const searchColumn = cellCoordinate.column;
  const updateRow = searchRow - 2; // minus 2 because the row is 0-based index
  const updateColumn = searchColumn + 2;
  console.log("searchRow: " + searchRow);
  console.log("searchColumn: " + searchColumn);
  console.log("updateRow: " + updateRow);
  console.log("updateColumn: " + updateColumn);

  await replaceTextInExcel(
    filePath,
    newFilePath,
    "Sheet1",
    searchText,
    replaceText,
    {
      row: 0,
      column: 2,
    },
  );

  const uploadTextbox = page.locator(
    "//input[@type='file' and @id='fileinput']",
  );
  await uploadTextbox.setInputFiles(newFilePath);

  const cellLocation = page.locator(
    `//div[@id='row-${updateRow}']/div[@id='cell-${updateColumn}-undefined']`,
  );
  await expect(cellLocation).toBeVisible();
  await expect(cellLocation).toHaveText(replaceText);
});
