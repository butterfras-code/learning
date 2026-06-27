const SHEET_ID = '1Ofw9JNH8mOFKwmS72QTMzRRz98rNXarvet3NQEeL9Go';
const SHEET_NAME = 'Survey Responses';

const HEADERS = [
  'submittedAt',
  'havingFun',
  'unhappyNote',
  'eventDifficulty',
  'eventGenreMix',
  'walkthroughs',
  'favoriteStyles',
  'attendeeType',
  'lessonDifficulty',
  'lessonGenreMix',
  'lessonPacing',
  'visitorHomeScene',
  'visitorHowHeard',
  'visitorNotes',
  'rawJson'
];

function doPost(e) {
  try {
    const payload = JSON.parse((e && e.postData && e.postData.contents) || '{}');
    saveSurvey(payload);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function saveSurvey(payload) {
  if (!payload || !Object.prototype.hasOwnProperty.call(payload, 'havingFun')) {
    throw new Error('Missing required field: havingFun');
  }

  if (!payload.submittedAt) {
    payload.submittedAt = new Date().toISOString();
  }

  const sheet = getOrCreateSheet_();
  ensureHeaders_(sheet);
  sheet.appendRow(toRow_(payload));

  return { ok: true };
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.openById(SHEET_ID);
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function ensureHeaders_(sheet) {
  const range = sheet.getRange(1, 1, 1, HEADERS.length);
  const currentHeaders = range.getValues()[0];
  const hasHeaders = currentHeaders.some(Boolean);

  if (!hasHeaders) {
    range.setValues([HEADERS]);
    sheet.setFrozenRows(1);
  }
}

function toRow_(payload) {
  return HEADERS.map((header) => {
    if (header === 'rawJson') return JSON.stringify(payload);

    const value = payload[header];
    if (Array.isArray(value)) return value.join(', ');
    if (value === null || value === undefined) return '';
    return value;
  });
}
