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

const calculateShipping = async(address) => {
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

        return services.filter(service => (service.name === "PAC" && !isNaN(service.price)) || (service.name === "SEDEX" && !isNaN(service.price)))
    } catch (error) {
        return
    }
}

module.exports = calculateShipping
