import React from 'react'
import './Style.css'
import AppRoutes from '../Routes';
const PageContent = () => {
  return (
    <div className='pageContent'>
      <div className='home-page'>
        <AppRoutes />
      </div>
    </div>
  )
}

export default PageContent;