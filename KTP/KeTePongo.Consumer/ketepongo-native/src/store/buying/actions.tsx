import { Dispatch } from 'redux'
import NavigationService from '../../navigation/NavigationService'
import { ROUTES } from '../../constants'
import { IProvider } from '../consumption/providers'

const navigate = (route: string, dispatch: Disptach) => {
    dispatch({ type: 'NAVIGATE' })
    return NavigationService.navigate(route)
}

const navigateWithParams = (route: string, dispatch: Dispatch, locations: string[], providers: string[]) => {
    dispatch({ type: 'NAVIGATE' })
    return NavigationService.navigate(route, { locations: locations, providers: providers })
}

export const navigateToFilter = (locations: string[], providers: IProvider[]) => (dispatch: Dispatch) => navigateWithParams(ROUTES.FilterScreen, dispatch, locations, providers);
export const navigateToMyProviders = () => (dispatch: Dispatch) => navigate(ROUTES.MyProvidersScreen, dispatch);
export const navigateToAddNewProvider = () => (dispatch: Dispatch) => navigate(ROUTES.AddNewProviderScreen, dispatch);