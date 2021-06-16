import React from 'react';
import { useSelector } from 'react-redux';
import DataServices from '../../services/data.services';

const CollectiontBtn = (props) => {
    const { user } = useSelector(state => state.auth);

    console.log(user?._id, props.props);

    const saveToCollection = async () => {
        await DataServices.saveTocollection(user._id, props.props);
    };

    return <button
        type="Submit"
        className="btn btn-yellow"
        onClick={() => saveToCollection()}>
            Add to Collection
    </button>;
};

export default CollectiontBtn;