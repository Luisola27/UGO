export const SAVE_NINO = (name: string, identification:string, age: number, gender:number ) =>
`mutation {
    saveNino(input: {
      Name: ${name},
      Identification: ${identification},
      Age: ${age},
      Gender: ${gender}
    }) {
      name
      identification
      age
      gender
      sponsor
      gift
    }
}`

export const UPDATE_SPONSOR = (ninoId: number, sponsor: string) =>
`mutation{
  updateSponsor(ninoId: ${ninoId}, sponsor: "${sponsor}")
  {
    ninoId
    name
    identification
    age
    gender
    sponsor
  }
}`