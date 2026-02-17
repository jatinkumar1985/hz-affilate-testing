import React from 'react'
// import LottieAnimation from './LottieAnimation'
// import Warning from '@/lottie/icons/warning';

function NotFound(props) {
    return (
        <div className="border border-dashed border-gray-300 bg-white flex items-center justify-center rounded-lg py-10 px-4 text-center">
            <div className='data'>
                <figure className='size-16 mx-auto'>
                    {/* <LottieAnimation src={Warning} play loop /> */}
                </figure>
                <h3 className='text-2xl'>{props.title}</h3>
                <p className='text-base'>{props.label}</p>
            </div>
        </div>
    )
}

export default NotFound
