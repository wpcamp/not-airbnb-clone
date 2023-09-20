import { thunkGetSpots } from "../../store/spots";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import SpotIndexItem from "../SpotIndexItem";
import './SpotIndex.css'

const SpotIndex = () => {
    const dispatch = useDispatch()
    const [sortOption, setSortOption] = useState('price_asc');
    const [page, setPage] = useState(1);
    const spots = Object.values(useSelector((state) => (state.spots ? state.spots : [])))
    const [isLoaded, setIsLoaded] = useState(false)

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handleLastPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };


    useEffect(() => {
        dispatch(thunkGetSpots(page)).then(setIsLoaded(true))
    }, [dispatch, page])

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
        isLoaded ?
            (<>
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
                <div className="pagination-buttons">
                    <button onClick={handleLastPage} disabled={page === 1}>
                        Previous
                    </button>
                    <button onClick={handleNextPage} disabled={page === 2}>
                        Next
                    </button>
                </div>
            </>
            ) : (
                <>
                    <h1>Loading...</h1>
                </>
            )
    )
}

export default SpotIndex;



// import { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import SpotIndexItem from "../SpotIndexItem";
// import { thunkGetSpots } from "../../store/spots";
// import './SpotIndex.css';

// const SpotIndex = () => {
//     const [sortOption, setSortOption] = useState('price_asc');
//     const [size, setSize] = useState(10);
//     const [page, setPage] = useState(1);

//     const spots = useSelector((state) => state.spots || []);
//     const dispatch = useDispatch();

//     useEffect(() => {
//         dispatch(thunkGetSpots(size, page));
//     }, [dispatch, size, page]);

//     const handleSortChange = (option) => {
//         setSortOption(option);
//     };

//     const handlePageSizeChange = (event) => {
//         const newSize = parseInt(event.target.value, 10);
//         setSize(newSize);
//         setPage(1); 
//     };

//     const handleNextPage = () => {
//         setPage(page + 1);
//     };

//     const handlePreviousPage = () => {
//         if (page > 1) {
//             setPage(page - 1);
//         }
//     };

//     const sortSpots = () => {
//         switch (sortOption) {
//             case 'price_asc':
//                 return [...spots].sort((a, b) => a.price - b.price);
//             case 'price_desc':
//                 return [...spots].sort((a, b) => b.price - a.price);
//             case 'rating_asc':
//                 return [...spots].sort((a, b) => a.avgRating - b.avgRating);
//             case 'rating_desc':
//                 return [...spots].sort((a, b) => b.avgRating - a.avgRating);
//             default:
//                 return spots;
//         }
//     };

//     return (
//         <>
//             <div className="sort-dropdown-container">
//                 <label htmlFor="sort-dropdown">Sort by:</label>
//                 <select
//                     id="sort-dropdown"
//                     onChange={(e) => handleSortChange(e.target.value)}
//                     value={sortOption}
//                 >
//                     <option value="price_asc">Price (Low to High)</option>
//                     <option value="price_desc">Price (High to Low)</option>
//                     <option value="rating_asc">Average Rating (Low to High)</option>
//                     <option value="rating_desc">Average Rating (High to Low)</option>
//                 </select>
//             </div>

//             <div className="results-per-page">
//                 <label htmlFor="page-size">Results per page:</label>
//                 <select
//                     id="page-size"
//                     onChange={handlePageSizeChange}
//                     value={size}
//                 >
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                 </select>
//             </div>

//             <ul className="spotContainer">
//                 {sortSpots().map((spot) => (
//                     <SpotIndexItem
//                         spot={spot}
//                         key={spot.id}
//                     />
//                 ))}
//             </ul>

//             <div className="pagination-buttons">
//                 <button onClick={handlePreviousPage} disabled={page === 1}>
//                     Previous
//                 </button>
//                 <button onClick={handleNextPage}>
//                     Next
//                 </button>
//             </div>
//         </>
//     );
// };

// export default SpotIndex;
