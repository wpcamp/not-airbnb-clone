import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { thunkCreateSpot, thunkGetSpot, thunkUpdateSpot } from '../../store/spots';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

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
    },[])

    useEffect(() => {
        dispatch(thunkGetSpot(spotId))
    }, [dispatch, spotId])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrors({});
        const newSpot = { id: spotId, country, address, city, state, price, description, name }
        const spot = await dispatch(thunkUpdateSpot(newSpot))
        if (spot.errors) {
                setErrors(spot.errors);
            } else {
            history.push(`/spots/${spot.id}`)
        }
    }
    return (
        <>
            <div className='createSpotContainer'>
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
                                    Country
                                    <input type="text" placeholder='Country' value={spot && country} onChange={e => setCountry(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotStreet'>
                                <label className='createSpotHeaderTertiaryText'>
                                    Street Address
                                    <input type='text' placeholder='Address' value={spot && address} onChange={e => setAddress(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotCityState'>
                                <div className='createSpotHeaderTertiaryText'>
                                    <label>City</label>
                                    <input
                                        className='inputExc' type='text' placeholder='City' value={spot && city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div className='createSpotHeaderTertiaryText'>
                                    <label>State</label>
                                    <input type='text' className='inputExc' placeholder='State' value={spot && state} onChange={e => setState(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Describe your place to guests</a>
                            <a className='createSpotHeaderTertiaryText'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</a>
                            <textarea placeholder='Please write at least 30 characters' value={spot && description} onChange={e => setDescription(e.target.value)} />
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Create a title for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Catch guests' attention with a spot title that highlights what makes your place special.</a>
                            <input type='text' placeholder='Name of your spot' value={spot && name} onChange={e => setName(e.target.value)} />
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Set a base price for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Competitive pricing can help your listing stand out and rank higher in search results.</a>
                            <div className='createSpotHeaderTertiaryText'>
                                <div id='createSpotPrice'>
                                    <a id='moneySign'>$</a>
                                    <input type='number' placeholder='Price per night (USD)' value={spot && price} onChange={e => setPrice(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <div id='createNewSpotSubmitButtonDiv'>
                                <button id='createNewSpotSubmitButton' type="submit" >Update Spot</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};



export default SpotUpdate;


