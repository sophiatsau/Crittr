import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { thunkUpdateBag } from '../../store/orderDetails'
import { useModal } from '../../context/Modal'

export default function DetailEditForm({detail}) {
    const dispatch = useDispatch()
    const {closeModal} = useModal()
    const critter = useSelector(state => state.critters[detail.critterId])
    const [quantity, setQuantity] = useState(detail.quantity)

    const updateQuantity = (e) => {
        setQuantity(Math.floor(e.target.value))
    }

    const newPrice = (Math.round(100 * quantity * critter.price) / 100)

    const handleFormSubmit = e => {
        e.preventDefault()

        const formData = {
            id: detail.id,
            critterId: detail.critterId,
            quantity,
        }

        dispatch(thunkUpdateBag(formData))
        closeModal()
    }

    return (
    <form className="bag-detail-form" onSubmit={handleFormSubmit}>
        <div className='bag-detail-form-content'>
            {critter.previewImageUrl && <img src={critter.previewImageUrl} alt={critter.name}/>}
            <h1>{critter.name} </h1>
            <p className="species" >{critter.species}</p>
            <p>{critter.description}</p>
            <div className='thin-light-border' />
            <label>
                Quantity:
                <input
                    type="number"
                    min={1}
                    max={critter.stock}
                    value={quantity}
                    onChange={updateQuantity}
                />
            </label>
            <p className="species" >{critter.stock} left in stock</p>
        </div>
        <button className='purple-button modal-button'>Update: {newPrice.toFixed(2)}</button>
    </form>
  )
}
