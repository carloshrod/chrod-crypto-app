export default function currencyFormatter(value) {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        minimumFractionDigits: 2,
        currency: 'USD'
    })
    return formatter.format(value)
}
