import {useState, useEffect} from 'react';
import Map from "../map/Map";

import './container.css';
import Loader from '../loader/Loader';

const API_KEY=""
const pageSize = 9;

const MainContainer = () => {
    const [mark, setMark] = useState({
        lat:28.644800,
        lng:77.316000
    });
    const [data, setData] = useState(null)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    const getPhotos = () => {
        setLoading(true)
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=${API_KEY}&per_page=${pageSize}&page=${page}&lat=${mark.lat}&lon=${mark.lng}`)
        .then(res => res.text())
        .then(resData => {
            console.log(JSON.parse(resData.replace("jsonFlickrApi(", "").slice(0, -1)));
            setData(JSON.parse(resData.replace("jsonFlickrApi(", "").slice(0, -1)));
        }).finally(() => {
            setLoading(false);
        })
    }

    useEffect(() => {
        getPhotos();
    }, [page])

    useEffect(() => {
        setPage(1)
    }, [mark]);

    const handleClick = ({x, y, lat, lng, event}) => {
        console.log(x, y, lat, lng, event)
        setMark({lat, lng})
    }

    const handlePrevClick = () => {
        if(page > 1) {
            setPage(page - 1);
        }
    }

    const handleNextClick = () => {
        if(page < data?.photos?.pages) {
            setPage(page + 1);
        }
    }

    return(
        <div className="container">
            <div className="left-container">
                <h2>Latitude: {mark.lat} Longitude: {mark.lng}</h2>
                
                <h3>Total Images: {data?.photos?.total}</h3>
                <div className="card_container">
                    {loading ? <Loader /> : <>
                        {data?.photos?.photo?.map((p,i) => (
                            <div key={i} className="card">
                                <img src={`https://farm${p.farm}.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`} alt={p.title}/>
                            </div>
                        ))}
                        </>}
                </div>
                
                <div className="controls">
                    <i onClick={handlePrevClick} className={`fas fa-chevron-circle-left ${(page === 1 || loading) ? 'disabled' : ''}`}></i>
                    {page} /  {data?.photos?.pages}
                    <i onClick={handleNextClick}  className={`fas fa-chevron-circle-right ${(loading || page === data?.photos?.pages) ? 'disabled' : ''}`}></i>
                </div>
            </div>
            <Map handleClick={handleClick} mark={mark}/>
        </div>
    )
}

export default MainContainer;