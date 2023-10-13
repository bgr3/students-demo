import { userFilter } from "../repositories/users-db-repository"
import { UserFilter } from "../types/user-types"

export const userCheckQuery = (query: any): UserFilter => {
    const queryFilter = {...userFilter}

    if (query.pageNumber) {
        queryFilter.pageNumber = Number (query.pageNumber)
      }
    
      if (query.pageSize) {
        queryFilter.pageSize = Number (query.pageSize)
      }
    
      if (typeof query.sortBy === 'string') {
        queryFilter.sortBy = query.sortBy
      }
    
      if (typeof query.sortDirection === 'string') {
        queryFilter.sortDirection = query.sortDirection
      }

      if (typeof query.searchLoginTerm === 'string') {
        queryFilter.searchLoginTerm = query.searchLoginTerm
      }

      if (typeof query.searchEmailTerm === 'string') {
        queryFilter.searchEmailTerm = query.searchEmailTerm
      }

      return queryFilter
}