import { postFilter } from "../repositories/posts-db-repository" 
import { PostFilter } from "../types/post-types"

export const postCheckQuery = (query: any): PostFilter => {
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