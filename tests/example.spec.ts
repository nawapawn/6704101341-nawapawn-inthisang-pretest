import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:9000/#/'; // URL จริงของคุณ

test.beforeEach(async ({ page }) => {
  await page.goto(BASE_URL);
});

test('successful submit shows success notify', async ({ page }) => {
  // กรอกข้อมูลฟิลด์ name
  await page.getByLabel('Your name *').fill('ชมพู่');

  // กรอกอายุ
  await page.getByLabel('Your age *').fill('25');

  // ติ๊ก accept toggle
  const toggle = page.getByLabel('I accept the license and terms');
  if (!(await toggle.isChecked?.())) {
    await toggle.click();
  }

  // กดปุ่ม submit
  await page.getByRole('button', { name: 'Submit' }).click();

  // รอให้ notification ปรากฏ
  const notification = page.locator('.q-notification');
  await notification.waitFor({ state: 'visible' });

  // ตรวจสอบข้อความ
  await expect(notification).toContainText('Submitted');
});
