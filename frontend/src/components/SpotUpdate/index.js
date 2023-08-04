import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpot, thunkUpdateSpot } from '../../store/spots';



const SpotUpdate = () => {
    const history = useHistory();
    const { spotId } = useParams()
    const spot = useSelector((state) => state?.spots[spotId])
    const [country, setCountry] = useState(spot?.country)
    const [address, setAddress] = useState(spot?.address)
    const [city, setCity] = useState(spot?.city)
    const [state, setState] = useState(spot?.state)
    const [price, setPrice] = useState(spot?.price)
    const [name, setName] = useState(spot?.name)
    const [description, setDescription] = useState(spot?.description)

    const [errors, setErrors] = useState({})
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [])

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newSpot = { id: spotId, country, address, city, state, price, description, name };
        // console.log('SPOT:', newSpot);
        if (newSpot) {
            setErrors({});
            try {
                const spot = await dispatch(thunkUpdateSpot(newSpot));
                history.push(`/spots/${spot.id}`);
            } catch (error) {
                const data = await error.json();
                if (data && data.errors) {
                    if (data.errors.city) {
                        data.errors.city = 'City is required';
                    }
                    if (data.errors.state) {
                        data.errors.state = 'State required (VT/Vermont)';
                    }
                    if (data.errors.description) {
                        data.errors.description = 'Description needs a minimum of 30 characters';
                    }
                    if (data.errors.name) {
                        data.errors.name = 'Name cannot be empty';
                    }
                    setErrors(data.errors);
                    // console.log("ERRORS HERE: ", data.errors);
                }
            }
        }
    };


    return (
        <>
            {spot && <div className='createSpotContainer'>
                <div className='createSpotFormDiv'>
                    <div id='createSpotHeader'>
                        <a className='createSpotHeaderText'>Update your Spot</a>
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
                                    <input type="text" placeholder='Country' value={spot && country} onChange={e => setCountry(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotStreet'>
                                <label className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.address && <p className='newSpotError'><p className='newSpotErrorNotNormal'>Street Address</p> {errors.address}</p>}
                                        {!errors.address && <p className='newSpotErrorNormal'>Street Address</p>}
                                    </div>
                                    <input type='text' placeholder='Address' value={spot && address} onChange={e => setAddress(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotCityState'>
                                <div className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.city && <p className='newSpotError'><p className='newSpotErrorNotNormal'>City</p> {errors.city}</p>}
                                        {!errors.city && <p className='newSpotErrorNormal'>City</p>}
                                    </div>
                                    <input
                                        className='inputExc' type='text' placeholder='City' value={spot && city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div className='createSpotHeaderTertiaryText'>
                                    <div className='newSpotErrorDiv'>
                                        {errors.state && <p className='newSpotError'><p className='newSpotErrorNotNormal'>State</p> {errors.state}</p>}
                                        {!errors.state && <p className='newSpotErrorNormal'>State</p>}
                                    </div>
                                    <input type='text' className='inputExc' placeholder='State' value={spot && state} onChange={e => setState(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Describe your place to guests</a>
                            <a className='createSpotHeaderTertiaryText'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</a>
                            <textarea placeholder='Please write at least 30 characters' value={spot && description} onChange={e => setDescription(e.target.value)} />
                            <div className='newSpotErrorDiv'>
                                {errors.description && <p id='descripErr'>{errors.description}</p>}
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Create a title for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Catch guests' attention with a spot title that highlights what makes your place special.</a>
                            <input type='text' placeholder='Name of your spot' value={spot && name} onChange={e => setName(e.target.value)} />
                            <div className='newSpotErrorDiv'>
                                {errors.name && <p id='descripErr'>{errors.name}</p>}
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Set a base price for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Competitive pricing can help your listing stand out and rank higher in search results.</a>
                            <div className='createSpotHeaderTertiaryText'>
                                <div id='createSpotPrice'>
                                    <a id='moneySign'>$</a>
                                    <input type='number' placeholder='Price per night (USD)' value={spot && price} onChange={e => setPrice(e.target.value)} />
                                </div>
                                <div className='newSpotErrorDiv'>
                                    {errors.price && <p id='descripErr'>{errors.price}</p>}
                                </div>
                            </div>
                            <hr />
                            <div id='createNewSpotSubmitButtonDiv'>
                                <button id='createNewSpotSubmitButton' type="submit" >Update Spot</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default SpotUpdate;


