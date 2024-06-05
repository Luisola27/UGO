export const GET_NINOS = () => 
`{
    getNinos {
        ninoId
        name
        identification
        age
        gender
        sponsor
        gift
      }
}`

export const GET_NINOS_WITHOUT_GIFT = () =>
  `{
    getNinosMissingGift {
      age
      gender
      gift
      identification
      name
      sponsor
    }
  }`

  export const GET_NINOS_WITHOUT_SPONSOR = () =>
  `{
    getNinosMissingSponsor {
      age
      gender
      gift
      identification
      name
      ninoId
      sponsor
    }
  }`