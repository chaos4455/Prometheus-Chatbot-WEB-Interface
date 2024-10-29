export const handleApiError = (error: unknown): string => {
  if (error instanceof Error) {
    if (error.message.includes('Failed to fetch')) {
      return 'Não foi possível conectar ao servidor. Verifique sua conexão.';
    }
    if (error.message.includes('HTTP')) {
      return 'O servidor encontrou um erro. Tente novamente mais tarde.';
    }
    return error.message;
  }
  return 'Ocorreu um erro inesperado. Tente novamente.';
}; 