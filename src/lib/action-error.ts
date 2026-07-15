import { z } from "zod";
import type { ActionError } from "@/types/action";

export function validationError(
    error: z.ZodError
): ActionError {

    const flattened = z.flattenError(error);
    
    return {

        fieldErrors: flattened.fieldErrors,
        message: "Please fix the highlighted errors"

    };

}