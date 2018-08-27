const regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export const validateEmail = (value) => {
  if(regExEmail.test(value)) {
    return {
      valid: true,
    }
  } else {
    return {
      valid: false,
      message: 'Non è un Email valida'
    }
  }
}

export const validateSlug = (value) => {
  if(value.length > 3 && value.length < 8) {
    return { valid: true }
  } else {
    return {
      valid: false,
      message: 'Non è uno slug valido, deve essere di minimo 3 caratteri e massimo 8'
    }
  }
}