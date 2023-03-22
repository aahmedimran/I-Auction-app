export const passwordValidate=(password)=> {
    return /[A-Z]/.test(password) && /[0-9]/.test(password) && !/[aeiou]/.test(password);
}