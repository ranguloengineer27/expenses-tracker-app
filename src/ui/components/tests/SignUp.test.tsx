import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SignUp } from "../auth/SignUp";

vi.mock("../auth/SignUpConfirmationModal", () => ({
    SignUpConfirmationModal: ({ open }: { open: boolean }) =>
        open ? <div data-testid="signup-confirmation">Confirmation</div> : null,
}));

const signUpMock = vi.fn(async () => { });
vi.mock("../../stores/useAuthStore", () => ({
    useAuthStore: () => ({
        signUp: signUpMock,
    }),
}));

describe("SignUp", () => {
    const getEmail = () => screen.getByPlaceholderText("Email");
    const getPassword = () => screen.getByPlaceholderText("Password");
    const getConfirm = () => screen.getByPlaceholderText("Confirm password");
    const getButton = () => screen.getByRole("button", { name: /sign up/i });

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("shows error for weak password", async () => {
        render(<SignUp />);
        await userEvent.type(getEmail(), "user@example.com");
        // weak: missing uppercase, number, special
        await userEvent.type(getPassword(), "weakpass");
        await userEvent.type(getConfirm(), "weakpass");
        await userEvent.click(getButton());

        expect(
            screen.getByText(
                /Password must be at least 8 chars and include upper, lower, number, and special/i
            )
        ).toBeInTheDocument();
    });

    it("shows error when passwords do not match", async () => {
        render(<SignUp />);
        await userEvent.type(getEmail(), "user@example.com");
        // strong base
        await userEvent.type(getPassword(), "Str0ngPass!");
        await userEvent.type(getConfirm(), "Str0ngPass!!");
        await userEvent.click(getButton());

        expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
    });

    it("calls signUp and opens confirmation for valid inputs", async () => {
        signUpMock.mockClear();
        render(<SignUp />);
        await userEvent.type(getEmail(), "user@example.com");
        await userEvent.type(getPassword(), "Str0ngPass!");
        await userEvent.type(getConfirm(), "Str0ngPass!");
        await userEvent.click(getButton());

        expect(signUpMock).toHaveBeenCalledWith("user@example.com", "Str0ngPass!");
        expect(screen.getByTestId("signup-confirmation")).toBeInTheDocument();
    });
});


