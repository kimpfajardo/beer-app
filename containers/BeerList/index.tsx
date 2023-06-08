'use client'
import { BeerType } from '@/mockBeer'
import { BeerCard } from '../BeerCard'
import { useEffect, useMemo, useState } from 'react'

const getBeers = async (): Promise<BeerType[]> => {
  const response = await fetch('https://api.punkapi.com/v2/beers')
  const data = await response.json()
  return data
}

const getBeersByPageNumber = async (page: number) => {
  const response = await fetch(`https://api.punkapi.com/v2/beers?page=${page}&per_page=10`)
  const data = await response.json()
  return data
}

export const BeerList = async () => {
  // const beers: BeerType[] = await getBeers()
  const [page, setPage] = useState(1)
  const [beers, setBeers] = useState<BeerType[]>([] as BeerType[])
  const updateBeerList = async () => {
    const x = await getBeers()
    return x
  }

  // useEffect(() => {
  //   getBeers().then(beersFromApi => {
  //     console.log('res', beersFromApi)
  //     setBeers(beersFromApi)
  //   })
  // }, [])
  // const handlePrev = () => {
  //   setPage(old => Math.max(old - 1, 1))
  // }

  // const handleNext = () => {
  //   setPage(old => old + 1)
  // }

  return (
    <>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {beers.map((item, index) => (
          <BeerCard details={item} key={`beer-${index}`} />
        ))}
      </div>
      <div></div>
    </>
  )
}
