export const formatCurrency = (value: string) => {
    if (!value) return "";

    // remove all dots (in case of paste)
    value = value.replace(/\./g, "");

    const [intPart, decPart] = value.split(",");

    // format thousand separator
    const formattedInt = intPart
        .replace(/^0+(?=\d)/, "") // remove leading zeros
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    // limit decimal to 3 digits
    const formattedDec =
        decPart !== undefined
            ? "," + decPart.slice(0, 3)
            : "";

    return formattedInt + formattedDec;
};

export const printIDR = (value: string | number) => {
    if (!value) return "";

    const nominal = formatCurrency(String(value));
    return `IDR ${nominal}`;
}