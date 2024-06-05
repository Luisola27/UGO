import React from "react";
import {
  DeleteNino,
  GetNinos,
  GetNinosWithoutGift,
  GetNinosWithoutSponsor,
  SaveNino,
  UpdateNino,
  UpdateSponsor,
} from "../../services/ninoService";
import { notification } from "../../components/common/Toast/Toast";
import { Nino } from "../../types/nino";

export async function getNinos(
  setNinos: React.Dispatch<React.SetStateAction<Array<Nino>>>
) {
  await GetNinos().then((response: any) => {
    if (Object.keys(response).length > 0) {
      if (response.data !== undefined && response.data.errors === undefined) {
        setNinos(response.data.data.getNinos);
      }
    }
  });
}

export async function saveNino(
  name: string,
  identification: string,
  age: number,
  gender: number,
  sponsor?: string | null | undefined,
  gift?: number
) {
  await SaveNino(name, identification, age, gender, sponsor, gift).then(
    (response: any) => {
      if (response.data !== undefined && response.data.errors === undefined) {
        notification(
          "El niño ha sido creado con exito",
          "Niño creado con exito",
          "success"
        );
      } else {
        notification(
          `No se pudo crear el niño: ${name} `,
          "Error al crear el niño",
          "error"
        );
      }
    }
  );
}

export async function updateSponsor(ninoId: number, sponsor: string) {
  await UpdateSponsor(ninoId, sponsor).then((response: any) => {
    if (response.data !== undefined && response.data.errors === undefined) {
      notification(
        "El padrino ha sido agregado con exito",
        "Padrino asociado",
        "success"
      );
    } else {
      notification(
        `No se pudo crear el padrino ${sponsor}`,
        "Error al asociar padrino",
        "error"
      );
    }
  });
}

export async function updateNino(
  ninoId: number,
  name?: string,
  identification?: string,
  age?: number,
  gender?: number,
  sponsor?: string | null | undefined,
  gift?: number
) {
  await UpdateNino(
    ninoId,
    name,
    identification,
    age,
    gender,
    sponsor,
    gift
  ).then((response: any) => {
    if (response.data !== undefined && response.data.errors === undefined) {
      notification(
        "Se ha actualizado correctamente",
        `El niño: ${name} actualizado`,
        "success"
      );
    } else {
      notification(
        `No se pudo actualizar a ${name}`,
        "Valide todos los campos",
        "error"
      );
    }
  });
}

export async function deleteNino(ninoId:number, name: string) {
  await DeleteNino(ninoId).then((response: any) => {
    if(response.data !== undefined && response.data.errors === undefined) {
      notification(
        "Se ha eliminado el nino",
        `El niño ${name} se ha eliminado`,
        "success"
      );
    } else {
      notification(
        "No se ha podido eliminar el niño",
        "Intenta nuevamente",
        "error"
      )
    }
  })  
}

export async function ninosWithoutGift(
  setWithoutGift: React.Dispatch<React.SetStateAction<Array<Nino>>>
) {
  await GetNinosWithoutGift().then((response: any) => {
    if(Object.keys(response).length > 0) {
      if (response.data !== undefined && response.data.errors === undefined) {
        setWithoutGift(response.data.data.getNinosMissingGift)
      }
    }
  })
}

export async function ninosWithoutSponsor(
  setWithoutSponsor: React.Dispatch<React.SetStateAction<Array<Nino>>>
) {
  await GetNinosWithoutSponsor().then((response: any) => {
    if(Object.keys(response).length > 0) {
      if (response.data !== undefined && response.data.errors === undefined) {
        setWithoutSponsor(response.data.data.getNinosMissingSponsor)
      }
    }
  })
}
