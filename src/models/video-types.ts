export type VideoType = {
    id:	number,
    title:	string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction:	number | null,
    createdAt:	string,
    publicationDate: string,
    availableResolutions: string [],
}

export type VideoPostType = {
    title:	string,
    author: string,
    availableResolutions: string [],
}

export type VideoPutType = {
    id:	number,
    title:	string,
    author: string,
    canBeDownloaded: boolean | false,
    minAgeRestriction:	number | null,
    publicationDate: string,
    availableResolutions: string [],
}