    // Función para cerrar sesión
    export const logOut = async () => {
        try {
          await signOut(auth);
        } catch (error) {
          console.error(error.message);
          throw error;
        }
      };