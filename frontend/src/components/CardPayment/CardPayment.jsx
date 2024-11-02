// CSS
import React from 'react'

// Modules
import { CardPayment } from '@mercadopago/sdk-react'

const CardPayment = ({ amount }) => {
    const onSubmit = async(formData) => {
        console.log(formData)
    }

    const onError = async(error) => {
        console.log(error);
    }

    const onReady = async() => {
        console.log("Ready")
    }

    return (
        <div>
            <CardPayment
                initialization={{ amount }}
                onSubmit={onSubmit}
                onReady={onReady}
                onError={onError}
            />
        </div>
    )
}

export default CardPayment
