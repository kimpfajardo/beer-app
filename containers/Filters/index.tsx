'use client'
import { FilterPills } from '../FilterPills'
import { useRouter } from 'next/navigation'
import { useResolveBeerFilter } from '@/hooks/filters'

export const filtersList = ['All', 'High Alcohol', 'High Acidity']

export const formatFilterToParams = (filter: string) => {
  return filter.replaceAll(' ', '_').toLowerCase()
}

export const Filters = () => {
  const router = useRouter()
  const filter = useResolveBeerFilter()

  const getActiveValue = (filterName: string) => {
    return formatFilterToParams(filterName) === filter
  }

  const changeFilter = (filterName: string) => {
    router.push(`/products?filter=${formatFilterToParams(filterName)}`)
  }

  return (
    <div className='mx-auto w-max'>
      {/* <h3 className='font-bold text-center mb-10'>Categories</h3> */}
      <div className='flex justify-center pt-6 '>
        <div className='flex items-center space-x-4'>
          {filtersList.map((item, index) => (
            <FilterPills
              key={`filter-${item}-${index}`}
              isActive={getActiveValue(item)}
              onClick={() => changeFilter(item)}
            >
              {item}
            </FilterPills>
          ))}
        </div>
      </div>
    </div>
  )
}
