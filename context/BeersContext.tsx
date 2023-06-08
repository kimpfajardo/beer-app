'use client'
import { BeerType } from '@/mockBeer'
import { ReactNode, createContext, useContext, useState } from 'react'

export interface BeerContext {
  beers: BeerType[]
  currentPage: number
  totalPages: number
}

export const BeerCtx = createContext<BeerContext>({} as BeerContext)

export const useBeerCtx = () => {
  return useContext(BeerCtx)
}

export const useBeer = () => {
  const [beers, setBeers] = useState<BeerType[]>([] as BeerType[])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1)

  return {
    beers,
    setBeers,
    currentPage,
    setCurrentPage,
    totalPages,
    setTotalPages
  }
}

export const BeerProvider = ({ children }: { children: ReactNode }) => {
  const values = useBeerCtx()
  return <BeerCtx.Provider value={values}>{children}</BeerCtx.Provider>
}
