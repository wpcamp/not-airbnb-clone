import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NewSpotForm.css'
import { thunkCreateSpot } from '../../store/spots';
import { login } from '../../store/session';


const NewSpotForm = ({ spot }) => {
    const history = useHistory();
    const [country, setCountry] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [price, setPrice] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [title, setTitle] = useState('')
    const [imageURLs, setImageURLs] = useState(['', '', '', '', ''])
    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const spotData = { country, address, city, state, price, description, name, imageURLs };

        if (spotData) {
            setErrors({});
            try {
                const newSpot = await dispatch(thunkCreateSpot(spotData));
                history.push(`/spots/${newSpot.id}`);
            } catch (error) {
                const data = await error.json();
                if (data && data.errors) {
                    if (data.errors.city) {
                        data.errors.city = 'City is required'
                    }
                    if (data.errors.state) {
                        data.errors.state = 'State is required'
                    }
                    if (data.errors.description) {
                        data.errors.description = 'Description needs a minimum of 30 characters'
                    }
                    if (data.errors.name) {
                        data.errors.name = 'Name cannot be empty'
                    }
                    setErrors(data.errors);
                    console.log("ERRORS HERE: ", errors);
                }
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
                                        {errors.address && <p className='newSpotError'><p className='newSpotErrorNotNormal'>Street Address</p> {errors.address}</p>}
                                        {!errors.address && <p className='newSpotErrorNormal'>Street Address</p>}
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
                                {/* refactor this code */}
                                {imageURLs.map((url, index) => (
                                    <input
                                        key={index}
                                        type='text'
                                        placeholder='Image URL'
                                        value={url}
                                        onChange={(e) => {
                                            const newImageURLs = [...imageURLs];
                                            newImageURLs[index] = e.target.value;
                                            setImageURLs(newImageURLs);
                                        }}
                                    />
                                ))}
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
};

export default NewSpotForm;