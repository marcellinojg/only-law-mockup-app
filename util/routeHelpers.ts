

export const buildListParams = (key: string, list: string[]) => {
    return list.length !== 0 ? `${key}=${list.join('_')}` : ''
}

export const extractListParams = (params : string) => {
    return params.split('_')
}