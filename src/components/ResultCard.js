import React from 'react'
import './ResultCard.scss'

const ResultCard = ({result}) => {
    const {title, description, url} = result
  return (
    <div className='result-card'>
        <div className='result-card__content'>
        <h3>{title.replace(/<\/?[^>]+(>|$)/g, "")}</h3>
        <p>{description.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 150)}...</p>
        </div>
        <a href={url}> Read More </a>
    </div>
  )
}

export default ResultCard