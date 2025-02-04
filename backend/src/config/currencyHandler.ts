const currencyHandler = (currency: string) => {
    // Removes unnecessary values
    const input = currency.toString().replace(/[\s()\-]/g, "").replace(/\D/g, "").replace(/^0/, "")

    if (input.length <= 2) {
        return parseFloat(`0.${input.padStart(2, "0")}`)
    }

    const decimal = input.slice(0, -2)
    const integer = input.slice(-2)

    return parseFloat(`${decimal}.${integer}`)
}

export default currencyHandler
