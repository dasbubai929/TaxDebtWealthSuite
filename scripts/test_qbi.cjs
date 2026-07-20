const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleLogs = [];
  const consoleErrors = [];

  page.on('console', msg => {
    consoleLogs.push(`[${msg.type()}] ${msg.text()}`);
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
  });

  console.log('Navigating to Home Page http://localhost:4321/ ...');
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });

  const qbiHeaderNavVisible = await page.isVisible('nav a[href="/qbi-deduction-calculator/"]');
  const qbiCardVisible = await page.isVisible('a[href="/qbi-deduction-calculator/"]:has-text("Try QBI Deduction Calculator")');
  console.log('Homepage QBI Header Nav Link Visible:', qbiHeaderNavVisible);
  console.log('Homepage QBI Card Visible:', qbiCardVisible);

  console.log('Navigating to http://localhost:4321/qbi-deduction-calculator/ via Header link ...');
  await page.click('nav a[href="/qbi-deduction-calculator/"]');
  await page.waitForLoadState('networkidle');

  const title = await page.title();
  console.log('Page Title:', title);

  const scratchDir = 'C:/Users/user/.gemini/antigravity/brain/d4ea5690-f071-4c6a-b106-8568307d495d/scratch';
  if (!fs.existsSync(scratchDir)) {
    fs.mkdirSync(scratchDir, { recursive: true });
  }

  const autoSaveBtnVisible = await page.isVisible('#toggle-autosave');
  const resetBtnVisible = await page.isVisible('#reset-state');
  console.log('Header Auto-Save Button Visible:', autoSaveBtnVisible);
  console.log('Header Reset Button Visible:', resetBtnVisible);

  // Initial screenshot
  await page.screenshot({ path: path.join(scratchDir, 'qbi_initial.png'), fullPage: true });
  console.log('Saved initial screenshot.');

  // Check initial calculation output ($0)
  let deduction = await page.textContent('#qbi-result-deduction');
  let savings = await page.textContent('#qbi-result-savings');
  let overallLimit = await page.textContent('#qbi-result-overall-limit');
  let limitation = await page.textContent('#qbi-result-limitation');

  console.log('\nInitial State:');
  console.log(' - Deduction:', deduction);
  console.log(' - Savings:', savings);
  console.log(' - Overall Limit:', overallLimit);
  console.log(' - Limitation:', limitation);

  // Test Case 1: Simple below threshold calculation
  console.log('\n--- Test Case 1: Single, Income $100,000, QBI $80,000 ---');
  await page.selectOption('#qbi-filing-status', 'single');
  await page.fill('#qbi-taxable-income', '100000');
  await page.fill('#qbi-amount', '80000');
  await page.fill('#qbi-marginal-rate', '24');

  await page.waitForTimeout(300);

  deduction = await page.textContent('#qbi-result-deduction');
  savings = await page.textContent('#qbi-result-savings');
  overallLimit = await page.textContent('#qbi-result-overall-limit');
  limitation = await page.textContent('#qbi-result-limitation');

  console.log('Test 1 Results:');
  console.log(' - Deduction:', deduction, '(Expected: $16,000)');
  console.log(' - Savings:', savings, '(Expected: $3,840)');
  console.log(' - Overall Limit:', overallLimit, '(Expected: $20,000)');
  console.log(' - Limitation:', limitation);

  await page.screenshot({ path: path.join(scratchDir, 'qbi_test1.png') });

  // Test Case 2: Above threshold phase-in / W-2 wage limit
  console.log('\n--- Test Case 2: MFJ, Taxable Income $500,000, QBI $300,000, W2 Wages $40,000, UBIA $0 ---');
  await page.selectOption('#qbi-filing-status', 'mfj');
  await page.fill('#qbi-taxable-income', '500000');
  await page.fill('#qbi-amount', '300000');
  await page.fill('#qbi-w2-wages', '40000');
  await page.fill('#qbi-ubia', '0');

  await page.waitForTimeout(300);

  deduction = await page.textContent('#qbi-result-deduction');
  savings = await page.textContent('#qbi-result-savings');
  overallLimit = await page.textContent('#qbi-result-overall-limit');
  limitation = await page.textContent('#qbi-result-limitation');
  const bannerVisible = await page.isVisible('#qbi-warning-banner:not(.hidden)');

  console.log('Test 2 Results:');
  console.log(' - Deduction:', deduction, '(Tentative $60,000, W2 wage limit 50% * $40k = $20,000 => Expected $20,000)');
  console.log(' - Savings:', savings);
  console.log(' - Limitation:', limitation);
  console.log(' - Warning Banner Visible:', bannerVisible);

  await page.screenshot({ path: path.join(scratchDir, 'qbi_test2.png') });

  // Test Case 3: SSTB Toggle
  console.log('\n--- Test Case 3: Toggle SSTB ON for High Income ---');
  await page.click('#qbi-sstb-toggle');
  await page.waitForTimeout(300);

  deduction = await page.textContent('#qbi-result-deduction');
  limitation = await page.textContent('#qbi-result-limitation');

  console.log('Test 3 Results (SSTB On):');
  console.log(' - Deduction:', deduction, '(Expected: $0 for high income SSTB)');
  console.log(' - Limitation:', limitation);

  await page.screenshot({ path: path.join(scratchDir, 'qbi_test3_sstb.png') });

  console.log('\n--- Console Logs Summary ---');
  console.log('Console Logs count:', consoleLogs.length);
  console.log('Console Errors count:', consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.error('Console Errors:', consoleErrors);
  }

  await browser.close();
  console.log('Done testing.');
})();
