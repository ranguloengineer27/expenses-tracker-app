import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "../utility-components/AlertDialog";
import type { FC } from "react";

type SignUpConfirmationModalProps = {
    open: boolean;
}
export const SignUpConfirmationModal: FC<SignUpConfirmationModalProps> = ({ open }) => (
    <AlertDialog open={open} data-testid="signup-confirmation">
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Email confirmation</AlertDialogTitle>
                <AlertDialogDescription>
                    We sent you a confirmation email, please check your email
                </AlertDialogDescription>
            </AlertDialogHeader>
        </AlertDialogContent>
    </AlertDialog>
)