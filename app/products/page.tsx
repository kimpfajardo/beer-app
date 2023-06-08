import { BeerList } from '@/containers/BeerList'
import { FilterDetails } from '@/containers/FilterDetails'
import { Filters } from '@/containers/Filters'

export default function Products() {
  return (
    <div className='mx-auto max-w-7xl p-4 sm:px-6 lg:px-8 '>
      <div className='w-full'>
        <Filters />
        <FilterDetails />
        <div className='py-4'>
          <BeerList />
        </div>
      </div>
    </div>
  )
}
