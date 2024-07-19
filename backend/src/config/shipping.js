const axios = require("axios")

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
    const data = {
        from: { postal_code: "87005100" },
        to: { postal_code: address},
        package: {
            "height": 4,
            "width": 12,
            "length": 17,
            "weight": 0.3,
        },
    }

    try {
        const response = await shipping.post("/shipment/calculate", data)
        return response
    } catch (error) {
        return
    }
}

module.exports = calculateShipping
