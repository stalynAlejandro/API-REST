import { ErrorDetail } from "./index";
export const errorStatusHandler = (error : any) : ErrorDetail => {
	if (error && error.response && !error.request) {
		if (error.response.data.errors){
				return new ErrorDetail(500, Object.values(error.response.data.errors).toString())
		}
		return new ErrorDetail(500,  error.response.data.title);
	}

	if (error && error.request) {
		let status;
		switch (error.request.status) {
			case 400:
				status = 'Alguno de los campos introducidos es incorrecto'
				break;
			case 401:
				status = 'No está autorizado para realizar esta operacion'
				break;
			case 402:
			case 403:
			case 404:
				status = 'No se encontraron los datos solicitados.'
				break;
			case 405:
			case 406:
			case 407:
			case 408:
			case 409:
			case 410:
			case 411:
			case 412:
			case 413:
			case 414:
			case 415:
			case 416:
				status = 'Ocurrió un error, inténtelo de nuevo pasados unos minutos. Gracias.';
				break;
			case 500:
			case 501:
			case 502:
			case 503:
			case 504:
				status =  'El servidor no pudo procesar esta petición en este momento, inténtelo de nuevo pasados unos minutos. Gracias.';
				break;
			default:
				status = 'El servidor no pudo procesar esta petición en este momento, inténtelo de nuevo pasados unos minutos. Gracias.';
				break;
		}
		if(error.request.status === 400 && error.response?.data?.errors){
			return new ErrorDetail(error.request.status, status, error.response.data.errors);
		}
		if(error.request.status === 400 && error.response?.data && Object.keys(error.response.data).length>0){
			return new ErrorDetail(error.request.status, status, error.response.data);
		}
		return new ErrorDetail(error.request.status,  status);
	}
	return new ErrorDetail(500,  "Error inesperado, por favor intente de nuevo más tarde.");
};
