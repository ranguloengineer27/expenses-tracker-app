export const isStrongPassword = (value: string): boolean => {
    const lengthOk = value.length >= 8;
    const hasLower = /[a-z]/.test(value);
    const hasUpper = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);
    return lengthOk && hasLower && hasUpper && hasNumber && hasSpecial;
};


