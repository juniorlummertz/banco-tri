import { test, expect } from "@playwright/test"

test("lançamento do FinUp persiste sem alterar o extrato do Banco TRI", async ({ page }) => {
  await page.goto("/dashboard")
  await expect(page.getByRole("heading", { name: "Olá, Junior Lummertz" })).toBeVisible()
  await expect(page.getByText("Supermercado")).toBeVisible()

  await page.getByRole("link", { name: "FinUp" }).click()
  await expect(page.getByRole("heading", { name: "Visão financeira" })).toBeVisible()
  await page.getByLabel("Descrição").fill("Despesa de teste")
  await page.getByLabel("Valor (R$)").fill("12.50")
  await page.getByRole("button", { name: "Adicionar lançamento" }).click()
  await expect(page.getByText("Lançamento adicionado ao FinUp.")).toBeVisible()
  await expect(page.getByText("Despesa de teste")).toBeVisible()

  await page.reload()
  await expect(page.getByText("Despesa de teste")).toBeVisible()
  await page.getByRole("link", { name: "Início" }).click()
  await expect(page.getByRole("heading", { name: "Olá, Junior Lummertz" })).toBeVisible()
  await expect(page.getByText("Supermercado")).toBeVisible()
  await expect(page.getByText("Despesa de teste")).toHaveCount(0)
})
