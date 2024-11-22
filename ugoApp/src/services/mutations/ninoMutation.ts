export const SAVE_NINO = (name: string, identification:string, age: number, gender:number, sponsor?:string|null|undefined, gift?:number ) =>
`mutation {
    saveNino(input: {
      Name: ${name},
      Identification: ${identification},
      Age: ${age},
      Gender: ${gender},
      Sponsor:${sponsor},
      Gift:${gift}
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

export const UPDATE_NINO = (ninoId: number, name?: string, identification?: string, age?: number, gender?: number, sponsor?: string | null | undefined, gift?: number) =>
 `mutation{
    updateNino(
      ninoId: ${ninoId},
      input: {
        Name: ${name}
        Identification: ${identification}
        Age: ${age}
        Gender: ${gender}
        Sponsor: ${sponsor}
        Gift: ${gift}
      }
    )
    {
      ninoId
      name
      identification
      age
      gender
      sponsor
      gift
    }
  }`

  export const DELETE_NINO = (ninoId: number) =>
    `mutation{
      deleteNino(ninoId: ${ninoId})
    }`