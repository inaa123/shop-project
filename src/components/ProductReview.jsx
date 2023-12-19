import React, { useEffect, useState } from 'react'
import { addReview, getReviews } from '../api/firebase';
import { useQuery } from '@tanstack/react-query';

function ProductReview({productId}) {
    const [review, setReview] = useState([]);
    const [newReview, setNewReview] = useState('');

    useEffect(()=>{
        getReviews(productId)
        .then((review)=>{
            setReview(review);
        })
        .catch((error)=>{
            console.error(error)
        })
    }, [productId])

    const onSubmitReview = async () => {
        try{
            const user = 'user';
            await addReview(productId, user, newReview);
            setNewReview('');
            getReviews(productId)
                .then(setReview);
        }catch(error){
            console.error(error);
        }
    }

    // const {data : reviews} = useQuery({
    //     queryKet : [`/review/${productId}`],
    //     queryFn : () => getReviews(productId),
    // })



    return (
        <div>
            <h3>후기</h3>
            
            <input type='text' value={newReview} onChange={(e) => setNewReview(e.target.value)} />
            <button onClick={onSubmitReview}>작성하기</button>
            <ul>
                {review && review.map((el, index) => (
                    <li>
                        <p>{el.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ProductReview
