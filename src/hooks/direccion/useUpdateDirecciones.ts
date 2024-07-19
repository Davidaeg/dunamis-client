// import { dunamisApi } from "../../datasources/dunamisApi.service";
// import { DireccionDB } from "../../modules/dirreciones/direccion.types";

// export const useUpdateDirecciones = () => {
//   const updatePersona = async (idPersona: string, updatedPersona: PersonaDB): Promise<PersonaDB> => {
//     try {
//       const response = await dunamisApi.put<PersonaDB>(`/persona/${idPersona}`, updatedPersona);
//       return response.data;
//     } catch (error) {
//       console.error("Error updating persona:", error);
//       throw error;
//     }
//   };

//   return { updatePersona };
// };

