import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchData, selectData} from './features/dataSlice'
import {nextPage, prevPage, selectPage} from './features/pageSlice'
import {addPin, removePin, selectPin} from './features/pinSlice'
import './App.css'
import Draw from './Draw'

function App() {
    // app state 
    const dispatch = useDispatch()
    const apiData = useSelector(selectData) 
    const page = useSelector(selectPage) 
    const pinned = useSelector(selectPin)
    // form state
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [search, setSearch] = useState('')
    const [focus, setFocus] = useState(false)

    // display actions
    const dataFilter = () => apiData.filter(e => e.drawNumber.toString().includes(search) || e.winningNumbers.join('-').includes(search) || e.winningNumbers.join(' ').includes(search))

    // form actions
    const handleSearch = (e) => setSearch(e.target.value)
    const handleDates = (e) => {
        e.preventDefault()
        setSearch('')
        dispatch(fetchData(new Date(startDate+'T00:00:00'),new Date(endDate+'T00:00:00')))
        setStartDate('')
        setEndDate('')
    }

    // make API call on component mount
    useEffect(()=> {
        dispatch(fetchData())
    },[dispatch])

    return (
        <div className="App container"> 
            <div contentEditable='true' dangerouslySetInnerHTML={{__html: "hello"}}</div>
            <h1 className='title'>Keno Lookup</h1>
            <div className='search-container'>
                <p className='search-copy'>{focus? 'Search by Game number or winning numbers within the selected dates.': ''} </p>
                <div className='main-search'>
                    <label htmlFor='search'>Search</label>
                    <input className='main-input' type='text' value={search} onChange={handleSearch} onFocus={(e)=>setFocus(true)} onBlur={()=>setFocus(false)} id='search' />
                </div>
                <div className='date-search'>
                    <form className='date-form' onSubmit={handleDates}>
                        <div className='date-field'>
                            <label className='date-label' htmlFor="start-date">Start Date</label>
                            <input className='date-input' type='date' value={startDate} onChange={e=>setStartDate(e.target.value)} id='start-date' />
                        </div>
                        <div className='date-field'>
                            <label className='date-label' htmlFor="end-date">End Date</label>
                            <input className='date-input' type='date' value={endDate} onChange={e=>setEndDate(e.target.value)} id='end-date' />
                        </div>
                            <button className='date-btn btn' type='submit'>submit</button>
                    </form>
                </div>
            </div>
            {pinned.length > 0 && <h3>Pinned Drawings</h3>}
            {pinned && pinned.map(e => <Draw
                drawDate={e.drawDate}
                drawNumber={e.drawNumber} 
                bonus={e.bonus}
                winningNumbers={e.winningNumbers}
                key={e.drawNumber}
                pin={true}
            />)} 

            <h3>Results</h3>
            {apiData && dataFilter(apiData).slice(page*30, page*30+30).map(e => <Draw 
                drawDate={e.drawDate}
                drawNumber={e.drawNumber} 
                bonus={e.bonus}
                winningNumbers={e.winningNumbers}
                key={e.drawNumber}
                pin={pinned.find(el=>el.drawNumber === e.drawNumber)}
            />)} 
            <button className='btn' onClick={()=> dispatch(prevPage())} disabled={page<1}>previous</button>
            <button className='btn' onClick={()=> dispatch(nextPage())} disabled={dataFilter(apiData) && page*30+30>=dataFilter(apiData).length} >next</button>
        </div>
    )
}

export default App
