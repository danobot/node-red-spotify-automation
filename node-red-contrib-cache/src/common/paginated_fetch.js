
module.exports = function paginated_fetch(
    endpoint,
    params,
    page = 0,
    previousResponse,
    api
  ) {
    // console.log(params)
    const p = {offset: page, limit: 50, ...p}
    // console.log(p)
    // if (typeof params == 'object') {
    //     params = {...params}
    // }
    let fun = () => {
      return api[endpoint](p)
    }
    if (typeof params == "object") {
      fun = () => {
        return api[endpoint](...params, p)
      }
    }
    if (typeof params == "number" || typeof params == "string") {
      fun = () => {
        return api[endpoint](params, p)
      }
    }
    return fun().then(res => {
        const data = res.body
        // console.log("res", res)
        const response = previousResponse.concat(res.body.items);
  
        if (data.offset < data.total) {
  
          return paginated_fetch(endpoint, params, page + data.limit, response, api);
        }
  
        return response;

    })
    
   
  }