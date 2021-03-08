// for script purposes
var sheetName = 'Logging';
var scriptProp = PropertiesService.getScriptProperties();
// Logger = BetterLog.useSpreadsheet('');

function intialSetup() {
    var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    scriptProp.setProperty('key', activeSpreadsheet.getId());
}

function doPost(e) {
    var lock = LockService.getScriptLock();
    lock.tryLock(10000);

    try {
        var doc = SpreadsheetApp.openById(scriptProp.getProperty('key'));
        var sheet = doc.getSheetByName(sheetName);

        // var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
        // var nextRow = sheet.getLastRow() + 1;

        var json = JSON.stringify(e.parameter);
        var obj = JSON.parse(json);

        Logger.log('JSON STRING:' + json);
        Logger.log('JSON parse: ' + obj["task"]);


        switch (obj["task"]) {
            case "Tech Trimming":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Trimming":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Priority":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Priority Tracking":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Pouring":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Breaking":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Accepted Guards":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Repour G.M.":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Repour Guard Not Made":
                specificTab(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Tray Tracking":
                specificTracking(obj["task"], obj["tray_number"], obj["cart_name"]);
                break;
            case "Fixed Guards":
                fixedGuardsTab(obj["task"], obj["tray_number"], obj["name"], obj["tech_name"], obj["qrCodeArea"].split("\n"));
                break;
            case "ReThermoforming":
                reThermoformingTab(obj["task"], obj["name"], obj["tech_name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Quality Assurance":
                qualityThermoTabs(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            case "Thermoforming":
                qualityThermoTabs(obj["task"], obj["tray_number"], obj["name"], obj["qrCodeArea"].split("\n"));
                break;
            default:
                Logger.log("option does not exist");
        }

        // var newRow = headers.map(function(header) {
        //   return header === 'timestamp' ? new Date() : e.parameter[header]
        // })

        // sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'success', 'row': nextRow }))
            .setMimeType(ContentService.MimeType.JSON)
    }

    catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({ 'result': 'error', 'error': e }))
            .setMimeType(ContentService.MimeType.JSON)
    }

    finally {
        lock.releaseLock()
    }
}

// Fixed Guard tab
// format
// date | tray QR Code | Emp QR Code | Trim Tech QR Code | Impressing QR Code
function fixedGuardsTab(task, trayNum, name, techName, impressions) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName(task);

    var date = getDate();
    var lastRow = subSheetName.getLastRow();

    // add impressions to last line
    // and concurrently adds date, tray #, emp name, and tech name
    for (var i = 0; i < impressions.length - 1; i++) {
        subSheetName.getRange(lastRow + 1, 1).setValue(date);
        subSheetName.getRange(lastRow + 1, 2).setValue(trayNum);
        subSheetName.getRange(lastRow + 1, 3).setValue(name);
        subSheetName.getRange(lastRow + 1, 4).setValue(techName);
        subSheetName.getRange(lastRow + 1, 5).setValue(impressions[i]);

        lastRow++;
    }
}

// format
// date | Impressing QR Code | Employee QR Code
function reThermoformingTab(task, name, techName, impressions) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName(task);

    var date = getDate();
    var lastRow = subSheetName.getLastRow();

    // add impressions to last line
    for (var i = 0; i < impressions.length - 1; i++) {
        subSheetName.getRange(lastRow + 1, 1).setValue(date);
        subSheetName.getRange(lastRow + 1, 2).setValue(name);
        subSheetName.getRange(lastRow + 1, 3).setValue(techName);
        subSheetName.getRange(lastRow + 1, 4).setValue(impressions[i]);

        lastRow++;
    }
}

// applies to thermoforming and quality control
function qualityThermoTabs(task, trayNum, techName, impressions) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName(task);

    var date = getDate();

    var lastRow = subSheetName.getLastRow();

    // add impressions to last line
    for (var i = 0; i < impressions.length - 1; i++) {
        subSheetName.getRange(lastRow + 1, 1).setValue(date);
        subSheetName.getRange(lastRow + 1, 2).setValue(trayNum);
        subSheetName.getRange(lastRow + 1, 3).setValue(techName);
        subSheetName.getRange(lastRow + 1, 4).setValue(impressions[i]);

        lastRow++;
    }

    for (var i = 0; i < impressions.length - 1; i++) {
        var thickness = subSheetName.getRange(lastRow - (impressions.length - 1 + i), 5).getValue();
        var notes = subSheetName.getRange(lastRow - (impressions.length - 1 + i), 6).getValue();
        var quantity = subSheetName.getRange(lastRow - (impressions.length - 1 + i), 7).getValue();

        lastRow++;
    }
}

// applies to
// Repour Guard Not Made
// Repour GM
// Accepted Guards
// Tech Trimming
// Breaking
// Pouring
// Priority Tracking
// Priority
// FORMAT
// date | tray QR Code | Employee QR Code | Impressing QR Code
function specificTab(task, trayNum, techName, impressions) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName(task);

    var date = getDate();
    var lastRow = subSheetName.getLastRow();

    for (var i = 0; i < impressions.length - 1; i++) {
        subSheetName.getRange(lastRow + 1, 1).setValue(date);
        subSheetName.getRange(lastRow + 1, 2).setValue(trayNum);
        subSheetName.getRange(lastRow + 1, 3).setValue(techName);
        subSheetName.getRange(lastRow + 1, 4).setValue(impressions[i]);

        lastRow++;
    }
}

// Tray Tracking
// format
// date | tray # | cart Name
function specificTracking(task, trayNum, cartName) {
    var spreadSheet = SpreadsheetApp.getActiveSpreadsheet();
    var subSheetName = spreadSheet.getSheetByName(task);

    var date = getDate();

    var lastRow = subSheetName.getLastRow();

    subSheetName.getRange(lastRow + 1, 1).setValue(date);
    subSheetName.getRange(lastRow + 1, 2).setValue(trayNum);
    subSheetName.getRange(lastRow + 1, 3).setValue(cartName);

}

function getDate() {
    return new Date();
}