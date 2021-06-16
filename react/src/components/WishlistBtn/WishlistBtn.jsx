import React from 'react';
import { useSelector } from 'react-redux';
import DataServices from '../../services/data.services';
//TODO: logic to add issue to wishlist

const WishlistBtn = (props) => {
    const { user } = useSelector(state => state.auth);

    console.log(user?._id, props.props);

    const saveToWishlist = async () => {
        await DataServices.saveToWishlist(user._id, props.props);
    };

    return <button
        type="Submit"
        className="btn btn-yellow"
        onClick={() => saveToWishlist()}>
            Add to wishlist
    </button>;
};

export default WishlistBtn;