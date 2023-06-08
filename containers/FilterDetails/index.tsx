'use client'
import { useBeerFilter } from '@/hooks/filters'

export const FilterDetails = () => {
  const detailsObject = {
    all: '',
    high_alcohol: 'ABV > 6.0%',
    high_acidity: 'pH < 4.0%'
  }
  const filter = useBeerFilter()

  const details = detailsObject[(filter as keyof typeof detailsObject) ?? 'all']
  return (
    <div className='transition duration-300'>
      <h3 className='text-2xl text-center pt-2 font-bold'>{details}</h3>
      <hr className='w-16 border-0  border-b-4 mx-auto py-2 mb-4 border-yellow-300' />
    </div>
  )
}
