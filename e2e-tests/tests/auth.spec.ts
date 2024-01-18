import { test, expect } from '@playwright/test';

const UI_URL="http://localhost:5173/"

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the signin button
  await page.getByRole("link",{name:"Sign In"}).click();

  await expect(page.getByRole("heading",{name : "Sign In"})).toBeVisible();

  await page.locator("[name=email]").fill("sanju@gmail.com");
  await page.locator("[name=password]").fill("password123");

  await page.getByRole("button",{name:"Login"}).click();

  await expect(page.getByText("Login Successfully")).toBeVisible();
  await expect(page.getByRole("link",{name:"My Bookings"})).toBeVisible();
  await expect(page.getByRole("link",{name:"My Hotels"})).toBeVisible();
  await expect(page.getByRole("button",{name : "Logout"})).toBeVisible();
});

test('shoul allow user to register', async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link",{name:"Sign In"}).click();
  await page.getByRole("link", { name: "Create an account here" }).click();

  await expect(page.getByRole("heading", { name: "Create an Account" })).toBeVisible();

  await page.locator("[name=firstName]").fill("test_firstName");
  await page.locator("[name=lastName]").fill("test_lastName");
  await page.locator("[name=email]").fill("test@gmail.com");
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  await page.getByRole("button",{name:"Create Account"}).click();

  await expect(page.getByText("Registration Successfully")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Logout" })).toBeVisible();
});
