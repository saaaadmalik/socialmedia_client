import React from 'react'
import "./TrendCard.css"
import { trendData } from '../../Data/TrendCard'

const TrendCard = () => {
  return (
    <div className="trendCard">
        <h3>Trends for you</h3>
        {trendData.map((trend)=>{
            return(
                <div className="trend">
                    <span><b>#{trend.name}</b></span>
                    <span>{trend.shares}k shares</span>
                </div>
            )

        })}
    </div>
  )
}

export default TrendCard