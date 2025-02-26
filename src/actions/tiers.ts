const wait = (duration: number) =>
  new Promise(resolve => setTimeout(resolve, duration));

export async function bindQuestion(formData: FormData, idx: string) {
  const boundQuestion = formData.get('boundQuestion') as string;

  try {
    await wait(500);
    if (!boundQuestion) {
      throw new Error('FormData return null');
    }
    if (boundQuestion === 'unbound') {
      return {
        messageType: 'success',
        toastMessage: `Question unbound `,
      };
    }
    return {
      messageType: 'success',
      toastMessage: `Question ${boundQuestion} was bound to tier ${idx}`,
    };
  } catch (error) {
    console.error('Error in binding question:', error);

    return {
      messageType: 'error',
      toastMessage:
        (error as { message: string }).message || 'An unknown error occurred',
    };
  }
}
