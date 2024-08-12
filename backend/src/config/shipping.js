const axios = require("axios")

// Creates the axios config
const shipping = axios.create({
    baseURL: "https://www.melhorenvio.com.br/api/v2/me",
    headers: {
        'Accept': 'Application/json',
        'Authorization': `Bearer ${process.env.MELHOR_ENVIO_TOKEN}`,
        'Content-Type': 'application/json',
        'User-Agent': 'Aplicação contatonkfa@gmail.com',
    },
})

const calculateShipping = async(address, type = undefined) => {
    // Sanitize the given address
    const sanitizedAddress = address.replace("-", "")

    // Prepares the default data
    const data = {
        from: { postal_code: process.env.DEFAULT_CEP },
        to: { postal_code: sanitizedAddress},
        package: {
            "height": 4,
            "width": 12,
            "length": 17,
            "weight": 0.3,
        },
    }

    try {
        const response = await shipping.post("/shipment/calculate", data)

        const services = response.data

        if (type === undefined) {
            return services.filter(service => service.name === "PAC" || service.name === "Sedex")
        } else if (type !== undefined) {
            return services.find(service => service.name === "PAC")
        }
    } catch (error) {
        return
    }
}

module.exports = calculateShipping
