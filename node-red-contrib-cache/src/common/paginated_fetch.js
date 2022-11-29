
module.exports = function paginated_fetch(
    endpoint,
    params,
    page = 0,
    previousResponse,
    api
  ) {
    // console.log(params)
    const p = {offset: page, limit: 50, ...p}
    let apiFunction = () => {
      return api[endpoint](p)
    }
    if (typeof params == "object") {
      apiFunction = () => {
        return api[endpoint](...params, p)
      }
    }
    if (typeof params == "number" || typeof params == "string") {
      apiFunction = () => {
        return api[endpoint](params, p)
      }
    }
    return apiFunction().then(res => {
        const data = res.body
        // console.log("res", res)
        const response = previousResponse.concat(res.body.items);
  
        if (data.offset < data.total) {
  
          return paginated_fetch(endpoint, params, page + data.limit, response, api);
        }
  
        return response;

    })
    
   
  }