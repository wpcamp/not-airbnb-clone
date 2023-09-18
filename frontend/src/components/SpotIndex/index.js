import { thunkGetSpots } from "../../store/spots";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotIndexItem from "../SpotIndexItem";
import './SpotIndex.css'

const SpotIndex = () => {
    const [sortOption, setSortOption] = useState('price_asc');
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetSpots())
    }, [dispatch])

    const handleSortChange = (option) => {
        setSortOption(option);
    }

    const sortSpots = () => {
        switch (sortOption) {
            case 'price_asc':
                return [...spots].sort((a, b) => a.price - b.price);
            case 'price_desc':
                return [...spots].sort((a, b) => b.price - a.price);
            case 'rating_asc':
                return [...spots].sort((a, b) => a.avgRating - b.avgRating);
            case 'rating_desc':
                return [...spots].sort((a, b) => b.avgRating - a.avgRating);
            default:
                return spots;
        }
    }

    return (
        <>
            <div className="sort-dropdown-container">
                <label htmlFor="sort-dropdown">Sort by:</label>
                <select
                    id="sort-dropdown"
                    onChange={(e) => handleSortChange(e.target.value)}
                    value={sortOption}
                >
                    <option value="price_asc">Price (Low to High)</option>
                    <option value="price_desc">Price (High to Low)</option>
                    <option value="rating_asc">Average Rating (Low to High)</option>
                    <option value="rating_desc">Average Rating (High to Low)</option>
                </select>
            </div>
            <ul className="spotContainer">
                {sortSpots().map((spot) => (
                    <SpotIndexItem
                        spot={spot}
                        key={spot.id} />
                ))}
            </ul>
        </>
    )
}

export default SpotIndex;



