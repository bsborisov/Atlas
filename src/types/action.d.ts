export type FieldErrors = Record<
    string,
    string[] | undefined
>;


export type ActionError = {

    message?: string;
    fieldErrors?: FieldErrors;

};


export type ActionResult<T = undefined> =
    | {
        success: true;
        data?: T;
      }
    | {
        success: false;
        error: ActionError;
      };