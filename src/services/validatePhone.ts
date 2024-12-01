export function isPhoneValid(phone: string): boolean {
    const regex = /^(?:\+55\s?)?(\(\d{2}\)\s?)?9\d{4}-\d{4}$|^\(\d{2}\)\s?\d{4}-\d{4}$/;

    return regex.test(phone);
}
