import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Header from "../pages/Header";
import { MemoryRouter } from "react-router-dom";
import userEvent from '@testing-library/user-event';



describe("Header tests", () => {

    beforeEach(() => {
        render(<MemoryRouter><Header /></MemoryRouter>)
    })

    afterEach(() => {
        vi.clearAllMocks()
        cleanup()
    })

    it("Should render header", () => {
        const h1 = screen.queryByText("Fullstack1")

        expect(h1).not.toBeNull()
    })

    it("Should show login button", () => {
        const button = screen.getByText("Login")

        expect(button).not.toBeNull()
    })

    it("Should show register button", () => {
        const button = screen.queryByText("Register")

        expect(button).not.toBeNull()
    })

    it("Should navigate to login page on login button click", async () => {
        const button = screen.queryByText("Login")
        expect(button).toBeDefined()

        await userEvent.click(button as HTMLElement)
        expect(screen.findByText("Email")).toBeDefined()
    })

    it("Should navigate to register page on register button click", async () => {
        const button = screen.queryByText("Register")
        expect(button).toBeDefined()

        await userEvent.click(button as HTMLElement)
        expect(screen.findByText("Username")).toBeDefined()
    })
})