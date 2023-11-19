import { postFilter } from "../repositories/posts-repository/posts-query-db-repository" 
import { PostFilterType } from "../types/post-types"

export const postCheckQuery = (query: any): PostFilterType => {
    const queryFilter = {...postFilter}

    if (query.pageNumber) {
        queryFilter.pageNumber = Number (query.pageNumber)
      }
    
      if (query.pageSize) {
        queryFilter.pageSize = Number (query.pageSize)
      }
    
      if (typeof query.sortBy == 'string') {
        queryFilter.sortBy = query.sortBy
      }
    
      if (typeof query.sortDirection === 'string') {
        queryFilter.sortDirection = query.sortDirection
      }

      return queryFilter
}