import axios from "axios"

interface Service {
    id: number
    name: string
    price: string
    custom_price: string
    discount: string
    currency: string
    delivery_time: number
    delivery_range: { min: number, max: number }
    custom_delivery_time: number
    custom_delivery_range: { min: number, max: number }
    packages: {
        price: string
        discount: string
        format: string
        dimensions: { height: number, width: number, length: number }
        weight: string
        insurance_value: string
        products: { id: string, quantity: number }[]
    }[]
    additional_services: { receipt: boolean, own_hand: boolean, collect: boolean }
    company: { id: number, name: string, picture: string }
}

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

const calculateShipping = async(address: string) => {
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

        const services: Service[] = response.data

        return services.filter(
            service => (service.name === "PAC" && !isNaN(Number(service.price))) || (service.name === "SEDEX" && !isNaN(Number(service.price)))
        )
    } catch (error) {
        return
    }
}

export default calculateShipping
