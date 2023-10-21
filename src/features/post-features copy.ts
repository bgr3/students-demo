import { commentFilter } from "../repositories/comments-db-repository" 
import { CommentsFilter } from "../types/comment-types"

export const commentCheckQuery = (query: any): CommentsFilter => {
    const queryFilter = {...commentFilter}

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