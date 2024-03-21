export const getSwaggerErrorResponseSchema = function ({
  description,
  statusCode
}: {
  description?: string;
  statusCode: number;
}) {
  return {
    schema: {
      type: 'object',
      example: {
        successs: false,
        error: {
          message: 'string',
          name: 'string',
          stack: 'string'
        },
        statusCode
      }
    },
    description
  };
};
