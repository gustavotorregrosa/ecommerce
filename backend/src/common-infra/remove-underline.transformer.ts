export const removeUnderlineTransformer = (data: object[] | object) => {
    if(Array.isArray(data)){
        return arrayTransformer(data)
    }

    return individualTransformer(data)
}


const arrayTransformer = (rawDataArray: object[]) => {
    return rawDataArray.map(rawData => individualTransformer(rawData))
}


const individualTransformer = (rawData: any) => {

    let parsedData = rawData ? {} : null

    rawData && Object.keys(rawData).map(rawKey => {
        const parsedKey = (rawKey[0] == '_') ? rawKey.substring(1) : rawKey
        parsedData[parsedKey] = ((typeof rawData[rawKey]) == 'object') ? individualTransformer(rawData[rawKey]) : rawData[rawKey]
    })

    return parsedData
}

