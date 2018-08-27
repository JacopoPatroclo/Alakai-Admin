/*
 *  Configuration file
 */

const def = {
}

const confProd = {
  basePathApi: ''
}

const congDev = {
  basePathApi: 'http://localhost:3001'
}

let config = {
  ...def
}

if (process.env.NODE_ENV === 'production') {
  config = { ...config, ...confProd }
} else {
  config = { ...config, ...congDev }
}

export default config