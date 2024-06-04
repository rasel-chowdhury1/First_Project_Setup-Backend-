export type TErrorSource = {
    path: string | number;
    message: string
  }[]

export type TGenericsResponse = {
    statusCode: number,
    message: string,
    errorSources: TErrorSource
}