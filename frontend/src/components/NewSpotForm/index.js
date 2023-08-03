import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NewSpotForm.css'
import { thunkCreateSpot, thunkUpdateSpot, thunkCreateImage, thunkGetSpot } from '../../store/spots';
import { login } from '../../store/session';
import { useEffect } from 'react';


const NewSpotForm = ({ spot }) => {
    const history = useHistory();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image1, setImage1] = useState('')
    const [image2, setImage2] = useState('')
    const [image3, setImage3] = useState('')
    const [image4, setImage4] = useState('')
    const [image5, setImage5] = useState('')
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const spotData = { country, address, city, state, price, description, name, SpotImages: [] };
        try {
            let img1 = { ["url"]: image1, ["preview"]: 1 }
            let img2 = { ["url"]: image2, ["preview"]: 0 }
            let img3 = { ["url"]: image3, ["preview"]: 0 }
            let img4 = { ["url"]: image4, ["preview"]: 0 }
            let img5 = { ["url"]: image5, ["preview"]: 0 }
            const newSpot = await dispatch(thunkCreateSpot(spotData));
            if (newSpot.id) {
                await dispatch(thunkCreateImage(newSpot.id, img1));
                await dispatch(thunkCreateImage(newSpot.id, img2));
                await dispatch(thunkCreateImage(newSpot.id, img3));
                await dispatch(thunkCreateImage(newSpot.id, img4));
                await dispatch(thunkCreateImage(newSpot.id, img5));
                await dispatch(thunkGetSpot(newSpot.id));
            }
            if (newSpot.id) {
                history.push(`/spots/${newSpot.id}`);
            }
        } catch (error) {
            const data = await error.json();
            if (data && data.errors) {
                const newErrors = {};
                if (data.errors.country) {
                    newErrors.country = 'Country is required';
                }
                if (data.errors.city) {
                    newErrors.city = 'City is required';
                }
                if (data.errors.address) {
                    newErrors.address = 'Address is required';
                }
                if (data.errors.price) {
                    newErrors.price = 'Price must be above $0.00';
                }
                if (data.errors.state) {
                    newErrors.state = 'State is required';
                }
                if (data.errors.description) {
                    newErrors.description = 'Description needs a minimum of 30 characters';
                }
                if (data.errors.name) {
                    newErrors.name = 'Name cannot be empty';
                }
                if (!image1) {
                    newErrors.previewImg = 'Preview Image required'
                }
                setErrors(newErrors);
                console.log("ERRORS HERE: ", newErrors);
            }
        }
    };

    return (
        <>
            <div className='createSpotContainer'>
                <div className='createSpotFormDiv'>
                    <div id='createSpotHeader'>
                        <a className='createSpotHeaderText'>Create a new Spot</a>
                        <a className='createSpotHeaderSecondaryText'>Where's your place located?</a>
                        <a className='createSpotHeaderTertiaryText'>Guests will only get your exact address once they booked a reservation.</a>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div id='createSpotCountry'>
                                <label className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.country && <p className='newSpotError'><p className='newSpotErrorNotNormal'>Country</p> {errors.country}</p>}
                                        {!errors.country && <p className='newSpotErrorNormal'>Country</p>}
                                    </div>
                                    <input type="text" placeholder='Country' value={country} onChange={e => setCountry(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotStreet'>
                                <label className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors?.address && <p className='newSpotError'><p className='newSpotErrorNotNormal'>Street Address</p> {errors?.address}</p>}
                                        {!errors?.address && <p className='newSpotErrorNormal'>Street Address</p>}
                                    </div>
                                    <input type='text' placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotCityState'>
                                <div className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.city && <p className='newSpotError'><p className='newSpotErrorNotNormal'>City</p> {errors.city}</p>}
                                        {!errors.city && <p className='newSpotErrorNormal'>City</p>}
                                    </div>
                                    <input
                                        className='inputExc' type='text' placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.state && <p className='newSpotError'><p className='newSpotErrorNotNormal'>State</p> {errors.state}</p>}
                                        {!errors.state && <p className='newSpotErrorNormal'>State</p>}
                                    </div>
                                    <input type='text' className='inputExc' placeholder='State' value={state} onChange={e => setState(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Describe your place to guests</a>
                            <a className='createSpotHeaderTertiaryText'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</a>
                            <textarea placeholder='Please write at least 30 characters' value={description} onChange={e => setDescription(e.target.value)} />
                            <div className='newSpotErrorDiv'>
                                {errors.description && <p id='descripErr'>{errors.description}</p>}
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Create a title for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Catch guests' attention with a spot title that highlights what makes your place special.</a>
                            <input type='text' placeholder='Name of your spot' value={name} onChange={e => setName(e.target.value)} />
                            <div className='newSpotErrorDiv'>
                                {errors.name && <p id='descripErr'>{errors.name}</p>}
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Set a base price for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Competitive pricing can help your listing stand out and rank higher in search results.</a>
                            <div className='createSpotHeaderTertiaryText'>
                                <div id='createSpotPrice'>
                                    <a id='moneySign'>$</a>
                                    <input type='number' placeholder='Price per night (USD)' value={price} onChange={e => setPrice(e.target.value)} />
                                </div>
                                <div className='newSpotErrorDiv'>
                                    {errors.price && <p id='descripErr'>{errors.price}</p>}
                                </div>
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Liven up your spot with photos</a>
                            <a className='createSpotHeaderTertiaryText'>Submit a link to at least one photo to publish your spot.</a>
                            <div className='createSpotImageURLDiv'>
                                {errors.previewImg && <p id='descripErr'>{errors.previewImg}</p>}
                                <input
                                    type="text"
                                    placeholder="Preview Image"
                                    value={image1}
                                    onChange={(e) => setImage1(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image2}
                                    onChange={(e) => setImage2(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image3}
                                    onChange={(e) => setImage3(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image4}
                                    onChange={(e) => setImage4(e.target.value)}
                                />
                                <input
                                    type="text"
                                    placeholder="Image URL"
                                    value={image5}
                                    onChange={(e) => setImage5(e.target.value)}
                                />
                            </div>
                            <hr />
                            <div id='createNewSpotSubmitButtonDiv'>
                                <button id='createNewSpotSubmitButton' type="submit">Create Spot</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewSpotForm;