import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './NewSpotForm.css'
import { thunkCreateSpot } from '../../store/spots';


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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors({});
    //     const newSpot = { country, address, city, state, price, description, name, imageURLs }
    //     const res = await dispatch(thunkCreateSpot(newSpot))
    //     console.log('RES:', res);

    //     if (res.ok) {
    //         const spot = await res.json()
    //         console.log('SPOT', spot)
    //         history.push(`/spots/${spot.id}`)
    //     } else {
    //         const data = await res.json()
    //         console.log('data', data)
    //         setErrors(data.errors);
    //         console.log('ERRORS', data)
    //         return
    //     }
    // }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setErrors({});
    //     spot = { country, address, city, state, price, description, name, imageURLs }
    //     const newSpot = await dispatch(thunkCreateSpot(spot))
    //     spot = newSpot
    //     console.log('SPOT OK HERE =>',spot.errors)
    //     console.log('RES:', res);

    //     if (spot.errors) {
    //         setErrors(spot.errors);
    //     }else {
    //         history.push(`/spots/${spot.id}`)
    //         const data = await res.json()
    //         console.log('data', data)
    //         console.log('ERRORS', data)
    //     }
    // }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const spotData = { country, address, city, state, price, description, name, imageURLs };
        try {
            const newSpot = await dispatch(thunkCreateSpot(spotData));
            console.log('SPOT OK HERE =>', newSpot);
            history.push(`/spots/${newSpot.id}`);
        } catch (errors) {
            console.error(errors)
            setErrors(errors);
        }
    };

    return (
        <>
            <div className='createSpotContainer'>
                <div className='createSpotFormDiv'>
                    <div id='createSpotHeader'>
                        <a className='createSpotHeaderText'>Create a new Spot</a>
                        {errors.country && <p>{errors.country}</p>}
                        <a className='createSpotHeaderSecondaryText'>Where's your place located?</a>
                        <a className='createSpotHeaderTertiaryText'>Guests will only get your exact address once they booked a reservation.</a>
                    </div>
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div id='createSpotCountry'>
                                <label className='createSpotHeaderTertiaryText'>
                                    Country
                                    <input type="text" placeholder='Country' value={country} onChange={e => setCountry(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotStreet'>
                                <label className='createSpotHeaderTertiaryText'>
                                    Street Address
                                    <input type='text' placeholder='Address' value={address} onChange={e => setAddress(e.target.value)} />
                                </label>
                            </div>
                            <div id='createSpotCityState'>
                                <div className='createSpotHeaderTertiaryText'>
                                    <label>City</label>
                                    <input
                                        className='inputExc' type='text' placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
                                </div>
                                <div className='createSpotHeaderTertiaryText'>
                                    <label>State</label>
                                    <input type='text' className='inputExc' placeholder='State' value={state} onChange={e => setState(e.target.value)} />
                                </div>
                            </div>
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Describe your place to guests</a>
                            <a className='createSpotHeaderTertiaryText'>Mention the best features of your space, any special amentities like fast wifi or parking, and what you love about the neighborhood</a>
                            <textarea placeholder='Please write at least 30 characters' value={description} onChange={e => setDescription(e.target.value)} />
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Create a title for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Catch guests' attention with a spot title that highlights what makes your place special.</a>
                            <input type='text' placeholder='Name of your spot' value={name} onChange={e => setName(e.target.value)} />
                            <hr />
                            <a className='createSpotHeaderSecondaryText'>Set a base price for your spot</a>
                            <a className='createSpotHeaderTertiaryText'>Competitive pricing can help your listing stand out and rank higher in search results.</a>
                            <div className='createSpotHeaderTertiaryText'>
                                <div id='createSpotPrice'>
                                    <a id='moneySign'>$</a>
                                    <input type='number' placeholder='Price per night (USD)' value={price} onChange={e => setPrice(e.target.value)} />
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