import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchData, selectData} from './features/dataSlice'
import {nextPage, prevPage, selectPage} from './features/pageSlice'
import {addPin, removePin, selectPin} from './features/pinSlice'

const Draw = (props) => {
    const pinned = useSelector(selectPin)
    const dispatch = useDispatch()
    const {bonus, drawDate, winningNumbers, drawNumber, pin} = props
    const [hide, setHide] = useState(false)
    const handlePin = (e) => pinned.find(el=>el.drawNumber === e.drawNumber) ? dispatch(removePin(e)) : dispatch(addPin(e)) 

    return(
        <div className='card'>
            <div className='w100'>
                <header className='card-options'>
                    <h3>Game #{drawNumber}</h3>  
                    <div>
                        <button className='btn'  onClick={()=>handlePin(props)}>{pin? 'Unpin' : 'Pin'}</button>
                        <button className='btn' onClick={()=> setHide(!hide)}>{hide === true ? 'Show' : 'Hide'}</button>
                    </div>
                </header>
                {hide === false ?
                    <main className='card-content'>
                        <div className='same-line'>
                            <p><strong>Date: </strong>{drawDate}</p>
                            <p><strong>Bonus: </strong>{bonus}</p>
                        </div>
                        <p><strong>Winning Numbers: </strong></p>
                        <p>{winningNumbers.join('-')}</p>
                    </main>
                    : null}
            </div> 
        </div>
    )
}


export default Draw
