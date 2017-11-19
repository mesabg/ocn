/**
 * Some Global Functions
 */

/**
 * Lazy parser
 */
export const LazyParser = function(data:Promise<any>):any[]{
    let returnData:any[] = new Array();
	for (var i in data) returnData.push(data[i]);
    return returnData;
}

/**
 * Check request error functions
 */
export const ServerError = function(response:Response):boolean{
    return response.status >= 500;
}