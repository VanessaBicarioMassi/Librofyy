export function isPhoneValid(phone: string): boolean {
    // Regex para validar o telefone no formato +55 (XX) XXXXX-XXXX ou (XX) XXXXX-XXXX
    const regex = /^(?:\+55\s?)?(\(\d{2}\)\s?)?9\d{4}-\d{4}$|^\(\d{2}\)\s?\d{4}-\d{4}$/;

    return regex.test(phone);
}
