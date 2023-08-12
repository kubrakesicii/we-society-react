import React from 'react'
import {BeatLoader, FadeLoader} from 'react-spinners'

const Loader = () => {
  return (
    <div className='d-flex align-items-center justify-content-center'>
        <FadeLoader className='mx-auto' color="#aba8a1" />
    </div>
  )
}

export default Loader;
