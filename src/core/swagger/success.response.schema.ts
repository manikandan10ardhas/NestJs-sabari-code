export const getSwaggerSuccessPaginationResponseSchema = function ({
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
        statusCode,
        successs: true,
        body: {
          count: 'number',
          data: [],
          _paging: {
            links: {
              first: 'string',
              last: 'string',
              prev: 'string',
              next: 'string',
              self: 'string',
              baseUrl: 'string'
            },
            first_page: 'number',
            current_page: 'number',
            last_page: 'number',
            no_of_pages: 'number',
            per_page: 'number',
            row_count: 'number'
          }
        },
        message: 'string',
        apiVersion: ''
      }
    },
    description
  };
};

export const getSwaggerSuccessResponseSchema = function ({
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
        statusCode,
        successs: true,
        body: {},
        message: 'string',
        apiVersion: ''
      }
    },
    description
  };
};
