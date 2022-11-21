export const getQueryParams = () => {
  const location = window.location;
  const rawParams = location.hash.split('?')[1];
  const splitedParams = rawParams ? rawParams.split('&') : [];

  const objParams= {};
  
  for(const param of splitedParams) {
    const paramKeyValue = param.split("=");

    objParams[paramKeyValue[0]] = paramKeyValue[1];
  }
  return objParams;
}