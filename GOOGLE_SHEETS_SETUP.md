# 📊 Google Sheets Contact Form Setup Guide

This guide will help you set up Google Sheets to receive contact form submissions from your website.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Website Contact Form Submissions"
4. In the first row, add these column headers:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Phone`
   - E1: `Message`

## Step 2: Create Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Paste this code:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter;
    
    // Add new row with form data
    sheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.name || '',
      params.email || '',
      params.phone || '',
      params.message || ''
    ]);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success', 'row': sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 'result': 'success', 'message': 'GET requests are not supported. Please use POST.' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

4. Click **Save** (💾 icon)
5. Name your project (e.g., "Contact Form Handler")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Contact Form API" (or any name)
   - **Execute as**: **Me** (your email)
   - **Who has access**: **Anyone**
5. Click **Deploy**
6. Review permissions:
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [Your Project Name] (unsafe)**
   - Click **Allow**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/XXXXXXXXXXXXXXX/exec
   ```

## Step 4: Update Your Website Code

1. Open `src/app/components/contact/contact.component.ts`
2. Find this line:
   ```typescript
   googleScriptUrl = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace it with your Web App URL:
   ```typescript
   googleScriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
4. Save the file

## Step 5: Test the Form

1. Build and run your website:
   ```bash
   npm start
   ```
2. Fill out the contact form and submit
3. Check your Google Sheet - a new row should appear with the submission data!

## 📧 Optional: Email Notifications

If you want to receive email notifications for each submission, add this to your Apps Script:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var params = e.parameter;
    
    // Add new row with form data
    sheet.appendRow([
      params.timestamp || new Date().toISOString(),
      params.name || '',
      params.email || '',
      params.phone || '',
      params.message || ''
    ]);
    
    // Send email notification
    var emailBody = 
      'New Contact Form Submission\n\n' +
      'Name: ' + params.name + '\n' +
      'Email: ' + params.email + '\n' +
      'Phone: ' + params.phone + '\n' +
      'Message: ' + params.message + '\n\n' +
      'Submitted: ' + (params.timestamp || new Date().toISOString());
    
    MailApp.sendEmail({
      to: 'your-email@example.com', // Replace with your email
      subject: '🔔 New Contact Form Submission from ' + params.name,
      body: emailBody
    });
    
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 'result': 'error', 'error': error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

Replace `'your-email@example.com'` with your actual email address.

## 🔒 Security Notes

- The Apps Script runs with your Google account permissions
- Only the specific data you send is stored (name, email, phone, message)
- The script URL is public but can only add data to your sheet
- You can revoke access anytime from [Google Apps Script Dashboard](https://script.google.com)

## 🐛 Troubleshooting

**Form not submitting?**
- Check browser console for errors
- Verify the Google Script URL is correct
- Make sure deployment is set to "Anyone" access

**Data not appearing in sheet?**
- Check the Apps Script execution logs: **Apps Script Editor** → **Executions**
- Verify column headers match exactly: Timestamp, Name, Email, Phone, Message

**Getting CORS errors?**
- This is normal! The form will still work, you just won't see the response
- The data is being saved to Google Sheets successfully

## ✅ Done!

Your contact form is now connected to Google Sheets. All submissions will be automatically saved and organized in your spreadsheet! 🎉
