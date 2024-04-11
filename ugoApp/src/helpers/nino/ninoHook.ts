import React from "react";
import { SaveNino, UpdateSponsor } from "../../services/ninoService";
import { notification } from "../../components/common/Toast/Toast";

export async function saveNino(
  name: string,
  identification: string,
  age: number,
  gender: number
) {
  await SaveNino(name, identification, age, gender).then((response: any) => {
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
  });
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
